import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
  IoCameraOutline,
  IoBriefcaseOutline,
  IoSchoolOutline,
  IoCodeSlashOutline,
} from 'react-icons/io5';
import { MdSave } from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';

const EditableProfile = ({
  userProfile,
  avatarPreview,
  onAvatarChange,
  onSave,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: userProfile,
  });

  // Reset form when userProfile changes
  useEffect(() => {
    if (userProfile) {
      reset(userProfile);
    }
  }, [userProfile, reset]);

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300/20 overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Avatar Section */}
        <div className="relative h-32 bg-gradient-to-r from-primary/20 to-secondary/20">
          <div className="absolute -bottom-12 left-6">
            <div className="relative group">
              <div className="avatar">
                <div className="w-24 rounded-full ring-4 ring-base-100 shadow-xl">
                  <img
                    src={avatarPreview || userProfile?.avatar || '/default-avatar.png'}
                    alt="profile"
                  />
                </div>
              </div>

              <div className="absolute bottom-0 right-0">
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={onAvatarChange}
                />
                <label
                  htmlFor="avatar-upload"
                  className="bg-primary text-white p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer block"
                >
                  <IoCameraOutline size={14} />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 p-6">
          {/* Name and Username */}
          <div className="mb-6">
            <div className="space-y-3">
              <div className="flex gap-3 flex-wrap">
                <div className="flex-1 min-w-[120px]">
                  <input
                    {...register('firstName', {
                      required: 'First name is required',
                    })}
                    placeholder="First Name"
                    className="input input-bordered input-sm w-full"
                  />
                  {errors.firstName && (
                    <p className="text-error text-xs mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="flex-1 min-w-[120px]">
                  <input
                    {...register('lastName', {
                      required: 'Last name is required',
                    })}
                    placeholder="Last Name"
                    className="input input-bordered input-sm w-full"
                  />
                  {errors.lastName && (
                    <p className="text-error text-xs mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <input
                  {...register('username', {
                    required: 'Username is required',
                  })}
                  placeholder="Username"
                  className="input input-bordered input-sm w-full"
                />
                {errors.username && (
                  <p className="text-error text-xs mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <EditableDetailItem
              icon={CiMail}
              label="Email"
              name="email"
              register={register}
              errors={errors}
              type="email"
              placeholder="email@example.com"
            />

            {/* Phone */}
            <EditableDetailItem
              icon={CiPhone}
              label="Phone"
              name="phone"
              register={register}
              errors={errors}
              placeholder="+92 123 4567890"
            />

            {/* Gender */}
            <EditableDetailItem
              icon={userProfile?.gender === 'male' ? IoMale : IoFemale}
              label="Gender"
              name="gender"
              register={register}
              errors={errors}
              type="select"
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
            />

            {/* Date of Birth */}
            <EditableDetailItem
              icon={CiCalendar}
              label="Date of Birth"
              name="dateOfBirth"
              register={register}
              errors={errors}
              type="date"
            />

            {/* Profession */}
            <EditableDetailItem
              icon={IoBriefcaseOutline}
              label="Profession"
              name="profession"
              register={register}
              errors={errors}
              placeholder="Software Engineer"
            />

            {/* Skills */}
            <EditableDetailItem
              icon={IoCodeSlashOutline}
              label="Skills"
              name="skills"
              register={register}
              errors={errors}
              placeholder="React, Node.js, MongoDB"
            />

            {/* Website */}
            <EditableDetailItem
              icon={CiGlobe}
              label="Website"
              name="website"
              register={register}
              errors={errors}
              placeholder="https://example.com"
            />

            {/* Address */}
            <EditableDetailItem
              icon={CiLocationOn}
              label="Address"
              name="address"
              register={register}
              errors={errors}
              placeholder="City, Country"
            />

            {/* Education */}
            <EditableDetailItem
              icon={IoSchoolOutline}
              label="Education"
              name="education"
              register={register}
              errors={errors}
              placeholder="University, Degree"
            />

            {/* Bio - Full Width */}
            <div className="md:col-span-2">
              <EditableDetailItem
                icon={CiUser}
                label="Bio"
                name="bio"
                register={register}
                errors={errors}
                type="textarea"
                placeholder="Tell something about yourself..."
              />
            </div>

            {/* Member Since - Read Only */}
            {userProfile?.createdAt && (
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CiCalendar className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60">Member Since</p>
                    <p className="font-medium">
                      {new Date(userProfile.createdAt).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Actions - Add this section */}
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-base-300">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-error btn-sm gap-2 px-2 py-1"
            >
              <IoCloseOutline />
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success btn-sm gap-2 px-2 py-1"
              disabled={!isDirty && !avatarPreview}
            >
              <MdSave />
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// Reusable Editable Detail Item Component
const EditableDetailItem = ({
  icon: Icon,
  label,
  name,
  register,
  errors,
  type = 'text',
  options,
  placeholder,
}) => {
  return (
    <div className="flex items-start gap-3 p-3 bg-base-200/50 rounded-lg hover:bg-base-200 transition-colors">
      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-base-content/60">{label}</p>
        <div>
          {type === 'textarea' ? (
            <textarea
              {...register(name)}
              placeholder={placeholder}
              rows="2"
              className="w-full bg-base-100 border border-base-300 rounded-lg px-3 py-1.5 text-sm mt-1 focus:outline-none focus:border-primary"
            />
          ) : type === 'select' ? (
            <select
              {...register(name)}
              className="w-full bg-base-100 border border-base-300 rounded-lg px-3 py-1.5 text-sm mt-1 focus:outline-none focus:border-primary"
            >
              <option value="">Select {label}</option>
              {options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              {...register(name)}
              type={type}
              placeholder={placeholder}
              className="w-full bg-base-100 border border-base-300 rounded-lg px-3 py-1.5 text-sm mt-1 focus:outline-none focus:border-primary"
            />
          )}
          {errors[name] && (
            <p className="text-error text-xs mt-1">{errors[name].message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditableProfile;