import React from 'react';
import { useSelector } from 'react-redux';

const Messages = ({ info }) => {
  const { userProfile, selectedUser } = useSelector(
    (state) => state.userReducer
  );

  const isMe = info.sender === userProfile?._id;

  return (
    <div className={isMe ? 'chat chat-end' : 'chat chat-start'}>
      {/* Avatar */}
      <div className="chat-image avatar">
        <div className="w-7 rounded-full opacity-90">
          <img
            alt="avatar"
            src={isMe ? userProfile?.avatar : selectedUser?.avatar}
          />
        </div>
      </div>

      {/* Message Bubble */}
      <div
        className={`
          chat-bubble max-w-[70%] break-words whitespace-pre-wrap px-4 py-2
          ${isMe 
            ? 'bg-primary text-primary-content' 
            : 'bg-base-300 text-base-content'
          }
        `}
      >
        {info.messageContent}
      </div>

      {/* Time */}
      <div className="chat-footer text-[10px] opacity-40 mt-0.5">
        {new Date(info.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>
  );
};

export default Messages;