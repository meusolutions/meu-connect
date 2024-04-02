import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import RNRestart from 'react-native-restart';
import { LogoSocial } from '../values/images';
import { RSAKeychain, RSA } from 'react-native-rsa-native';
import Config from '../configuration';
import axiosClient from '../network/axios';
var _ = require('lodash');
const AllLogoSocial = [
  {
    icon: LogoSocial.IcTwitter,
    name: 'TWITTER',
  },
  {
    icon: LogoSocial.IcEmail,
    name: 'EMAIL',
  },
  {
    icon: LogoSocial.IcFacebook,
    name: 'FACEBOOK',
  },
  {
    icon: LogoSocial.IcSkype,
    name: 'SKYPE',
  },
  {
    icon: LogoSocial.IcInstagram,
    name: 'INSTAGRAM',
  },
  {
    icon: LogoSocial.IcLinkedIn,
    name: 'LINKEDIN',
  },
  {
    icon: LogoSocial.IcZalo,
    name: 'ZALO',
  },
];
const storeData = async (storageKey, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async storageKey => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (e) {
    // error reading value
  }
};
const removeData = async storageKey => {
  try {
    await AsyncStorage.removeItem(storageKey);
  } catch (e) {
    // error reading value
  }
};

const sortByDate = eventFavorite => {
  const sortedEvents = [...eventFavorite].sort((a, b) => {
    if (!a.date) {
      return 1;
    }
    if (!b.date) {
      return -1;
    }
    const getDateA = `${a.date.split('T')[0]}T${moment(
      a.start_time ?? '13:00:00',
      'HH:mm:ss',
    ).format('HH:mm:ss')}`;
    const getDateB = `${b.date.split('T')[0]}T${moment(
      b.start_time ?? '13:00:00',
      'HH:mm:ss',
    ).format('HH:mm:ss')}`;
    const currentDate = moment();
    const diffA = Math.abs(currentDate.diff(getDateA));
    const diffB = Math.abs(currentDate.diff(getDateB));
    return diffA - diffB;
  });
  return sortedEvents;
};

// const startTime = new Date('2023-03-16T12:55:00+07:00');
const calculateElapsedSeconds = (eventDate, eventTime) => {
  const eventDateTime = moment(
    `${eventDate.split('T')[0]}T${eventTime ?? '13:00:00'}`,
  );
  const now = moment();
  const elapsedSeconds = Math.max(eventDateTime.diff(now, 'seconds'), 0) - 300;
  return elapsedSeconds <= 0 ? 0 : elapsedSeconds;
};

const uuidToInt32 = uuid => {
  const hexString = uuid.replace(/-/g, '');
  const intVal = parseInt(hexString, 16);
  const maxInt32 = Math.pow(2, 32) - 1;
  const int32Val = intVal > maxInt32 ? intVal % maxInt32 : intVal;
  const strVal = int32Val.toString().slice(0, 9).padStart(9, '0');
  return strVal;
};

/**
 * Nested Object or Array data value retriever
 * @param source
 * @param variables {string}
 * @param fallbackValue {any}
 * @param allowNull
 * @returns {any|boolean|string}
 */
const getValues = (
  source,
  variables = '',
  fallbackValue = false,
  allowNull = false,
) => {
  const targetValueHierarchy = (variables || '')
    .toString()
    .replace(/[[\]]/g, '.')
    .split('.')
    .filter(key => key !== '');

  if (source === null && allowNull && targetValueHierarchy.length === 0) {
    return null;
  }

  // Check for string type because string is subtype of Array
  // Don't worry, if the data type not an object or array will fail after that.
  if (!source || ['string, boolean'].includes(typeof source)) {
    return fallbackValue;
  }

  // Retain data type cause data type is dynamic
  let result = Object.assign(source);

  for (let i = 0; i < targetValueHierarchy.length; i++) {
    result = result[targetValueHierarchy[i]];

    if (result === undefined) {
      break;
    }

    if (result === null && i !== targetValueHierarchy.length - 1) {
      result = undefined;
      break;
    }
  }

  if (result === null) {
    return allowNull ? result : fallbackValue;
  }

  return result !== undefined ? result : fallbackValue;
};

const formatDiffHours = time => {
  var a = moment(time);
  var b = moment();
  if (a.diff(b, 'days') >= 0) {
    if (moment().diff(time, 'minutes') >= 60)
      return moment().diff(time, 'hours') + ' giờ';
    return moment().diff(time, 'minutes') + ' phút';
  }
  return b.diff(a, 'days') + ' ngày trước';
};
function capitalizeFLetter(string) {
  if (string) {
    const stringLower = string.toLowerCase();
    return stringLower[0].toUpperCase() + stringLower.slice(1);
  }
}

const findLogoContact = logo => {
  const logoSocial = {
    TWITTER: LogoSocial.IcTwitter,
    EMAIL: LogoSocial.IcEmail,
    FACEBOOK: LogoSocial.IcFacebook,
    SKYPE: LogoSocial.IcSkype,
    INSTAGRAM: LogoSocial.IcInstagram,
    LINKEDIN: LogoSocial.IcLinkedIn,
    ZALO: LogoSocial.IcZalo,
  };
  return logoSocial[logo];
};
const restartApp = () => {
  RNRestart.restart();
};
const onCreateRSA = async () => {
  // const keys = await RSA.generateKeys(Config.KEY_TAG_ENCRYPT);
  // storeData(Config.storageKey.RSA, JSON.stringify(keys));
};
const encryptMessage = async message => {
  if (message.length === 0) return 0;
  let publicKey = await generateKeyPair(Config.KEY_TAG);
  const resEncodedMessage = await RSAKeychain.encrypt(message, Config.KEY_TAG);
  return resEncodedMessage;
};
const decodeMessage = async message => {
  const resDecodedMessage = await RSAKeychain.decrypt(message, Config.KEY_TAG);
  return resDecodedMessage;
};

const generateKeyPair = async () => {
  let keys = await RSAKeychain.generate(Config.KEY_TAG);
  return keys.public;
};

const searchServer = name => {
  const server = {
    DTLAB: Config.envConfig.dtlabEndPoint,
    JOSUN: Config.envConfig.josunEndPoint,
    SIYB: Config.envConfig.siybEndPoint,
    CLBDN: Config.envConfig.devEndPoint,
  };
  return server[name];
};

const searchAvatar = (avatar) => {

  const url = axiosClient.defaults.baseURL.split('/api')[0];
  return url + avatar

}

const Utils = {
  AllLogoSocial,
  storeData,
  getData,
  removeData,
  sortByDate,
  uuidToInt32,
  calculateElapsedSeconds,
  getValues,
  formatDiffHours,
  capitalizeFLetter,
  findLogoContact,
  restartApp,
  encryptMessage,
  decodeMessage,
  onCreateRSA,
  searchServer,
  searchAvatar
};
export default Utils;
