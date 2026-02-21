import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../Utils/axios.setup';
import { toast } from 'react-toastify';

export const registerUserThunk = createAsyncThunk(
  'user/registerUserThunk',
  async (
    { firstName, lastName, username, gender, email, password },
    { rejectWithValue }
  ) => {
    try {
      const user = await axiosInstance.post('/register', {
        firstName,
        lastName,
        username,
        gender,
        email,
        password,
      });
      toast.success(user.data.message);
      return user.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/loginUserThunk',
  async ({ identity, password }, { rejectWithValue }) => {
    try {
      const user = await axiosInstance.post(
        '/login',
        { identity, password },
        {
          withCredentials: true,
        }
      );
      toast.success(user.data.message);
      return user.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const getUserInfoThunk = createAsyncThunk(
  'user/getUserInfoThunk',
  async (_, { rejectWithValue }) => {
    try {
      const user = await axiosInstance.get('/get-user-info');
      return user.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const getAllUserThunk = createAsyncThunk(
  'user/getAllUserThunk',
  async (_, { rejectWithValue }) => {
    try {
      const user = await axiosInstance.get('/get-all-user');
      return user?.data.responseData || [];
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = await axiosInstance.get('/logout');
      toast.success('Logout Successfully');
      return user.data;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'user/updateUserThunk',
  async (formData, { rejectWithValue }) => {
    // Remove the { data } destructuring
    try {
      const user = await axiosInstance.post('/update-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
        },
      });
      toast.success(user.data.message);

      return user.data?.responseData;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const getClickUserInfoThunk = createAsyncThunk(
  'user/getClickUserInfoThunk',
  async (id, { rejectWithValue }) => {
    // Remove the { data } destructuring
    try {
      const user = await axiosInstance.get(`/click-user/${id}`);
      return user.data?.responseData;
    } catch (error) {
      toast.error(error.response?.data.message);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);
