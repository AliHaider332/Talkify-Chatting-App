import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { getAllUserThunk, getUserInfoThunk } from './Store/Slices/user.thunk';
import { Outlet } from 'react-router-dom';
import { socketConnection } from './Store/Slices/socket.slice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfoThunk());
  }, []);
  const { userProfile } = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (userProfile?._id) {
      dispatch(getAllUserThunk());
      dispatch(socketConnection(userProfile._id));
    }
  }, [userProfile]);

  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default App;
