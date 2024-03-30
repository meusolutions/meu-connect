import axiosClient from '../axios';
import ApiUrl from '../api/apiUrl';
export default {
  requestGetMyInfo: () => axiosClient.get(ApiUrl.GET_USER_INFO),
  requestCheckDomain: () => axiosClient.get(ApiUrl.CHECK_DOMAIN),
  requestGetUserInfoById: userId =>
    axiosClient.get(ApiUrl.GET_INFO + `/${userId}`),
};
