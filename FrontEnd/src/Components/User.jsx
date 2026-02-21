import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelection } from '../Store/Slices/user.slice';
import { getAllMessageThunk } from '../Store/Slices/message.thunk';
import { useNavigate } from 'react-router';

const User = ({ user }) => {
  const dispatch = useDispatch();
  const { onlineUser = [] } = useSelector((state) => state.socketReducer);
  const { selectedUser } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  function handleUserSelection(data) {
    dispatch(userSelection(data));
    dispatch(getAllMessageThunk(data._id));
  }

  const isOnline = onlineUser.includes(user._id);
  const isSelected = selectedUser?._id === user._id;
  function handleClick() {
    navigate(`/${user._id}`);
  }

  return (
    <div
      className={`
        flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors
        ${isSelected ? 'bg-base-300' : 'hover:bg-base-300/50'}
      `}
      onClick={() => handleUserSelection(user)}
    >
      {/* Avatar */}
      <div className={isOnline ? 'avatar avatar-online' : 'avatar'}>
        <div className="w-12 rounded-full">
          <img
            src={user.avatar || '/default-avatar.png'}
            alt="avatar"
            onClick={handleClick}
          />
        </div>
      </div>

      {/* User Info */}
      <div>
        <p className="font-medium">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-sm text-gray-400 text-base-content/60">
          @{user.username}
        </p>
      </div>
    </div>
  );
};

export default User;
