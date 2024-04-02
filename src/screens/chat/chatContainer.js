import moment from 'moment';
import React, { startTransition, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Config, { chatPath } from '../../configuration';
import Utils from '../../utils';
import string from '../../values/string';
import propsProvider from './chatPropsProvider';
import {
  createChatRoom,
  getAllChatroom,
  sendMessage,
  getMessageInChatRoom,
  updateLastMessage,
} from './chatSlice';
import ChatMainView from './template/ChatMainView';
import { RSA } from 'react-native-rsa-native';

const ChatContainer = props => {
  const {
    dispatch,
    contactList = [],
    userDetails,
    lstMessenger = [],
    navigation,
    route = {},
    t,
    allChatroom = [],
  } = props;

  const [searchQuery, setSearchQuery] = useState('');
  const [pageName, setPageName] = useState();
  const [currentChatMessage, setCurrentChatMessage] = useState('');
  const [chatroom, setChatroom] = useState();
  const [chatroomList, setChatroomList] = useState();
  const [chatSegment, setChatroomSegment] = useState([]);
  const [payloadMessage, setPayloadMessage] = useState();
  const [socket, setSocket] = useState(null);

  const onLoadAllChatRooms = () => {
    dispatch(getAllChatroom())
      .unwrap()
      .then(response => {
        const { success } = Utils.getValues(response, '', false);

        if (success) {
          const { collection } = Utils.getValues(response, 'data', []);
          const sortByUpdated =
            collection.length > 0 &&
            [...collection].sort(
              (a, b) => moment(b.updated_at) - moment(a.updated_at),
            );
          setChatroomList(sortByUpdated);
        }
      });
  };
  const onInitLoadMessage = select_chatroom => {
    startTransition(() => {
      setChatroom(select_chatroom);
      onSwitchChatPage(chatPath.chatScreen);
      setPayloadMessage({
        Page: 1,
        PageSize: 10,
      });
    });
  };
  const loadMessageInChatroom = async () => {
    if (chatroom && payloadMessage) {
      Utils.getData(Config.storageKey.AUTH).then(response => {
        const { token } = Utils.getValues(response, '', {});
        if (token) {
          dispatch(
            getMessageInChatRoom({
              id: chatroom.id,
              Page: payloadMessage.Page,
              PageSize: payloadMessage.PageSize,
            }),
          ).then(async response => {
            const { success = false } = Utils.getValues(
              response,
              'payload',
              false,
            );
            if (success) {
              const { collection } = Utils.getValues(
                response,
                'payload.data',
                [],
              );
              const sortData =
                collection.length > 0
                  ? collection.sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at),
                  )
                  : [];
              let decodedMessageArr = [];
              for (var i = 0; i < sortData.length; i++) {
                const decodedMessage = await Utils.decodeMessage(
                  sortData[i].content,
                );
                decodedMessageArr.push({
                  ...sortData[i],
                  content: decodedMessage,
                });
              }
              //  console.log('decodedMessageArr', decodedMessageArr);
              setChatroomSegment(prev => [...decodedMessageArr, ...prev]);
            }
          });
        }
      });
    }
  };

  const onLoadMoreMessage = () => {
    setPayloadMessage({
      Page: payloadMessage.Page + 1,
      PageSize: payloadMessage.PageSize + 1,
    });
  };
  const onSwitchChatPage = screen => setPageName(screen);
  const onBackToHomePage = () => {
    setChatroomSegment([]);
    onSwitchChatPage(chatPath.homeScreen);
  };

  const onChangeSearch = searchText => {
    startTransition(() => {
      setSearchQuery(searchText);
      onFilterChatRoomLst(searchText);
    });
  };
  const onFilterChatRoomLst = searchText => {
    allChatroom.length > 0 &&
      setChatroomList(
        allChatroom.filter(
          item =>
            item.name_sender.toLowerCase().indexOf(searchText.toLowerCase()) >
            -1,
        ),
      );
  };

  // handle add new message
  const handleAddNewMessage = async () => {
    try {
      if (
        currentChatMessage.length === 0 ||
        !userDetails ||
        !chatroom ||
        socket === null
      ) {
        return;
      }
      Utils.encryptMessage(currentChatMessage).then(resEncryptMessage => {
        // console.log(resEncryptMessage);
        if (!resEncryptMessage || resEncryptMessage.length === 0) return;
        const payload = {
          content: resEncryptMessage,
          created_at: moment().add(7, 'hours'),
          created_by: userDetails.id,
          updated_at: moment().add(7, 'hours'),
          updated_by: userDetails.id,
          is_enabled: true,
          chatroom_id: chatroom.id,
        };
        dispatch(sendMessage({ payload })).then(async response => {
          const { success } = Utils.getValues(response, 'payload', false);
          if (success) {
            const { data } = Utils.getValues(response, 'payload', false);
            const decodedMessage = await Utils.decodeMessage(data?.content);
            const cloneData = JSON.parse(JSON.stringify(data));
            cloneData.content = decodedMessage;
            socket.emit('newChatMessage', {
              approver_id: chatroom.sender_id,
              newMessage: { ...cloneData },
            });
            dispatch(
              updateLastMessage({
                chatroom_id: chatroom.id,
                message: currentChatMessage,
              }),
            );
          }
        });
      });
      setCurrentChatMessage('');
    } catch (error) {
      console.error('Failed to add message', error);
    }
  };
  // create chatroom
  const createChatRoomSync = (user_one, user_two) => {
    const payload = {
      user_one,
      user_two,
      created_at: moment().add(7, 'hours'),
      created_by: user_one,
      is_pinned: true,
      is_read: true,
      last_read_message: '',
      updated_at: moment().add(7, 'hours'),
      updated_by: user_one,
    };
    dispatch(createChatRoom({ payload })).then(() => onLoadAllChatRooms());
  };
  //handle route
  const handleRoute = () => {
    if (route) {
      const { params } = Utils.getValues(route, '', null);
      if (params) {
        const { task, approver_id } = Utils.getValues(route, 'params', null);
        const duplicate = chatroomList?.length > 0 && chatroomList?.find(
          chatroom => chatroom.sender_id === approver_id,
        );
        if (!duplicate && task && approver_id && userDetails) {
          task === string.CREATE_CHAT_ROOM &&
            createChatRoomSync(userDetails.id, approver_id);
        }
      }
    }
  };
  //calc message arrival time
  const calcMessageArrival = messageArrival => {
    if (!Date.parse(messageArrival)) return;
    const now = new Date().getTime(),
      currentTimeMessage = new Date(messageArrival),
      tsec = Math.round((now - currentTimeMessage) / 1000),
      sec = tsec % 60,
      tmin = (tsec - sec) / 60,
      min = tmin % 60,
      th = (tmin - min) / 60,
      h = th % 24,
      d = (th - h) / 24;

    if (d == 1) return 'Hôm qua';
    if (d > 0)
      return `${moment(new Date(messageArrival)).format('DD/MM/YYYY')}`;
    else if (h > 0) return `${h}h trước`;
    else if (min == 0) return 'Mới xong';
    return `${min}m trước`;
  };

  // handle css box styles
  const filterPositionMessages = item => {
    const index = chatSegment.findIndex(el => el.id === item.id);
    if (
      index === chatSegment.length - 1 ||
      chatSegment.length === 1 ||
      index === 0
    ) {
      return 1;
    } else if (
      chatSegment[index].created_by === chatSegment[index - 1].created_by &&
      chatSegment[index].created_by === chatSegment[index + 1].created_by
    ) {
      return 2;
    } else {
      return 3;
    }
  };

  // load socket data
  const onLoadDataThenConnectSocket = () => {
    if (socket === null) return;
    Utils.getData(Config.storageKey.AUTH).then(response => {
      const { token } = Utils.getValues(response, '', {});
      if (token) {
        socket.emit('getAllChatroom', token);
        socket.on('getChatroom', response => {
          if (response) {
            const sortByUpdated =
              response.length > 0 &&
              [...response].sort(
                (a, b) => moment(b.updated_at) - moment(a.updated_at),
              );
            setChatroomList(sortByUpdated || []);
          }
        });
      }
    });
    socket.emit('addNewUser', userDetails?.id);
  };

  useEffect(() => {
    onLoadAllChatRooms();
  }, []);

  useEffect(() => {
    loadMessageInChatroom();
  }, [payloadMessage, chatroom]);

  useEffect(() => {
    const newConnect = io(Config.socketHost, {
      reconnection: true,
      reconnectionDelay: 10,
    });
    userDetails?.id && setSocket(newConnect);
    return () => {
      newConnect.disconnect();
    };
  }, [userDetails]);

  // socket
  useEffect(() => {
    if (socket === null) return;
    onLoadDataThenConnectSocket();
    socket.on('newMessage', response => {
      if (response) {
        onLoadAllChatRooms();
        setChatroomSegment(prevState => [...prevState, { ...response }]);
      }
    });
  }, [socket]);

  useEffect(() => {
    route && handleRoute();
  }, [route]);

  const chatProps = {
    t,
    contactList,
    searchQuery,
    pageName,
    lstMessenger,
    chatroomList,
    chatroom,
    chatSegment,
    userDetails,
    navigation,
    currentChatMessage,
    setCurrentChatMessage,
    onChangeSearch,
    onSwitchChatPage,
    onInitLoadMessage,
    onBackToHomePage,
    handleAddNewMessage,
    calcMessageArrival,
    filterPositionMessages,
    onLoadMoreMessage,
  };

  return <ChatMainView {...propsProvider(chatProps)} />;
};

export default ChatContainer;
