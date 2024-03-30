import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import serviceRequest from '../../app/serviceRequest';
import contactApi from '../../network/api/contactApi';
import Utils from '../../utils';
import {getUserInfoById} from '../profile/profileSlice';
const initialState = {
  contactList: [],
};
export const getContactList = createAsyncThunk(
  'profile/myContacts',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: contactApi.requestGetContact,
      payload: data,
    });
  },
);
export const getContactOfUser = createAsyncThunk(
  'profile/getContactOfUserById',
  async (data, thunkAPI) => {
    return serviceRequest({
      dispatch: thunkAPI.dispatch,
      serviceMethod: contactApi.requestGetContactUser,
      payload: data,
    });
  },
);

export const addContact = createAsyncThunk(
  'profile/addContact',
  async (data, thunkAPI) => {
    const {dispatch} = thunkAPI;
    try {
      const response = await contactApi.requestAddContact(data);

      if (response.success) {
        dispatch(getUserInfoById(data.user_in_contact)).then(result => {
          const {success, data} = Utils.getValues(result, 'payload', false);
          if (success) {
            dispatch(handleAddContact(data));
          }
        });
        return response;
      }
    } catch (error) {
      console.log('something error in addContact', error);
    }
  },
);
export const addUserToContactList = result => {
  return async (dispatch, getState) => {
    try {
      dispatch(handleAddContact(result));
    } catch (error) {
      console.log('something error in addUserToContactList', error);
    }
  };
};

const contact = createSlice({
  name: 'contact',
  initialState: initialState,
  reducers: {
    handleAddContact: (state, action) => {
      state.contactList.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(getContactList.fulfilled, (state, action) => {
      const {success, data} = Utils.getValues(action, 'payload', false);
      if (success) {
      }
    });
  },
});

const {reducer} = contact;
export const {handleAddContact} = contact.actions;
export default reducer;
