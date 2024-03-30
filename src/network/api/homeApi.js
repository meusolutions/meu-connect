import axiosClient from '../axios';
import ApiUrl from '../api/apiUrl';
export default {
  requestGetRandomQuotation: () => axiosClient.get(ApiUrl.GET_RANDOM_QUOTATION),
  requestGetBirthdayInMonth: payload => {
    const {mm, yy} = payload;
    return axiosClient.get(
      ApiUrl.GET_BIRTHDAY_USER + '?year=' + yy + '&month=' + mm,
    );
  },
  requestSendNotification: data => {
    const {sender_id, approver_id, imgPath, payload} = data;
    return axiosClient.post(
      ApiUrl.POST_NOTIFICATION +
        `/${sender_id}/${approver_id}?img_path=${imgPath}`,
      payload,
    );
  },
  requestGetMyDirectManagers: () =>
    axiosClient.get(ApiUrl.GET_MY_DIRECT_MANAGER),

  requestGetCompanyInfo: () => axiosClient.get(ApiUrl.GET_COMPANY_INFO),
};
