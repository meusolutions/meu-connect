import Moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  Linking,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {appStore, chPlayLink, supportedURL} from '../../configuration';
import colors from '../../values/colors';
import HomeMainView from './template/HomeMainView';
import {
  getBirthDayOfMonth,
  getQuotation,
  getUserDirectManagers,
  sendNotification,
} from './homeSlice';
import {getContactList, addUserToContactList} from '../contact/contactSlice';
import {getInfoMyCompany, getUserInfoById} from '../profile/profileSlice';
import {getMySocials} from '../social/SocialSlice';
import {checkActiveMember} from '../charge/chargeSlice';
import Utils from '../../utils';
import {ToastMessage} from '../../utils/MessageUtil';
import {t} from 'i18next';
var md5 = require('md5');
const HomeContainer = props => {
  const {userDetails, dispatch, quotation, birthdayOfMonth} = props;
  const MINUTE_MS = 60000;
  const dataBirthday = [
    {
      id: 0,
      name: 'Tiến Dũng',
      position: 'Phó giám đốc',
    },
    {
      id: 1,
      name: 'Vĩnh Lộc',
      position: 'Trưởng phòng nhân sự',
    },
    {
      id: 2,
      name: 'Phước Vũ',
      position: 'Trường phòng test',
    },
    {
      id: 3,
      name: 'Thanh Bình',
      position: 'Trưởng phòng test',
    },
  ];
  const [messageBirthday, setMessageBirthday] = useState({
    massage: '',
    imgPath: null,
  });
  const [openView, setOpenView] = useState([
    {enable: false},
    {enable: false},
    {enable: false},
    {enable: false},
  ]);
  const [bdUserCurrentMonth, setArrBdCurrentMonth] = useState();
  const [birthdayOfUser, setBirthOfUser] = useState();

  {
    /* modal - item birthdayArr - Image*/
  }
  const [modalVisible, setModalVisible] = useState({
    isVisible: false,
    birthdayArr: null,
    day: '',
    managerOpenWish: [],
  });

  const handleOpenDesBirthday = useCallback(
    day => {
      if (birthdayOfMonth) {
        const formatDate = `${day.day < 10 ? `0${day.day}` : `${day.day}`}-${
          day.month < 10 ? `0${day.month}` : `${day.month}`
        }-${day.year}`;
        let arrBdUser = [];
        let lengthKey = [];
        for (const [key, value] of Object.entries(birthdayOfMonth)) {
          if (key.includes(formatDate)) {
            arrBdUser.push(...value);
            value.forEach(item => lengthKey.push({enable: false}));
          }
        }
        setModalVisible({
          isVisible: true,
          birthdayArr: arrBdUser,
          day: day,
          managerOpenWish: lengthKey,
        });
      }
    },
    [birthdayOfMonth],
  );
  const handleCloseDesBirthday = useCallback(() => {
    setModalVisible({isVisible: false});
  }, []);
  const OpenURLButton = async () => {
    const supported = await Linking.canOpenURL(supportedURL);

    if (supported) {
      await Linking.openURL(supportedURL);
    } else {
      if (Platform.OS === 'ios') {
        await Linking.openURL(appStore);
      } else {
        await Linking.openURL(chPlayLink);
      }
    }
  };
  const openModalHappyBirthday = index => {
    //console.log("item", index)
    let newState = [...openView];
    newState[index].enable = true;
    setOpenView(newState);
    //setOpenView(state => ({ ...state, [openView[index].enable]: true }))
  };
  const closeModalHappyBirthday = index => {
    let newState = [...openView];
    newState[index].enable = false;
    setOpenView(newState);
  };
  const openModalWishBirthday = index => {
    let managerOpenWish = [...modalVisible.managerOpenWish];
    managerOpenWish[index].enable = true;
    setModalVisible(prev => ({...prev, managerOpenWish}));
    // console.log("clone", clone)
  };
  const closeModalWishBirthday = index => {
    let managerOpenWish = [...modalVisible.managerOpenWish];
    managerOpenWish[index].enable = false;
    setModalVisible(prev => ({...prev, managerOpenWish}));
    setMessageBirthday({
      massage: '',
      imgPath: null,
    });
  };

  const formatDateList = async () => {
    var size = Object.keys(birthdayOfMonth).length;
    const today = new Date();
    const formatToday = Moment(today).format('DD-MM-YYYY');
    if (size >= 1) {
      let lstBdUser = [];
      for (const [key, value] of Object.entries(birthdayOfMonth)) {
        if (value.length > 0) {
          //console.log("key", value)
          if ([key].length > 0) {
            const formatToday = [key];
            const arr = formatToday[0].split('-');
            const res = arr[2] + '-' + arr[1] + '-' + arr[0];
            // console.log('formatToday', arr[2] + '-' + arr[1] + '-' + arr[0])
            lstBdUser.push({
              [res]: {
                selected: false,
                marked: true,
                dotColor: colors.red,
              },
            });
          }
        }
        if (key.includes(formatToday)) {
          const lengthObj = birthdayOfMonth[key];
          //console.log("lengthObj", lengthObj);
          if (lengthObj.length <= 0) {
          } else {
            lengthObj.forEach(o => {
              //console.log("nameUser", name)
              setBirthOfUser(lengthObj);
            });
          }
        }
      }
      //console.log({ ...lstBdUser })
      const convertArr = Object.assign({}, ...lstBdUser);
      setArrBdCurrentMonth(convertArr);
    }
  };
  const getBirthDayUserByMonth = async () => {
    const date = new Date();
    const month =
      date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    //console.log(month)
    dispatch(getBirthDayOfMonth({mm: month, yy: date.getFullYear()}));
  };
  const onCalendarChangeMonth = time => {
    dispatch(getBirthDayOfMonth(time.month, time.year));
  };
  const addMoreImgFromGallery = async index => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'App Camera Permission',
            message:
              'App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: true,
            },
            response => {
              //console.log('res', response);
              if (!response.didCancel) {
                //console.log('res', response.assets)
                const {assets} = response;
                let clone = modalVisible.birthdayArr;
                //console.log("index", clone[index])
                if (clone[index]?.imgArr?.length > 0) {
                  clone[index]?.imgArr.push(...assets);
                } else {
                  clone[index].imgArr = assets;
                }
                setModalVisible(prev => ({...prev, birthdayArr: clone}));
                //console.log("index", clone[index])
              }
            },
          );
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const loadRandomQuotation = () => {
    dispatch(getQuotation());
  };

  const sendHappyBirthday = approver_id => {
    if (messageBirthday.massage.length === 0) return;
    const payload = {
      sTitle: 'Chúc mừng sinh nhật',
      sDetails: messageBirthday.massage,
      type: 208,
      sCodeForGrouping: '200',
    };
    dispatch(
      sendNotification({
        sender_id: userDetails.id,
        approver_id,
        imgPath: messageBirthday.imgPath,
        payload,
      }),
    );
    ToastMessage({
      title: t('System'),
      message: t('Send_message_success'),
    });
  };
  const onLoadContacts = async () => {
    const listContact = await dispatch(getContactList());
    const {success} = Utils.getValues(listContact, 'payload', false);

    if (success) {
      const {collection} = Utils.getValues(listContact, 'payload.data', []);
      collection.length > 0 &&
        collection.map(item => {
          dispatch(getUserInfoById(item.user_in_contact)).then(result => {
            const {success, data} = Utils.getValues(result, 'payload', false);
            if (success) {
              dispatch(addUserToContactList(data));
            }
          });
        });
    }
  };
  const onLoadBusinessInfo = async () => {
    if (userDetails) {
      dispatch(getMySocials({userId: userDetails.id}));
    }
  };
  const initialLoad = async () => {
    getBirthDayUserByMonth();
    dispatch(checkActiveMember());
    dispatch(getUserDirectManagers());
    dispatch(getInfoMyCompany());
    onLoadContacts();
    onLoadBusinessInfo();
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    const intervalQuotes = setInterval(() => {
      loadRandomQuotation();
    }, MINUTE_MS);

    initialLoad();
    return () => {
      backHandler.remove();
      clearInterval(intervalQuotes);
    };
  }, []);

  useEffect(() => {
    userDetails && onLoadBusinessInfo();
  }, [userDetails]);

  useEffect(() => {
    birthdayOfMonth && formatDateList();
  }, [birthdayOfMonth]);
  //props
  const homeProps = {
    userDetails,
    quotation,
    birthdayOfUser,
    dataBirthday,
    openView,
    bdUserCurrentMonth,
    birthdayOfMonth,
    modalVisible,
    messageBirthday,
    openModalHappyBirthday,
    closeModalHappyBirthday,
    openModalWishBirthday,
    closeModalWishBirthday,
    OpenURLButton,
    handleOpenDesBirthday,
    handleCloseDesBirthday,
    addMoreImgFromGallery,
    onCalendarChangeMonth,
    sendHappyBirthday,
    setMessageBirthday,
  };
  return <HomeMainView {...homeProps} />;
};

export default HomeContainer;
