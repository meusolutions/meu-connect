export const API_URL = 'https://clbdoanhnhanhotran.meu-solutions.com/api/';
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

export const APP_NAVIGATE_SCREEN = {
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
  SOCIAL: 'Social',
  SETTING: 'Setting',
  CHAT: 'Chat',
  HOME_PROFILE: 'Hồ sơ',
  ALBUM_PROFILE: 'Album',
  PRODUCTION_PROFILE: 'Sản phẩm',
};

export const ADMIN_NAVIGATE_SCREEN = {
  ADMIN_EVENT: 'ADMIN_EVENT',
  ADD_EDIT_EVENT: 'ADD_EDIT_EVENT',
  EVENT_DETAIL: 'EVENT_DETAIL',
  SCAN_QR: 'SCAN_QR',
  QR_VERIFY: 'QR_VERIFY',
};

export const TAB_BOTTOM_NAVIGATE = {
  ADMIN_EVENT: 'ADMIN_EVENT',
  USER_EVENT: 'USER_EVENT',
  NOTIFICATION: 'NOTIFICATION',
  PROFILE: 'PROFILE',
  DASHBOARD: 'DASHBOARD',
};
export const USER_NAVIGATE_SCREEN = {
  EVENT_DETAIL: 'EVENT_DETAIL',
};

export const textValidate = {
  phone: {
    error_validate: 'Phone number is error validate',
    require: 'Please enter phone number',
  },
  pass: {
    require: 'Please enter a password',
    short: 'Pass word dont short more than 6 char',
    long: 'Pass word dont long more than 25 char ',
  },
  re_pass: {
    not_found: 'Confirm password incorrect',
    require: 'Please enter confirm password',
  },
  full_name: {
    require: 'Please enter a full name',
    error_validate: 'Full name is error validate!',
  },
  company: {
    require: 'Please enter a company',
  },
  email: {
    require: 'Please enter a email!',
    error_validate: 'Email is error validate!',
  },
};
export const TYPE_TAB_EVENT_ADMIN = {
  NOT: 1,
  GOING: 2,
  HAPPENED: 3,
};
