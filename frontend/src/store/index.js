import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// configure store with auth reducer
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
