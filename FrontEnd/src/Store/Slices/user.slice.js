import { createSlice } from '@reduxjs/toolkit';
import {
  getAllUserThunk,
  getClickUserInfoThunk,
  getUserInfoThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserThunk,
} from './user.thunk';

const initialState = {
  userProfile: null,
  otherUsers: null,
  isAuthenticated: false,
  buttonLoading: false,
  screenLoading: true,
  allUsers: [],
  selectedUser: null,
  clickUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userSelection: (state, actions) => {
      state.selectedUser = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserThunk.pending, (state, actions) => {
      state.buttonLoading = true;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, actions) => {
      state.buttonLoading = false;
      state.screenLoading = false;
      state.userProfile = actions.payload.responseData;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUserThunk.rejected, (state, actions) => {
      state.buttonLoading = false;
      state.screenLoading = false;
    });

    builder.addCase(loginUserThunk.pending, (state, actions) => {
      state.buttonLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, actions) => {
      state.buttonLoading = false;
      state.screenLoading = false;
      state.userProfile = actions.payload.responseData;
      state.isAuthenticated = true;
    });

    builder.addCase(loginUserThunk.rejected, (state, actions) => {
      state.buttonLoading = false;
      state.screenLoading = false;
    });
    builder.addCase(getUserInfoThunk.pending, (state, actions) => {
      state.buttonLoading = true;
    });
    builder.addCase(getUserInfoThunk.fulfilled, (state, actions) => {
      state.buttonLoading = false;
      state.screenLoading = false;
      state.userProfile = actions.payload.responseData;
      state.isAuthenticated = true;
    });

    builder.addCase(getUserInfoThunk.rejected, (state, actions) => {
      state.buttonLoading = false;
      state.screenLoading = false;
    });
    //Get all users
    builder.addCase(getAllUserThunk.pending, (state, actions) => {
      state.buttonLoading = true;
    });
    builder.addCase(getAllUserThunk.fulfilled, (state, actions) => {
      state.buttonLoading = false;
      state.screenLoading = false;
      state.allUsers = actions.payload;
    });
    builder.addCase(getAllUserThunk.rejected, (state, actions) => {
      state.buttonLoading = false;
      state.screenLoading = false;
    });
    //logout
    builder.addCase(logoutUserThunk.pending, (state, actions) => {
      state.buttonLoading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, actions) => {
      state.buttonLoading = false;
      state.screenLoading = false;
      // state.allUsers = actions.payload;
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUserThunk.rejected, (state, actions) => {
      state.buttonLoading = false;
      state.screenLoading = false;
    });
    //updateUser
    builder.addCase(updateUserThunk.pending, (state, actions) => {
      state.buttonLoading = true;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, actions) => {
      state.buttonLoading = false;
      state.screenLoading = false;
      state.userProfile = actions.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(updateUserThunk.rejected, (state, actions) => {
      state.buttonLoading = false;
      state.screenLoading = false;
    });
    //Click User
    builder.addCase(getClickUserInfoThunk.pending, (state, actions) => {
      state.buttonLoading = true;
    });
    builder.addCase(getClickUserInfoThunk.fulfilled, (state, actions) => {
      state.buttonLoading = false;
      state.screenLoading = false;
      state.clickUser = actions.payload;
    });
    builder.addCase(getClickUserInfoThunk.rejected, (state, actions) => {
      state.buttonLoading = false;
      state.screenLoading = false;
    });
  },
});

export const { userSelection } = userSlice.actions;
export default userSlice.reducer;
