import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import serviceRequest from '../../app/serviceRequest';
import chatApi from '../../network/api/chatApi';
import Utils from '../../utils';

export const getAllMessenger = createAsyncThunk(
  'chat/getAllMessenger',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: chatApi.requestGetAllMessage,
      payload: data,
    });
  },
);
export const getAllChatroom = createAsyncThunk(
  'chat/getAllChatroom',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: chatApi.requestGetChatroom,
      payload: data,
    });
  },
);
export const getMessageInChatRoom = createAsyncThunk(
  'chat/getMessageInChatRoom',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: chatApi.requestGetMessageByChatroomId,
      payload: data,
    });
  },
);
export const createChatRoom = createAsyncThunk(
  'chat/createChatRoom',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: chatApi.requestCreateChatroom,
      payload: data,
    });
  },
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: chatApi.requestSendMessage,
      payload: data,
    });
  },
);

export const updateLastMessage = createAsyncThunk(
  'chat/updateLastMessage',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: chatApi.requestUpdateLastMessage,
      payload: data,
    });
  },
);
const chat = createSlice({
  name: 'chat',
  initialState: {},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllMessenger.fulfilled, (state, action) => {
      const {success} = Utils.getValues(action, 'payload', false);
      if (success) {
        const {collection} = Utils.getValues(action, 'payload.data', []);
        state.lstMessenger = collection;
      }
    });
    builder.addCase(getAllChatroom.fulfilled, (state, action) => {
      const {success} = Utils.getValues(action, 'payload', false);
      if (success) {
        const {collection} = Utils.getValues(action, 'payload.data', []);
        state.allChatroom = collection;
      }
    });
  },
});

const {reducer} = chat;
export default reducer;
