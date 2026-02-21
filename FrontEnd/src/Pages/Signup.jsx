import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router';
import { CiUser, CiLock, CiMail } from 'react-icons/ci';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserThunk } from '../Store/Slices/user.thunk';
import BoarderAnimation from '../Components/BoarderAnimation';
import '../App.css'; // Import the same CSS file with animations
import { DotSpinner } from 'ldrs/react';
import 'ldrs/react/DotSpinner.css';

const userSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    gender: z.enum(['male', 'female'], {
      required_error: 'Please select a gender',
    }),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm: z.string().min(8, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

const Signup = () => {
  const { buttonLoading } = useSelector((state) => state.userReducer);
  const dispatcher = useDispatch();
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    mode: 'onBlur',
  });

  const [showPasswordStatus, setPasswordStatus] = useState(false);

  const handleData = async (data) => {
    try {
      await dispatcher(registerUserThunk(data)).unwrap();
      navigation('/login');
    } catch (error) {
      console.error('Failed to register:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordStatus(!showPasswordStatus);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-200 to-secondary/5 flex items-center justify-center p-4">
      {/* Animated Border Container */}
      <BoarderAnimation>
        {/* Inner Card */}
        <div className="card bg-base-100 shadow-2xl rounded-2xl overflow-hidden">
          <div className="card-body p-6 sm:p-8">
            {/* Header with decorative element */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <CiUser className="text-3xl text-cyan-500" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="text-base-content/60 text-sm mt-2">
                Join us today! Fill in your details below
              </p>
            </div>

            <form onSubmit={handleSubmit(handleData)} className="space-y-4">
              {/* First Name & Last Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="form-control w-full">
                  <label className="text-sm font-medium mb-1 text-base-content/70">
                    First Name
                  </label>
                  <div className="relative group">
                    <label
                      className={`
                      input input-bordered flex items-center gap-3 
                      transition-all duration-200
                      hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10
                      focus-within:!border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20
                      ${errors.firstName ? 'border-error' : ''}
                      p-3 w-full bg-slate-800/20 backdrop-blur-sm
                    `}
                    >
                      <CiUser className="text-xl opacity-50 group-focus-within:opacity-100 group-focus-within:text-cyan-500 transition-all flex-shrink-0" />
                      <input
                        type="text"
                        className="grow bg-transparent outline-none border-none focus:outline-none text-sm sm:text-base placeholder:text-base-content/40 px-1 py-4"
                        placeholder="John"
                        {...register('firstName')}
                        aria-invalid={errors.firstName ? 'true' : 'false'}
                        disabled={buttonLoading}
                      />
                    </label>
                    <div className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                  </div>
                  {errors.firstName && (
                    <p className="text-error text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                      <span className="text-lg">•</span>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="form-control w-full">
                  <label className="text-sm font-medium mb-1 text-base-content/70">
                    Last Name
                  </label>
                  <div className="relative group">
                    <label
                      className={`
                      input input-bordered flex items-center gap-3 
                      transition-all duration-200
                      hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10
                      focus-within:!border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20
                      ${errors.lastName ? 'border-error' : ''}
                      p-3 w-full bg-slate-800/20 backdrop-blur-sm
                    `}
                    >
                      <CiUser className="text-xl opacity-50 group-focus-within:opacity-100 group-focus-within:text-cyan-500 transition-all flex-shrink-0" />
                      <input
                        type="text"
                        className="grow bg-transparent outline-none border-none focus:outline-none text-sm sm:text-base placeholder:text-base-content/40 px-1 py-4"
                        placeholder="Doe"
                        {...register('lastName')}
                        aria-invalid={errors.lastName ? 'true' : 'false'}
                        disabled={buttonLoading}
                      />
                    </label>
                    <div className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                  </div>
                  {errors.lastName && (
                    <p className="text-error text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                      <span className="text-lg">•</span>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="form-control w-full">
                <label className="text-sm font-medium mb-1 text-base-content/70">
                  Email Address
                </label>
                <div className="relative group">
                  <label
                    className={`
                    input input-bordered flex items-center gap-3 
                    transition-all duration-200
                    hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10
                    focus-within:!border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20
                    ${errors.email ? 'border-error' : ''}
                    p-3 w-full bg-slate-800/20 backdrop-blur-sm
                  `}
                  >
                    <CiMail className="text-xl opacity-50 group-focus-within:opacity-100 group-focus-within:text-cyan-500 transition-all flex-shrink-0" />
                    <input
                      type="email"
                      className="grow bg-transparent outline-none border-none focus:outline-none text-sm sm:text-base placeholder:text-base-content/40 px-1 py-4"
                      placeholder="john.doe@example.com"
                      {...register('email')}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      disabled={buttonLoading}
                    />
                  </label>
                  <div className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                </div>
                {errors.email && (
                  <p className="text-error text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                    <span className="text-lg">•</span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Username */}
              <div className="form-control w-full">
                <label className="text-sm font-medium mb-1 text-base-content/70">
                  Username
                </label>
                <div className="relative group">
                  <label
                    className={`
                    input input-bordered flex items-center gap-3 
                    transition-all duration-200
                    hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10
                    focus-within:!border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20
                    ${errors.username ? 'border-error' : ''}
                    p-3 w-full bg-slate-800/20 backdrop-blur-sm
                  `}
                  >
                    <CiUser className="text-xl opacity-50 group-focus-within:opacity-100 group-focus-within:text-cyan-500 transition-all flex-shrink-0" />
                    <input
                      type="text"
                      className="grow bg-transparent outline-none border-none focus:outline-none text-sm sm:text-base placeholder:text-base-content/40 px-1 py-4"
                      placeholder="johndoe123"
                      {...register('username')}
                      aria-invalid={errors.username ? 'true' : 'false'}
                      disabled={buttonLoading}
                    />
                  </label>
                  <div className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                </div>
                {errors.username && (
                  <p className="text-error text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                    <span className="text-lg">•</span>
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div className="form-control w-full">
                <label className="text-sm font-medium mb-1 text-base-content/70">
                  Gender
                </label>
                <div className="relative">
                  <div className="flex gap-6 bg-slate-800/20 backdrop-blur-sm p-4 rounded-xl border border-base-300/20 hover:border-cyan-500/50 transition-all duration-200">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        value="male"
                        {...register('gender')}
                        className="radio radio-sm border-2 border-base-300/50 checked:bg-gradient-to-r checked:from-cyan-500 checked:to-blue-500 checked:border-transparent transition-all group-hover:border-cyan-500/50"
                        disabled={buttonLoading}
                      />
                      <span className="text-base-content/70 group-hover:text-cyan-500 transition-colors">
                        Male
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        value="female"
                        {...register('gender')}
                        className="radio radio-sm border-2 border-base-300/50 checked:bg-gradient-to-r checked:from-cyan-500 checked:to-blue-500 checked:border-transparent transition-all group-hover:border-cyan-500/50"
                        disabled={buttonLoading}
                      />
                      <span className="text-base-content/70 group-hover:text-cyan-500 transition-colors">
                        Female
                      </span>
                    </label>
                  </div>
                </div>
                {errors.gender && (
                  <p className="text-error text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                    <span className="text-lg">•</span>
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="form-control w-full">
                <label className="text-sm font-medium mb-1 text-base-content/70">
                  Password
                </label>
                <div className="relative group">
                  <label
                    className={`
                    input input-bordered flex items-center gap-3 
                    transition-all duration-200
                    hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10
                    focus-within:!border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20
                    ${errors.password ? 'border-error' : ''}
                    p-3 w-full bg-slate-800/20 backdrop-blur-sm
                  `}
                  >
                    <CiLock className="text-xl opacity-50 group-focus-within:opacity-100 group-focus-within:text-cyan-500 transition-all flex-shrink-0" />
                    <input
                      type={showPasswordStatus ? 'text' : 'password'}
                      className="grow bg-transparent outline-none border-none focus:outline-none text-sm sm:text-base placeholder:text-base-content/40 px-1 py-4"
                      placeholder="••••••••"
                      {...register('password')}
                      aria-invalid={errors.password ? 'true' : 'false'}
                      disabled={buttonLoading}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="btn btn-ghost btn-circle btn-sm transition-all hover:scale-110 active:scale-95 hover:bg-cyan-500/10"
                      tabIndex="-1"
                      aria-label={
                        showPasswordStatus ? 'Hide password' : 'Show password'
                      }
                      disabled={buttonLoading}
                    >
                      {showPasswordStatus ? (
                        <IoEyeOffOutline className="text-lg opacity-70 hover:opacity-100 transition-opacity" />
                      ) : (
                        <IoEyeOutline className="text-lg opacity-70 hover:opacity-100 transition-opacity" />
                      )}
                    </button>
                  </label>
                  <div className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                </div>
                {errors.password && (
                  <p className="text-error text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                    <span className="text-lg">•</span>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-control w-full">
                <label className="text-sm font-medium mb-1 text-base-content/70">
                  Confirm Password
                </label>
                <div className="relative group">
                  <label
                    className={`
                    input input-bordered flex items-center gap-3 
                    transition-all duration-200
                    hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10
                    focus-within:!border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20
                    ${errors.confirm ? 'border-error' : ''}
                    p-3 w-full bg-slate-800/20 backdrop-blur-sm
                  `}
                  >
                    <CiLock className="text-xl opacity-50 group-focus-within:opacity-100 group-focus-within:text-cyan-500 transition-all flex-shrink-0" />
                    <input
                      type={showPasswordStatus ? 'text' : 'password'}
                      className="grow bg-transparent outline-none border-none focus:outline-none text-sm sm:text-base placeholder:text-base-content/40 px-1 py-4"
                      placeholder="••••••••"
                      {...register('confirm')}
                      aria-invalid={errors.confirm ? 'true' : 'false'}
                      disabled={buttonLoading}
                    />
                  </label>
                  <div className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                </div>
                {errors.confirm && (
                  <p className="text-error text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                    <span className="text-lg">•</span>
                    {errors.confirm.message}
                  </p>
                )}
              </div>

              {/* Submit Button with gradient and loading state */}
              <button
                type="submit"
                disabled={buttonLoading}
                className={`
                  btn w-full mt-6 text-sm sm:text-base 
                  relative overflow-hidden transition-all duration-300
                  hover:scale-[1.02] active:scale-[0.98]
                  disabled:scale-100 disabled:opacity-70 disabled:cursor-not-allowed
                  shadow-lg hover:shadow-xl hover:shadow-cyan-500/25
                  bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600
                  border-none text-white
                  min-h-[48px]
                `}
              >
                {/* Shine effect - only show when not loading */}
                {!buttonLoading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
                )}

                {buttonLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <DotSpinner size="28" speed="0.9" color="white" />
                   
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>Create Account</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                )}
              </button>
            </form>

            {/* Footer with gradient link */}
            <p className="text-center text-xs sm:text-sm mt-6 text-base-content/60">
              Already have an account?{' '}
              <Link
                to={'/login'}
                className="relative inline-block font-semibold text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 group"
              >
                Log In
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </p>
          </div>
        </div>
      </BoarderAnimation>
    </div>
  );
};

export default Signup;
