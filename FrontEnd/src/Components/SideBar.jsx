import React, { useState } from 'react';
import User from './User';
import { CiSearch, CiSettings, CiLogout } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserThunk } from '../Store/Slices/user.thunk';
import { Link } from "react-router-dom";
const SideBar = () => {
  const dispatcher = useDispatch();
  const { allUsers, userProfile } = useSelector((state) => state.userReducer);
  const [searchQuery, setSearchQuery] = useState('');

  function handleLogout() {
    dispatcher(logoutUserThunk());
  }

  // Filter users based on search
  const filteredUsers = allUsers?.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-screen bg-base-200 flex flex-col border-r border-base-300">
      {/* Header */}
      <div className="px-4 py-4">
        <h1 className="text-2xl font-bold text-primary">Talkify</h1>
      </div>

      {/* Search */}
      <div className="px-3 mb-3">
        <div className="relative">
          <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-base-content/50" />
          <input
            type="search"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-3 bg-base-100 border border-base-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((user) => <User key={user._id} user={user} />)
        ) : (
          <div className="text-center py-8 text-base-content/50">
            <p>No users found</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3.5 border border-base-300 bg-base-100 rounded-2xl">
        <div className="dropdown dropdown-top w-full">
          <label
            tabIndex={0}
            className="btn btn-ghost w-full flex items-center gap-3 justify-start hover:bg-base-200"
          >
            <div className="avatar avatar-online">
              <div className="w-10 rounded-full">
                <img
                  src={userProfile?.avatar || '/default-avatar.png'}
                  alt="profile"
                />
              </div>
            </div>

            <div className="flex-1 text-left">
              <p className="text-sm font-semibold">{userProfile?.firstName}</p>
              <p className="text-xs text-base-content/60">
                @{userProfile?.username}
              </p>
            </div>
          </label>

          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 mb-2 z-10"
          >
            <li>
              <Link  to="/profile">
                <span className="flex items-center gap-2">
                  <CiSettings className="text-lg" />
                  Settings
                </span>
              </Link>
            </li>
            <li>
              <span
                className="flex items-center gap-2 text-error hover:bg-error/10"
                onClick={handleLogout}
              >
                <CiLogout className="text-lg" />
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
