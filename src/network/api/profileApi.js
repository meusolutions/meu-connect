import axiosClient from '../axios';
import ApiUrl from '../api/apiUrl';
export default {
  requestChangeAvatar: data => {
    const {id, payload} = data;
    return axiosClient.put(
      ApiUrl.CHANGE_AVATAR + `/${id}/uploadAvatar`,
      payload,
    );
  },
  requestGetUserInfoById: userId =>
    axiosClient.get(ApiUrl.GET_INFO + `/${userId}`),
  requestChangeInfo: data => {
    const {id, payload} = data;
    return axiosClient.put(ApiUrl.CHANGE_INFO + `/${id}`, payload);
  },

  requestCheckCodeRequest: code => {
    return axiosClient.get(`office/${code}`);
  },
  requestGetInfoCompany: () => {
    return axiosClient.get(`myOffices`);
  },
};
