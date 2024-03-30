import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import serviceRequest from '../../app/serviceRequest';
import socialApi from '../../network/api/socialApi';
import Utils from '../../utils';

export const addNewSocial = createAsyncThunk(
  'social/addNewSocial',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: socialApi.requestAddNewSocial,
      payload: data,
    });
  },
);
export const getMySocials = createAsyncThunk(
  'social/getMySocials',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: socialApi.requestGetMySocial,
      payload: data,
    });
  },
);
export const removeSocial = createAsyncThunk(
  'social/removeSocial',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: socialApi.requestRemoveSocial,
      payload: data,
    });
  },
);
export const editSocial = createAsyncThunk(
  'social/editSocial',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: socialApi.requestEditSocial,
      payload: data,
    });
  },
);
const social = createSlice({
  name: 'social',
  initialState: {},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMySocials.fulfilled, (state, action) => {
      const {success} = Utils.getValues(action, 'payload', false);
      if (success) {
        const {collection} = Utils.getValues(action, 'payload.data', []);
        state.socialList = collection;
      }
    });
  },
});

const {reducer} = social;
export default reducer;
