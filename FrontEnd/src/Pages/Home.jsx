import React, { useEffect } from 'react';
import SideBar from '../Components/SideBar';
import MessageContainer from '../Components/MessageContainer';
import { useSelector, useDispatch } from 'react-redux';
import { setOnlineUsers } from '../Store/Slices/socket.slice';
import { addMessage } from '../Store/Slices/message.slice';

const Home = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socketReducer);
  const { selectedUser } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!socket) return;

    const handleOnlineUsers = (data) => {
      dispatch(setOnlineUsers(data));
    };

    const handleMessage = (data) => {
      dispatch(addMessage(data));
    };

    socket.on('onlineUser', handleOnlineUsers);
    socket.on('message', handleMessage);

    // cleanup
    return () => {
      socket.off('onlineUser', handleOnlineUsers);
      socket.off('message', handleMessage);
    };
  }, [socket, dispatch]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`w-[100vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] ${
          selectedUser ? 'hidden' : 'block'
        } md:block`}
      >
        <SideBar />
      </div>

      {/* Message Container */}
      <div className={`flex-1 ${selectedUser ? 'block' : 'hidden'} md:block`}>
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;