import axiosClient from '../axios';
import ApiUrl from '../api/apiUrl';
export default {
  requestGetAlbumByID: ({user_id}) => axiosClient.get(`album/${user_id}`),
  requestAddNewAlbum: payload => axiosClient.get(`album`, payload),
};
