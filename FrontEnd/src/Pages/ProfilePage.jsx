import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { updateUserThunk } from '../Store/Slices/user.thunk';
import EditableProfile from '../Components/EditableProfile';
import FixProfile from '../Components/FixProfile';
import { FaRegEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { DotSpinner } from 'ldrs/react';
import 'ldrs/react/DotSpinner.css';
const ProfilePage = () => {
  const { userProfile } = useSelector((state) => state.userReducer || {});
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle save - sends data to thunk
  const handleSave = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    dispatch(updateUserThunk(formData));
    navigate('/');
    setIsEditing(false);
  };

  // Handle avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setAvatarPreview(null);
    setAvatarFile(null);
    setIsEditing(false);
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          {/* <div className="loading loading-spinner loading-lg text-primary"></div> */}
          <DotSpinner size="28" speed="0.9" color="white" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header with Actions */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Profile
          </h1>
          <div className="flex gap-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary btn-sm gap-2 px-3 py-1"
              >
                <FaRegEdit />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Conditional Rendering of Profile Components */}
        {isEditing ? (
          <EditableProfile
            userProfile={userProfile}
            avatarPreview={avatarPreview}
            onAvatarChange={handleAvatarChange}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <FixProfile userProfile={userProfile} />
        )}
      </motion.div>
    </div>
  );
};

export default ProfilePage;
