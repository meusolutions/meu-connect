import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import serviceRequest from '../../../app/serviceRequest';
import authApi from '../../../network/api/authApi';
import OneSignal from 'react-native-onesignal';
import Utils from '../../../utils';
import Config from '../../../configuration';
import RootNavigation from '../../../navigation/RootNavigation';
export const login = createAsyncThunk(
  'authenticate/login',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: authApi.requestLoginApp,
      payload: data,
    });
  },
);
export const deleteAccount = createAsyncThunk(
  'authenticate/deleteAccount',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: authApi.requestDeleteAccount,
      payload: data,
    });
  },
);

export const getMyInfo = createAsyncThunk(
  'authenticate/getMyInfo',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: authApi.requestGetMyInfo,
      payload: data,
    });
  },
);
export const logout = createAsyncThunk(
  'authenticate/logout',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: authApi.requestLogoutApp,
      payload: data,
    });
  },
);
export const deleteOtp = createAsyncThunk(
  'authenticate/sendDeleteOtp',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: authApi.requestSendDeleteOtp,
      payload: data,
    });
  },
);
export const sendEmailRecovery = createAsyncThunk(
  'authenticate/sendEmailRecovery',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: authApi.requestSendMailRecovery,
      payload: data,
    });
  },
);
export const signUp = createAsyncThunk(
  'authenticate/signUp',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: authApi.requestSignUpAccount,
      payload: data,
    });
  },
);
export const getMyRole = createAsyncThunk(
  'authenticate/getMyRole',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: authApi.requestGetMyRole,
      payload: data,
    });
  },
);
const authenticate = createSlice({
  name: 'authenticate',
  initialState: {},
  reducers: {
    handleGetRole: (state, action) => {
      state.myRole = action.payload;
    },
    handleLogout: (state, action) => {
      state.token = null;
      Utils.removeData(Config.storageKey.AUTH).then(() => {
        RootNavigation.replace(Config.screenKey.LOGIN);
      });
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      const {success, token} = action.payload;
      if (success) {
        state.token = token;
        Utils.storeData(Config.storageKey.AUTH, state);
      }
    });
    builder.addCase(getMyInfo.fulfilled, (state, action) => {
      const {success, user} = action.payload;
      if (success) {
        state.userInfo = user;
        OneSignal.setExternalUserId(user.id, results => {});
      }
    });
    builder.addCase(getMyRole.fulfilled, (state, action) => {
      const {success} = Utils.getValues(action, 'payload', false);

      if (success) {
        const {data} = Utils.getValues(action, 'payload', false);
        Utils.storeData(Config.storageKey.ROLE, data);
        state.myRole = data;
      }
    });
    builder.addCase(logout.fulfilled, (state, action) => {});
  },
});

const {reducer} = authenticate;
export const {handleGetRole, handleLogout} = authenticate.actions;
export default reducer;
