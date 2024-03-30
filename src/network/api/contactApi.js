import axiosClient from '../axios';
import ApiUrl from '../api/apiUrl';
export default {
  requestGetContact: () => axiosClient.get(ApiUrl.GET_CONTACT_LIST),
  requestAddContact: payload =>
    axiosClient.post(ApiUrl.ADD_CONTACT_USER, payload),
  requestGetContactUser: userId =>
    axiosClient.get(`users/${userId}/` + ApiUrl.GET_CONTACT_USER),
};
