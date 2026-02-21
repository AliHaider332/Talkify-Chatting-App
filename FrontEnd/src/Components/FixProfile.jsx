import React from 'react';
import {
  CiUser,
  CiMail,
  CiCalendar,
  CiLocationOn,
  CiPhone,
  CiGlobe,
} from 'react-icons/ci';
import {
  IoMale,
  IoFemale,
  IoBriefcaseOutline,
  IoSchoolOutline,
  IoCodeSlashOutline,
} from 'react-icons/io5';

const FixProfile = ({ userProfile }) => {
  return (
    <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300/20 overflow-hidden">
      {/* Avatar Section */}
      <div className="relative h-32 bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="absolute -bottom-12 left-6">
          <div className="relative group">
            <div className="avatar">
              <div className="w-24 rounded-full ring-4 ring-base-100 shadow-xl">
                <img
                  src={userProfile.avatar || '/default-avatar.png'}
                  alt="profile"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-16 p-6">
        {/* Name and Username */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            {userProfile.firstName} {userProfile.lastName}
          </h2>
          <p className="text-base-content/60">@{userProfile.username}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailItem
            icon={CiMail}
            label="Email"
            value={userProfile.email}
            isLink={userProfile.email?.includes('@')}
          />

          <DetailItem
            icon={CiPhone}
            label="Phone"
            value={userProfile.phone}
          />

          <DetailItem
            icon={userProfile.gender === 'male' ? IoMale : IoFemale}
            label="Gender"
            value={userProfile.gender}
          />

          <DetailItem
            icon={CiCalendar}
            label="Date of Birth"
            value={userProfile.dateOfBirth}
          />

          <DetailItem
            icon={IoBriefcaseOutline}
            label="Profession"
            value={userProfile.profession}
          />

          <DetailItem
            icon={IoCodeSlashOutline}
            label="Skills"
            value={userProfile.skills}
          />

          <DetailItem
            icon={CiGlobe}
            label="Website"
            value={userProfile.website}
            isLink={userProfile.website}
          />

          <DetailItem
            icon={CiLocationOn}
            label="Address"
            value={userProfile.address}
          />

          <DetailItem
            icon={IoSchoolOutline}
            label="Education"
            value={userProfile.education}
          />

          {/* Bio - Full Width */}
          <div className="md:col-span-2">
            <DetailItem
              icon={CiUser}
              label="Bio"
              value={userProfile.bio}
            />
          </div>

          {/* Member Since - Read Only */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <CiCalendar className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-base-content/60">Member Since</p>
                <p className="font-medium">
                  {new Date(userProfile.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Display Detail Item Component
const DetailItem = ({ icon: Icon, label, value, isLink }) => {
  const displayValue = value || 'Not specified';

  return (
    <div className="flex items-start gap-3 p-3 bg-base-200/50 rounded-lg hover:bg-base-200 transition-colors">
      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-base-content/60">{label}</p>
        {isLink && value ? (
          <a
            href={value.startsWith('http') ? value : `https://${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline block truncate"
          >
            {value}
          </a>
        ) : (
          <p className="font-medium truncate">{displayValue}</p>
        )}
      </div>
    </div>
  );
};

export default FixProfile;