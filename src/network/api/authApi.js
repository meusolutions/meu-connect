import axiosClient from '../axios';
import ApiUrl from '../api/apiUrl';
export default {
  requestConfirmOTP: ({otp, email}) =>
    axiosClient.post('check-otp', {otp, email}),

  requestSendMail: email =>
    axiosClient.post('users/forgotPassword?username=' + email),

  requestChangePassword: payload => axiosClient.post('reset-password', payload),

  requestLoginApp: ({name, pass}) =>
    axiosClient.post(
      ApiUrl.LOG_IN + '?username=' + name + '&password=' + pass,
      {},
    ),
  requestGetMyInfo: () => axiosClient.get(ApiUrl.GET_USER_INFO),

  requestLogoutApp: ({token}) => axiosClient.post(ApiUrl.LOG_OUT, {token}),

  requestDeleteAccount: payload =>
    axiosClient.delete('authenticate/deleteAccount', payload),

  requestSendDeleteOtp: () => axiosClient.post('authenticate/send-delete-otp'),

  requestSendMailRecovery: email =>
    axiosClient.post('users/forgotPassword?username=' + email),

  requestSignUpAccount: payload => axiosClient.post(ApiUrl.GET_INFO, payload),

  requestGetMyRole: () => axiosClient.get('getMyRole'),
};
