import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import serviceRequest from '../../app/serviceRequest';
import chargeApi from '../../network/api/chargeApi';
import Utils from '../../utils';
export const getMemberShip = createAsyncThunk(
  'charge/getMemberShip',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: chargeApi.requestGetListCharge,
      payload: data,
    });
  },
);
export const addMemberShipByAdmin = createAsyncThunk(
  'charge/addMemberShipByAdmin',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: chargeApi.requestAddNewCharge,
      payload: data,
    });
  },
);
export const addOfficeUserByCode = createAsyncThunk(
  'charge/addOfficeUserByCode',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: chargeApi.requestAddUserOfficeByCode,
      payload: data,
    });
  },
);
export const checkActiveMember = createAsyncThunk(
  'charge/checkActiveMember',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: chargeApi.requestCheckActiveMembership,
      payload: data,
    });
  },
);
const charge = createSlice({
  name: 'charge',
  initialState: {},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMemberShip.fulfilled, (state, action) => {
      const {success} = Utils.getValues(action, 'payload', false);
      if (success) {
        const {collection} = Utils.getValues(action, 'payload.data', []);
        state.memberList = collection;
      }
    });
    builder.addCase(checkActiveMember.fulfilled, (state, action) => {
      const {success} = Utils.getValues(action, 'payload', false);
      if (success) {
        const {active} = Utils.getValues(action, 'payload.data', false);
        state.isActiveMembership = active;
      }
    });
  },
});

const {reducer} = charge;
export default reducer;
