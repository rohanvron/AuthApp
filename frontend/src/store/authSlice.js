import { createSlice } from '@reduxjs/toolkit';

// auth slice to manage authentication state
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// export actions and reducer

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;