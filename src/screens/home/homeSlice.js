import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import serviceRequest from '../../app/serviceRequest';
import authApi from '../../network/api/authApi';
import homeApi from '../../network/api/homeApi';
import Utils from '../../utils';
export const getQuotation = createAsyncThunk(
  'home/getQuotation',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: homeApi.requestGetRandomQuotation,
      payload: data,
    });
  },
);
export const getBirthDayOfMonth = createAsyncThunk(
  'home/getBirthDayOfMonth',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: homeApi.requestGetBirthdayInMonth,
      payload: data,
    });
  },
);
export const sendNotification = createAsyncThunk(
  'home/sendNotification',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: homeApi.requestSendNotification,
      payload: data,
    });
  },
);
export const getUserDirectManagers = createAsyncThunk(
  'home/getUserDirectManagers',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: homeApi.requestGetMyDirectManagers,
      payload: data,
    });
  },
);


const home = createSlice({
  name: 'home',
  initialState: {},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getQuotation.fulfilled, (state, action) => {
      const {success, data} = Utils.getValues(action, 'payload', false);
      if (success) {
        state.quotation = data;
      }
    });
    builder.addCase(getBirthDayOfMonth.fulfilled, (state, action) => {
      const {success} = Utils.getValues(action, 'payload', false);
      if (success) {
        const {data} = Utils.getValues(action, 'payload', {});
        state.birthdayOfMonth = data;
      }
    });
    
  },
});

const {reducer} = home;
export default reducer;
