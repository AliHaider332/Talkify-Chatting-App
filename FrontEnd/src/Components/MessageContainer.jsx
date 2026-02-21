import React, { useRef, useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import Messages from './Messages';
import { IoIosSend } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { userSelection } from '../Store/Slices/user.slice';
import { sendMessageThunk } from '../Store/Slices/message.thunk';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const MessageContainer = () => {
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { messages } = useSelector((state) => state.messageReducer);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function onBack() {
    dispatcher(userSelection(null));
  }

  function handleClick() {
    if (!message.trim()) return;

    dispatcher(
      sendMessageThunk({
        receiver: selectedUser._id,
        message: message,
      })
    );
    setMessage('');
  }
  function handleClickForInfo() {
    navigate(`/${selectedUser._id}`);
  }

  // If no user selected
  if (!selectedUser) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-screen flex items-center justify-center bg-gradient-to-br from-base-200 to-base-100"
      >
        <div className="text-center space-y-4 px-4">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-base-content">
            No Conversation Selected
          </h2>
          <p className="text-base-content/60">
            Choose a friend to start chatting
          </p>
        </div>
      </motion.div>
    );
  }

  // Chat UI
  return (
    <div className="h-screen flex flex-col bg-base-100">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-base-200/80 border-b border-base-300">
        <button onClick={onBack} className="btn btn-ghost btn-sm md:hidden">
          <IoArrowBack size={20} />
        </button>

        <div className="avatar avatar-online">
          <div className="w-10 rounded-full cursor-pointer">
            <img
              src={selectedUser.avatar}
              alt="user"
              onClick={handleClickForInfo}
            />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold">
            {selectedUser.firstName} {selectedUser.lastName}
          </h3>
          <p className="text-xs text-base-content/60">
            @{selectedUser.username}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length > 0 ? (
          messages.map((mess) => <Messages key={mess._id} info={mess} />)
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-base-content/50">No messages yet</p>
            <p className="text-xs text-base-content/40 mt-1">Say hello! 👋</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-base-200/80 border-t border-base-300">
        <div className="flex items-center gap-2 bg-base-100 rounded-full px-4 py-1 shadow-sm focus-within:ring-2 focus-within:ring-primary/30 transition-all">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none py-2.5 px-2 text-sm placeholder:text-base-content/40"
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
          />

          <button
            onClick={handleClick}
            disabled={!message.trim()}
            className={`
              rounded-full p-2.5 transition-all duration-200
              ${
                message.trim()
                  ? 'bg-primary text-white hover:bg-primary/90 hover:scale-105 shadow-md'
                  : 'bg-base-300 text-base-content/30 cursor-not-allowed'
              }
            `}
          >
            <IoIosSend size={18} />
          </button>
        </div>

        {message.trim() && (
          <p className="text-[10px] text-base-content/40 mt-1.5 px-3">
            Press Enter to send
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageContainer;
