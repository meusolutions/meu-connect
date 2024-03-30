import axiosClient from '../axios';
export default {
  requestGetListCharge: () => axiosClient.get('charge'),
  requestAddNewCharge: payload => axiosClient.post('charge', payload),
  requestAddUserOfficeByCode: code => axiosClient.post(`officeUsers/${code}`),
  requestCheckActiveMembership: () => axiosClient.get('myCharge'),
};
