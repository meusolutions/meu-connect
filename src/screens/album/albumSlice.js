import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import serviceRequest from '../../app/serviceRequest';
import albumApi from '../../network/api/albumApi';
import Utils from '../../utils';

export const getAlbumByID = createAsyncThunk(
  'album/getAlbumByID',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: albumApi.requestGetAlbumByID,
      payload: data,
    });
  },
);
export const addNewAlbum = createAsyncThunk(
  'album/addNewAlbum',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: albumApi.requestAddNewAlbum,
      payload: data,
    });
  },
);
const album = createSlice({
  name: 'album',
  initialState: {},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAlbumByID.fulfilled, (state, action) => {
      const {success} = Utils.getValues(action, 'payload', false);
      if (success) {
        const {data} = Utils.getValues(action, 'payload', []);
        state.lstAlbum = data;
      }
    });
  },
});

const {reducer} = album;
export default reducer;
