import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../screens/authentication/login/LoginSlice';
import loaderReducer from '../app/loaderSlice';
import homeReducer from '../screens/home/homeSlice';
import contactReducer from '../screens/contact/contactSlice';
import chargeReducer from '../screens/charge/chargeSlice';
import profileReducer from '../screens/profile/profileSlice';
import socialReducer from '../screens/social/SocialSlice';
import chatReducer from '../screens/chat/chatSlice';
import albumReducer from '../screens/album/albumSlice';
const rootReducer = {
  auth: authReducer,
  loader: loaderReducer,
  home: homeReducer,
  contact: contactReducer,
  charge: chargeReducer,
  profile: profileReducer,
  social: socialReducer,
  chat: chatReducer,
  album: albumReducer
};
export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
