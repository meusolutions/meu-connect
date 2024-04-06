import axiosClient from '../axios';
import ApiUrl from '../api/apiUrl';
export default {
  requestGetAlbumByID: ({ user_id }) => {
    return axiosClient.get(`album/${user_id}`)
  },
  requestAddNewAlbum: payload => axiosClient.post(`album`, payload),
  requestDeleteAlbum: ({ id }) => axiosClient.delete(`album/${id}`),
};
