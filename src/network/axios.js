import axios from 'axios';
import GlobalConfig from '../configuration';
import Utils from '../utils';

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(async config => {
  const auth = await Utils.getData(GlobalConfig.storageKey.AUTH);
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response?.data) {
      return response.data;
    }
    return response;
  },
  error => {
    throw error;
  },
);

export default axiosClient;
