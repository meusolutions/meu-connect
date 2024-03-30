import axiosClient from '../axios';
import ApiUrl from '../api/apiUrl';
export default {
  requestGetMySocial: data => {
    const {userId} = data;
    return axiosClient.get(`users/${userId}/userExtraContacts`);
  },
  requestAddNewSocial: data => {
    const {userId, payload} = data;
    return axiosClient.post(`users/${userId}/userExtraContacts`, payload);
  },
  requestGetBusinessInfo: data => {
    const {secretKey, id} = data;
    return axiosClient.get(ApiUrl.GET_BUSINESS_INFO + `/${secretKey}?id=${id}`);
  },
  requestRemoveSocial: data => {
    const {socialId} = data;
    return axiosClient.delete(`userExtraContacts/${socialId}`);
  },
  requestEditSocial: data => {
    const {id, payload} = data;
    return axiosClient.put(`userExtraContacts/${id}`, payload);
  },
};
