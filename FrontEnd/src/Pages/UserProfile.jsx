import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClickUserInfoThunk } from '../Store/Slices/user.thunk';
import {
  FiMail,
  FiPhone,
  FiGlobe,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiBookOpen,
  FiCpu,
  FiClock,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from 'react-icons/fi';
import { FaGenderless, FaMars, FaVenus } from 'react-icons/fa';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { clickUser } = useSelector((state) => state.userReducer);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getClickUserInfoThunk(id));
  }, [dispatch, id]);

  // Loading state with dark theme spinner
  if (!clickUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Helper function to format value
  const formatValue = (value) => {
    if (value === null || value === undefined) return 'Not provided';
    if (typeof value === 'string' && value.trim() === '') return 'Not provided';
    return value;
  };

  // Get gender icon
  const getGenderIcon = (gender) => {
    switch (gender?.toLowerCase()) {
      case 'male':
        return <FaMars className="text-blue-400" />;
      case 'female':
        return <FaVenus className="text-pink-400" />;
      default:
        return <FaGenderless className="text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header - Dark Theme */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden mb-8 border border-gray-700/50">
          <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 h-48 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          </div>

          <div className="relative px-4 sm:px-6 pb-8">
            {/* Avatar */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-center sm:justify-start">
              <div className="relative -mt-20 sm:-mt-24 mb-4 sm:mb-0 sm:mr-6 flex justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <img
                    src={`${clickUser.avatar}`}
                    alt={`${clickUser.firstName} ${clickUser.lastName}`}
                    className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-gray-800 shadow-2xl object-cover"
                  />
                </div>
              </div>

              {/* User Info */}
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {clickUser.firstName} {clickUser.lastName}
                </h1>
                <p className="text-gray-400 text-lg mb-3">
                  @{clickUser.username}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="inline-flex items-center px-4 py-2 bg-gray-700/50 backdrop-blur-sm text-gray-200 rounded-full text-sm font-medium border border-gray-600">
                    {getGenderIcon(clickUser.gender)}
                    <span className="ml-2 capitalize">{clickUser.gender}</span>
                  </span>

                  {clickUser.profession && (
                    <span className="inline-flex items-center px-4 py-2 bg-blue-600/20 text-blue-300 rounded-full text-sm font-medium border border-blue-600/30">
                      <FiBriefcase className="mr-2" />
                      {clickUser.profession}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            {clickUser.bio && (
              <div className="mt-6 p-4 bg-gray-700/30 rounded-xl border border-gray-700">
                <p className="text-gray-300 italic leading-relaxed">
                  "{clickUser.bio}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Contact Information */}
          <InfoCard
            title="Contact"
            icon={<FiMail className="text-blue-400" />}
            gradient="from-blue-500/10 to-blue-600/5"
          >
            <InfoRow
              icon={<FiMail className="text-gray-400" />}
              label="Email"
              value={clickUser.email}
              isLink={`mailto:${clickUser.email}`}
            />
            <InfoRow
              icon={<FiPhone className="text-gray-400" />}
              label="Phone"
              value={formatValue(clickUser.phone)}
            />
            <InfoRow
              icon={<FiGlobe className="text-gray-400" />}
              label="Website"
              value={formatValue(clickUser.website)}
              isLink={clickUser?.website}
            />
            <InfoRow
              icon={<FiMapPin className="text-gray-400" />}
              label="Address"
              value={formatValue(clickUser.address)}
            />
          </InfoCard>

          {/* Personal Information */}
          <InfoCard
            title="Personal"
            icon={<FiUser className="text-purple-400" />}
            gradient="from-purple-500/10 to-purple-600/5"
          >
            <InfoRow
              icon={<FiCalendar className="text-gray-400" />}
              label="Date of Birth"
              value={formatDate(clickUser.dateOfBirth)}
            />
            <InfoRow
              icon={getGenderIcon(clickUser.gender)}
              label="Gender"
              value={clickUser.gender}
              capitalize
            />
          </InfoCard>

          {/* Professional Information */}
          <InfoCard
            title="Professional"
            icon={<FiBriefcase className="text-green-400" />}
            gradient="from-green-500/10 to-green-600/5"
          >
            <InfoRow
              icon={<FiBriefcase className="text-gray-400" />}
              label="Profession"
              value={formatValue(clickUser.profession)}
            />
            <InfoRow
              icon={<FiBookOpen className="text-gray-400" />}
              label="Education"
              value={formatValue(clickUser.education)}
            />
            <InfoRow
              icon={<FiCpu className="text-gray-400" />}
              label="Skills"
              value={formatValue(clickUser.skills)}
            />
          </InfoCard>

          {/* Account Information */}
          <InfoCard
            title="Account"
            icon={<FiClock className="text-orange-400" />}
            gradient="from-orange-500/10 to-orange-600/5"
          >
            <InfoRow
              icon={<FiCalendar className="text-gray-400" />}
              label="Member since"
              value={formatDate(clickUser.createdAt)}
            />
            <InfoRow
              icon={<FiClock className="text-gray-400" />}
              label="Last updated"
              value={formatDate(clickUser.updatedAt)}
            />
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

// Info Card Component
const InfoCard = ({ title, icon, children, gradient }) => (
  <div
    className={`group bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:shadow-${
      gradient?.split(' ')[1]
    }/20`}
  >
    <div
      className={`bg-gradient-to-r ${gradient} px-6 py-4 border-b border-gray-700/50`}
    >
      <div className="flex items-center space-x-2">
        <span className="text-xl">{icon}</span>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
    </div>
    <div className="p-6 space-y-4">{children}</div>
  </div>
);

// Info Row Component
const InfoRow = ({ icon, label, value, isLink, capitalize }) => {
  const content = (
    <div className="flex items-start space-x-3 group/item">
      <span className="text-gray-500 mt-1 flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        {isLink && value !== 'Not provided' ? (
          <a
            href={isLink === true ? value : isLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 hover:underline break-all text-sm sm:text-base transition-colors inline-block"
          >
            {value}
          </a>
        ) : (
          <p
            className={`text-gray-200 break-words text-sm sm:text-base ${
              capitalize ? 'capitalize' : ''
            }`}
          >
            {value}
          </p>
        )}
      </div>
    </div>
  );

  return content;
};

export default UserProfile;
