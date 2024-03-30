import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import serviceRequest from '../../app/serviceRequest';
import profileApi from '../../network/api/profileApi';
import Utils from '../../utils';

export const changeAvatar = createAsyncThunk(
  'profile/changeAvatar',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: profileApi.requestChangeAvatar,
      payload: data,
    });
  },
);
export const changeUserInfo = createAsyncThunk(
  'profile/changeUserInfo',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: profileApi.requestChangeInfo,
      payload: data,
    });
  },
);

export const getUserInfoById = createAsyncThunk(
  'profile/getUserInfoById',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: profileApi.requestGetUserInfoById,
      payload: data,
    });
  },
);

export const checkCodeInvite = createAsyncThunk(
  'profile/checkCodeInvite',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: profileApi.requestCheckCodeRequest,
      payload: data,
    });
  },
);
export const getInfoMyCompany = createAsyncThunk(
  'profile/getInfoMyCompany',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: profileApi.requestGetInfoCompany,
      payload: data,
    });
  },
);

const profile = createSlice({
  name: 'profile',
  initialState: {},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getInfoMyCompany.fulfilled, (state, action) => {
      const {success} = Utils.getValues(action, 'payload', false);
      if (success) {
        const {collection} = Utils.getValues(action, 'payload.data', []);
        state.myCompanyInfo = collection;
      }
    });
  },
});

const {reducer} = profile;
export default reducer;
