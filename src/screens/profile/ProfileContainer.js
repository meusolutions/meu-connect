import React, {useEffect, useRef, useState} from 'react';
import {
  Linking,
  PermissionsAndroid,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {launchImageLibrary} from 'react-native-image-picker';
import Share from 'react-native-share';
import RNQRGenerator from 'rn-qr-generator';
import {
  FACEBOOK,
  INSTAGRAM,
  LINKEDIN,
  SKYPE,
  TWITTER,
} from '../../assets/svgAsset';
import Config from '../../configuration';
import RootNavigation from '../../navigation/RootNavigation';
import Utils from '../../utils';
import {APP_NAVIGATE_SCREEN} from '../../utils/constant';
import {handleLogout, logout} from '../authentication/login/LoginSlice';
import {addOfficeUserByCode} from '../charge/chargeSlice';
import {addContact} from '../contact/contactSlice';
import propsProvider from './profilePropsProvider';
import {
  changeAvatar,
  changeUserInfo,
  checkCodeInvite,
  getUserInfoById,
} from './profileSlice';
import ProfileMainView from './template/ProfileMainView';
import OneSignal from 'react-native-onesignal';
const ProfileContainer = props => {
  const {
    route,
    dispatch,
    userDetails,
    ToastMessage,
    contactList,
    myRole,
    t,
    socialList,
    myCompanyInfo,
    isActiveMember = false,
  } = props;
  const [isEditField, setEditField] = useState({
    personal_info: false,
    avatar: false,
  });

  const [avatar, setAvatar] = useState();
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [isCollapse, setCollapse] = useState(true);
  const [isSwiper, setSwiper] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalServerVisible, setModalServerVisible] = useState(false);
  const [modalActiveMember, setModalActiveMember] = useState(false);
  const [isShare, setShare] = useState(false);
  const viewShotRef = useRef();

  const [scanInfo, setScanInfo] = useState();
  const [infoUser, setInfoUser] = useState(userDetails);
  const [socialLink, setSocialLink] = useState([]);

  const [activeCode, setActiveCode] = useState('');
  const [editBirthday, setEditBirthday] = useState(false);

  const hideMenu = () => setVisibleMenu(false);
  const showMenu = () => setVisibleMenu(true);

  const hideEditBirthday = () => setEditBirthday(false);
  const showEditBirthday = () => setEditBirthday(true);

  const hideEditInfo = () =>
    setEditField(prev => ({...prev, personal_info: false}));

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        if (!response.didCancel) {
          setAvatar(response.assets);
          setEditField(prev => ({...prev, avatar: true}));
        }
      },
    );
  };

  const showFullScreen = () => {
    setSlideShow(true);
  };
  const onDeniedAvatar = () => {
    setAvatar(null);
  };
  const onConfirmAvatar = async () => {
    if (avatar && avatar.length > 0) {
      let uploadImage = new FormData();
      for (let i = 0; i < avatar.length; i++) {
        uploadImage.append('file', {
          uri: avatar[i].uri,
          name: avatar[i].fileName,
          type: avatar[i].type,
        });
      }
      const res = await dispatch(
        changeAvatar({id: userDetails.id, payload: uploadImage}),
      );
      if (res) {
        setEditField(prev => ({...prev, avatar: false}));
        ToastMessage({
          title: 'Thay avatar thành công 💖',
          type: 'success',
        });
      }
    }
  };
  const onPressScan = () => {
    navigateToScanScreen();
  };
  const onPressCloseScan = () => {
    RootNavigation.goBack();
  };
  const onPressShareInfo = () => {
    setShare(true);
  };

  const onShare = async () => {
    const imgURI = await viewShotRef.current.capture();
    //console.log('imgURI', imgURI)
    const options = {
      title: 'Thông tin của mình',
      subject: `Dùng app để quét thông tin mình nhé`,
      message: `Dùng app để quét thông tin mình nhé`,
      url: imgURI,
    };
    Share.open(options)
      .then(res => {
        setShare(false);
        //console.log(res)
      })
      .catch(err => {
        err && console.log(err);
        setShare(false);
      });
  };
  const onOpenLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        if (!response.didCancel) {
          //setImageUpload(response);

          onScan(response.assets[0].uri);
          // setModalVisible(true);
        }
      },
    );
  };
  const onScan = async image => {
    const res = await RNQRGenerator.detect({uri: image});
    const {values} = res;
    if (values.length === 0) {
      return false;
    }

    const idAndEmail = values[0].split('business-card?id=');
    const ids = idAndEmail[1].split('&email=');
    const userInfo = await dispatch(getUserInfoById(ids[0]));
    const {success, data} = Utils.getValues(userInfo, 'payload', false);
    if (success) {
      onPressCloseScan();
      setScanInfo(data);
      setModalVisible(true);
    } else {
      return false;
    }
    return true;
  };
  const decodeBarcode = async image => {
    if (!image.includes('business-card?id=')) {
      return 'Không tìm thấy thông tin';
    }
    const idAndEmail = image.split('business-card?id=');
    const ids = idAndEmail[1].split('&email=');
    const userInfo = await dispatch(getUserInfoById(ids[0]));
    const {success, data} = Utils.getValues(userInfo, 'payload', false);
    if (success) {
      if (checkUserHaveInContactList(data.id)) {
        return data.id;
      }
      onPressCloseScan();
      setScanInfo(data);
      setModalVisible(true);
    }
    return true;
  };
  const checkUserHaveInContactList = user_id => {
    if (contactList.length > 0) {
      const duplicate = contactList.filter(element => element.id == user_id);

      if (duplicate.length === 0) {
        return false;
      }
      return true;
    }
    return false;
  };
  const onPressAddContact = async user => {
    const payload = {
      user_in_contact: user.id,
    };
    const findContact = [...contactList];
    findContact.length > 0
      ? findContact.find(contact => contact.id == user.id)
        ? null
        : dispatch(addContact(payload))
      : dispatch(addContact(payload));
    setModalVisible(false);
    RootNavigation.navigate(APP_NAVIGATE_SCREEN.CONTACT, {userId: user.id});
  };
  const navigateToLogout = () => {
    OneSignal.removeExternalUserId();
    dispatch(handleLogout());
  };
  const navigateToScanScreen = () => {
    RootNavigation.navigate(APP_NAVIGATE_SCREEN.SCAN, {data: profileProps});
  };
  const navigateToSetting = () => {
    hideMenu();
    RootNavigation.navigate(APP_NAVIGATE_SCREEN.SETTING);
  };
  const handleParamsFromWeb = async () => {
    const {params} = route;
    if (params) {
      const {userId, phone, name, email} = params;
      if (userId) {
        const userInfo = await dispatch(getUserInfoById(userId));
        if (userInfo) {
          setScanInfo(userInfo);
          setModalVisible(true);
        }
      } else if (phone) {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
          {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'Please accept bare mortal',
          },
        )
          .then(() => {
            var newPerson = {
              emailAddresses: [
                {
                  label: 'work',
                  email: email,
                },
              ],
              displayName: name,
              phoneNumbers: [
                {
                  label: 'mobile',
                  number: phone,
                },
              ],
            };

            Contacts.openContactForm(newPerson).then(contact => {
              // contact has been saved
            });
          })
          .catch(e => console.log(e));
      }
    }
  };
  const onPressEditProfile = () => {
    hideMenu();
    setEditField({
      personal_info: true,
      avatar: false,
    });
  };

  const onEditInfo = (key, value) => {
    setInfoUser(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  const onPressCancelEdit = () => {
    setEditField(prev => ({
      ...prev,
      personal_info: false,
    }));
    onDeniedAvatar();
    setInfoUser(userDetails);
  };

  const onPressChangeInfo = () => {
    if (!onHandleAvatar() && avatar) {
      onConfirmAvatar();
    }
    onSaveInfo();
  };
  const onHandleAvatar = () => {
    return userDetails.avatar === avatar;
  };
  const compareInfoUser = () => {
    // check user have change info
    if (JSON.stringify(infoUser) == JSON.stringify(userDetails)) return true;
    return false;
  };

  const onSaveInfo = async () => {
    if (!!compareInfoUser) {
      const payload = {...infoUser};
      const nameLength = payload.extend_user_full_name.split(' ');
      payload.first_name = payload.extend_user_full_name.split(' ')[0];
      payload.middle_name = payload.extend_user_full_name.split(' ')[1];
      payload.last_name =
        (
          nameLength.length >= 3 &&
          payload.extend_user_full_name.split(' ').splice(2)
        )
          .toString()
          .split(',')
          .join(' ') || '';

      const res = await dispatch(changeUserInfo({id: userDetails.id, payload}));
      const success = Utils.getValues(res, 'payload', false);
      if (success) {
        ToastMessage({
          title: 'Thay đổi thông tin thành công 💖',
          type: 'success',
        });
        hideEditInfo();
      } else {
        ToastMessage({
          title: 'Thay đổi thông tin thất bại 💔',
          type: 'error',
        });
      }
    }
  };
  const findSocialSVG = name => {
    const socialSVG = {
      FACEBOOK: <FACEBOOK />,
      SKYPE: <SKYPE />,
      INSTAGRAM: <INSTAGRAM />,
      LINKEDIN: <LINKEDIN />,
      TWITTER: <TWITTER />,
    };
    return socialSVG[name];
  };
  const onPressVisitSocial = async url => {
    if (Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    }
  };

  const onPressRequestInvite = async () => {
    const checkCode = await dispatch(checkCodeInvite(activeCode));
    const {success} = Utils.getValues(checkCode, 'payload', false);

    onPressCloseModalActiveMember();
    if (success) {
      const addOfficeUser = await dispatch(addOfficeUserByCode(activeCode));
      const {success} = Utils.getValues(addOfficeUser, 'payload', false);
      if (success) {
        ToastMessage({
          title: 'Gửi yêu cầu thành công 💖',
          type: 'success',
        });
      } else {
        ToastMessage({
          title: 'Gửi yêu cầu thất bại',
          type: 'error',
        });
      }
    } else {
      ToastMessage({
        title: t('System'),
        message: 'Không tìm thấy công ty',
        type: 'error',
      });
    }
  };

  const onPressOpenModalActiveMember = () => {
    setModalActiveMember(true);
    hideMenu();
  };
  const onPressCloseModalActiveMember = () => {
    setModalActiveMember(false);
  };

  const onNavigateToCharge = () => {
    hideMenu();
    RootNavigation.navigate(APP_NAVIGATE_SCREEN.CHARGE);
  };
  const onNavigateToOtp = () => {
    hideMenu();
    RootNavigation.navigate(APP_NAVIGATE_SCREEN.DELETE_ACCOUNT);
  };
  const onNavigateToSocial = () => {
    RootNavigation.navigate(APP_NAVIGATE_SCREEN.SOCIAL);
  };

  const onCheckValidDate = date => {
    var timestamp = Date.parse(date);

    if (isNaN(timestamp) == false) {
      return new Date();
    }
    return new Date(date);
  };

  const onNavigateToServer = () => {
    setModalServerVisible(true);
  };

  const onSelectServer = name => {
    setVisibleMenu(false);
    Utils.storeData(Config.storageKey.SERVER, name).then(() => {
      Utils.removeData(Config.storageKey.AUTH).then(() => Utils.restartApp());
    });
  };

  useEffect(() => {
    socialList && setSocialLink([...socialList]);
  }, [socialList]);

  useEffect(() => {
    isShare && onShare();
  }, [isShare]);
  useEffect(() => {
    handleParamsFromWeb();
  }, [route]);

  const profileProps = {
    userDetails,
    isEditField,
    avatar,
    viewShotRef,
    isShare,
    visibleMenu,
    onScan,
    navigateToLogout,
    onPressScan,
    onPressCloseScan,
    decodeBarcode,
    openGallery,
    showFullScreen,
    onPressShareInfo,
    onOpenLibrary,
    onDeniedAvatar,
    onConfirmAvatar,
    showMenu,
    hideMenu,
  };
  const profilePropsContainer = {
    modalVisible,
    onPressAddContact,
    scanInfo,
    setModalVisible,
    userDetails,
    isEditField,
    avatar,
    viewShotRef,
    isShare,
    visibleMenu,
    contactList,
    infoUser,
    isSwiper,
    socialLink,
    myRole,
    activeCode,
    modalActiveMember,
    t,
    editBirthday,
    myCompanyInfo,
    isActiveMember,
    modalServerVisible,
    isCollapse,
    setCollapse,
    setModalServerVisible,
    navigateToSetting,
    onPressCloseModalActiveMember,
    setModalActiveMember,
    onPressOpenModalActiveMember,
    setActiveCode,
    setSwiper,
    openGallery,
    onDeniedAvatar,
    onConfirmAvatar,
    onPressEditProfile,
    onPressShareInfo,
    navigateToLogout,
    onPressScan,
    onEditInfo,
    setVisibleMenu,
    onPressCancelEdit,
    onPressChangeInfo,
    onSaveInfo,
    findSocialSVG,
    onPressVisitSocial,
    onNavigateToCharge,
    onNavigateToOtp,
    onScan,
    onPressCloseScan,
    decodeBarcode,
    showFullScreen,
    onOpenLibrary,
    showMenu,
    hideMenu,
    onPressRequestInvite,
    showEditBirthday,
    hideEditBirthday,
    onCheckValidDate,
    onNavigateToSocial,
    onNavigateToServer,
    onSelectServer,
  };

  return <ProfileMainView {...propsProvider(profilePropsContainer)} />;
};

export default ProfileContainer;
