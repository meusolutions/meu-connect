const envConfig = {
  devEndPoint: 'https://clbdoanhnhanhotran.meu-solutions.com/api/',
  prodEndPoint: 'https://clbdoanhnhanhotran.meu-solutions.com/api/',
  siybEndPoint: 'https://siyb-dev.meu-solutions.com/api/',
  josunEndPoint: 'https://josun-dev.meu-solutions.com/api/',
  dtlabEndPoint: 'https://dtlab.vn/api/',
};
//const socketHost = 'http://192.168.1.6:4000';
const socketHost = 'http://192.168.0.17:4000';

const KEY_TAG = 'com.meu-solutions.app.key_tag';
const isDevEnv =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const endPoint = isDevEnv ? envConfig.devEndPoint : envConfig.prodEndPoint;

export const storageKey = {
  AUTH: 'AUTH',
  LOAD_PROGRAM: 'LOAD_PROGRAM',
  LOAD_SPONSOR: 'LOAD_SPONSOR',
  ROLE: 'ROLE',
  THEME: 'THEME',
  RSA: 'RSA',
  SERVER: 'SERVER',
};
export const STAGING_URL_IMAGE =
  'https://gateway.dev.meu-solutions.com/meueventchecking/';
export const DATE_FORMAT = 'DD-MM-YYYY';
export const REG_EMAIL =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
export const API_GEOLOCATION_KEY =
  'FIuOYRrD9smvnS4PPzhkS7oRv8Xv4CO4smmX9RQ8e_4';
export const NAME_REGEX =
  /^[a-zA-Z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
export const supportedURL = 'im-checkin://login_step_2';
export const chPlayLink =
  'https://play.google.com/store/apps/details?id=com.imchecking';
export const appStore =
  'https://apps.apple.com/vn/app/imcheckin/id1545100199?l=vi';
const screenKey = {
  SPLASH: 'SPLASH',
  LOGIN: 'LOGIN',
  SEARCH: 'SEARCH',
  SIGN_UP: 'SIGN_UP',
  INPUT_MAIL: 'INPUT_MAIL',
  CONFIRM_OTP: 'CONFIRM_OTP',
  CHANGE_PASS: 'CHANGE_PASS',
  MAIN: 'DASHBOARD',
  USER_PROFILE_EDIT: 'USER_PROFILE_EDIT',
  NOTIFICATION_LIST: 'NotificationNavigation',
  DASHBOARD: 'DASHBOARD',
  PROFILE: 'Profile',
  HOME: 'Home',
  PERSONNEL: 'Nhân sự',
  ON_LEAVE: 'Nghỉ phép',
  CONFIRM_DATE: 'Xác nhận ngày công',
  OVERTIME: 'Tăng ca',
  SALARY: 'Lương',
  SHIFT: 'Timesheet của tôi',
  CONFIRM_SHIFT_DETAIL: 'Chi tiết timesheet chờ duyệt',
  WORK_LOAD: 'Bảng chấm công',
  FORGOT_PASS: 'Quên mật khẩu',
  DAY_WAGE: 'Công nhật',
  Notification: 'Thông báo',
  INTRO: 'Intro',
  SERVER: 'Server',
  CONTACT: 'Contact',
  SCAN: 'Quét mã',
  CHARGE: 'Charge',
  DELETE_ACCOUNT: 'Delete Account',
};
const defaultTheme = {
  checked: true,
  icon: 13,
  name: 'Blue sea',
};
const chatPath = {
  homeScreen: 'home screen',
  chatScreen: 'chat screen',
};
const albumPath = {
  AddNewScreen: 'add new screen',
  ShowScreen: 'show screen',
};
const Config = {
  isDevEnv,
  storageKey,
  endPoint,
  screenKey,
  appStore,
  chPlayLink,
  supportedURL,
  defaultTheme,
  socketHost,
  KEY_TAG,
  albumPath,
  envConfig,
};
export {chatPath};
export default Config;
