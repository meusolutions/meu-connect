import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ToastMessage} from '../../utils/MessageUtil';
import {
  loaderSelector,
  userInfoSelector,
  contactSelector,
  lstMessengerSelector,
  chatroomSelector,
} from '../../app/selectors';
import Utils from '../../utils';
import ChatContainer from './chatContainer';
import {useTranslation} from 'react-i18next';
export default function ChatScreen(props) {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const isLoading = useSelector(loaderSelector);
  const userDetails = useSelector(userInfoSelector);
  const contactList = useSelector(contactSelector);
  const lstMessenger = useSelector(lstMessengerSelector);
  const allChatroom = useSelector(chatroomSelector);
  const chatContainerProps = {
    t,
    dispatch,
    ToastMessage,
    isLoading,
    userDetails,
    contactList,
    route,
    lstMessenger,
    allChatroom,
    navigation,
  };
  return <ChatContainer {...chatContainerProps} />;
}
