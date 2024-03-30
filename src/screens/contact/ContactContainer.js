import React, {useCallback, useEffect, useState} from 'react';
import ContactMainView from './template/ContactMainView';
import {PermissionsAndroid} from 'react-native';
import {Linking} from 'react-native';
import Utils from '../../utils';
import {getUserInfoById} from '../profile/profileSlice';
import {getContactOfUser} from './contactSlice';
import RootNavigation from '../../navigation/RootNavigation';
import {APP_NAVIGATE_SCREEN} from '../../utils/constant';
import {ToastMessage} from '../../utils/MessageUtil';
import {t} from 'i18next';
import string from '../../values/string';

const ContactContainer = props => {
  const {dispatch, contactList = [], route} = props;

  const [formatContact, setFormatContactList] = useState([]);
  const [openInfo, setOpenInfo] = useState();
  const [userContactList, setUserContactList] = useState([]);

  const formatContactList = () => {
    var clone = getUniqueListBy([...contactList], 'id');
    var ans = clone
      .filter(item => !item.hasOwnProperty('extend_user_in_contact_list'))
      .sort((a, b) => a.last_name.localeCompare(b.last_name, 'vi'))
      .reduce((agg, curr) => {
        var found = agg.find(
          x => x.last_name.split('')[0] === curr.last_name.split('')[0],
        );
        if (found) {
          found.data.push(curr);
        } else {
          agg.push({
            last_name: curr.last_name.split('')[0],
            data: [curr],
          });
        }
        return agg;
      }, []);
    setFormatContactList(ans);
  };
  const getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map(item => [item[key], item])).values()];
  };
  const onPressOpenInfo = async userInfo => {
    const res = await dispatch(getContactOfUser(userInfo.id));
    const {success} = Utils.getValues(res, 'payload', false);
    setOpenInfo(userInfo);
    if (success) {
      const {collection} = Utils.getValues(res, 'payload.data', []);
      setUserContactList(collection);
    }
  };
  const onPressVisitSocial = async url => {
    if (Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    }
  };
  const onBackPhoneBook = () => {
    setOpenInfo(null);
  };
  const onPressPhoneCall = phoneNumber => {
    Linking.canOpenURL(`tel:${phoneNumber}`).then(supported => {
      if (supported) {
        Linking.openURL(`tel:${phoneNumber}`);
      } else {
        console.log('not supported');
      }
    });
  };
  const onPressSendMailTo = mail => {
    Linking.canOpenURL(`mailto:${mail}`).then(supported => {
      if (supported) {
        Linking.openURL(`mailto:${mail}`);
      } else {
        console.log('not supported');
      }
    });
  };
  const handleParamsFromScan = () => {
    if (route) {
      const {params = null} = route;
      if (params) {
        const {userId} = Utils.getValues(route, 'params', null);
        if (userId) {
          dispatch(getUserInfoById(userId)).then(result => {
            const {success, data} = Utils.getValues(result, 'payload', false);
            if (success) {
              onPressOpenInfo(data);
            }
          });
        }
      }
    }
  };

  const onNavigateToChat = approver_id => {
    RootNavigation.navigate(APP_NAVIGATE_SCREEN.CHAT, {
      task: string.CREATE_CHAT_ROOM,
      approver_id,
    });
    setOpenInfo();
  };

  const requestReadContactPermissions = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // setIsShowContact(true);
    } else {
      ToastMessage({
        title: t('System'),
        message: t('Permissions_failure'),
        type: 'error',
        timeVisible: 5000,
      });
      console.log('Contacts permission denied');
    }
  };
  useEffect(() => {
    requestReadContactPermissions();
  }, []);
  useEffect(() => {
    route && handleParamsFromScan();
  }, [route]);
  useEffect(() => {
    contactList && contactList.length > 0 && formatContactList();
  }, [contactList]);
  const contactProps = {
    contactList,
    formatContact,
    openInfo,
    userContactList,
    onPressPhoneCall,
    onPressOpenInfo,
    onPressVisitSocial,
    onBackPhoneBook,
    onPressSendMailTo,
    onNavigateToChat,
  };

  return <ContactMainView {...contactProps} />;
};

export default ContactContainer;
