import axiosClient from '../axios';
import ApiUrl from '../api/apiUrl';
export default {
  requestGetMyInfo: () => axiosClient.get(ApiUrl.GET_USER_INFO),
  requestGetUserInfoById: userId =>
    axiosClient.get(ApiUrl.GET_INFO + `/${userId}`),
  requestGetRandomQuotation: () => axiosClient.get(ApiUrl.GET_RANDOM_QUOTATION),
  requestGetBirthdayUser: (mm, yy) =>
    axiosClient.get(ApiUrl.GET_BIRTHDAY_USER + '?year=' + yy + '&month=' + mm),

  requestGetMyDirectManagers: () =>
    axiosClient.get(ApiUrl.GET_MY_DIRECT_MANAGER),

  requestPostImage: payload => axiosClient.post(ApiUrl.UPLOAD_IMAGE, payload),
  requestGetImageList: OTId =>
    axiosClient.get(`${ApiUrl.GET_LIST_IMAGE}/` + OTId),
  requestPostUpload: (id, payload) =>
    axiosClient.put(ApiUrl.UPLOAD_IMAGE + `/${id}/upload`, payload),

  requestChangeAvatar: (id, payload) =>
    axiosClient.put(ApiUrl.CHANGE_AVATAR + `/${id}/uploadAvatar`, payload),
  requestChangeInfo: (id, payload) =>
    axiosClient.put(ApiUrl.CHANGE_INFO + `/${id}`, payload),
  requestGetBusinessInfo: (secretKey, id) =>
    axiosClient.get(ApiUrl.GET_BUSINESS_INFO + `/${secretKey}?id=${id}`),
  // contact information
  requestGetContactUser: userId =>
    axiosClient.get(`users/${userId}/` + ApiUrl.GET_CONTACT_USER),
  requestChangeContactUser: (itemId, payload) =>
    axiosClient.put(ApiUrl.CHANGE_CONTACT_USER + `/${itemId}`, payload),
  requestDeleteContactUser: itemId =>
    axiosClient.delete(ApiUrl.CHANGE_CONTACT_USER + `/${itemId}`),

  requestGetCompanyInfo: () => axiosClient.get(ApiUrl.GET_COMPANY_INFO),

  requestAddContact: payload =>
    axiosClient.post(ApiUrl.ADD_CONTACT_USER, payload),
  requestGetContact: () => axiosClient.get(ApiUrl.GET_CONTACT_LIST),

  requestSignUpAccount: payload => axiosClient.post(ApiUrl.GET_INFO, payload),

  requestSendNotification: (sender_id, approver_id, imgPath, payload) =>
    axiosClient.post(
      ApiUrl.POST_NOTIFICATION +
        `/${sender_id}/${approver_id}?img_path=${imgPath}`,
      payload,
    ),
  requestGetListCharge: () => axiosClient.get('charge'),
  requestAddNewCharge: payload => axiosClient.post('charge', payload),
  requestSendDeleteOtp: () => axiosClient.post('authenticate/send-delete-otp'),
  requestDeleteAccount: payload =>
    axiosClient.delete('authenticate/deleteAccount', payload),
};
