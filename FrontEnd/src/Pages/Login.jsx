import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router';
import { CiUser, CiLock } from 'react-icons/ci';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '../Store/Slices/user.thunk';
import BoarderAnimation from '../Components/BoarderAnimation';
import '../App.css'; // Your CSS file where animations are defined
import { DotSpinner } from 'ldrs/react';
import 'ldrs/react/DotSpinner.css';

const userSchema = z.object({
  identity: z.string().min(1, 'Email or username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const Login = () => {
  const { isAuthenticated, buttonLoading } = useSelector(
    (state) => state.userReducer
  );

  const dispatcher = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigation('/');
    }
  }, [isAuthenticated, navigation]);

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
      await dispatcher(loginUserThunk(data)).unwrap();
      navigation('/');
    } catch (error) {
      console.error('Failed to Login:', error);
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
                Welcome Back
              </h2>
              <p className="text-base-content/60 text-sm mt-2">
                Please enter your details to sign in
              </p>
            </div>

            <form onSubmit={handleSubmit(handleData)} className="space-y-5">
              {/* Username/Email Field */}
              <div className="form-control w-full">
                <label className="text-sm font-medium mb-1 text-base-content/70">
                  Email or Username
                </label>
                <div
                  className={`
                    relative group
                    ${errors.identity ? 'input-error' : ''}
                  `}
                >
                  <label
                    className={`
                      input input-bordered flex items-center gap-3 
                      transition-all duration-200
                      hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10
                      focus-within:!border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20
                      ${errors.identity ? 'border-error' : ''}
                      p-3 w-full bg-slate-800/20 backdrop-blur-sm
                    `}
                  >
                    <CiUser className="text-xl opacity-50 group-focus-within:opacity-100 group-focus-within:text-cyan-500 transition-all" />
                    <input
                      type="text"
                      className="grow bg-transparent outline-none border-none focus:outline-none text-sm sm:text-base placeholder:text-base-content/40 px-1 py-4"
                      placeholder="johndoe@example.com"
                      {...register('identity')}
                      aria-invalid={errors.identity ? 'true' : 'false'}
                      disabled={buttonLoading}
                    />
                  </label>
                  {/* Animated gradient underline */}
                  <div className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                </div>
                {errors.identity && (
                  <p className="text-error text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                    <span className="text-lg">•</span>
                    {errors.identity.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="form-control w-full">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-base-content/70">
                    Password
                  </label>

                </div>
                <div
                  className={`
                    relative group
                    ${errors.password ? 'input-error' : ''}
                  `}
                >
                  <label
                    className={`
                      input input-bordered flex items-center gap-3 
                      transition-all duration-200 p-3
                      hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10
                      focus-within:!border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20
                      ${errors.password ? 'border-error' : ''}
                      p-3 w-full bg-slate-800/20 backdrop-blur-sm
                    `}
                  >
                    <CiLock className="text-xl opacity-50 group-focus-within:opacity-100 group-focus-within:text-cyan-500 transition-all" />
                    <input
                      type={showPasswordStatus ? 'text' : 'password'}
                      className="grow bg-transparent outline-none border-none focus:outline-none text-sm sm:text-base placeholder:text-base-content/40"
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
                  {/* Animated gradient underline */}
                  <div className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                </div>
                {errors.password && (
                  <p className="text-error text-xs sm:text-sm mt-1.5 flex items-center gap-1">
                    <span className="text-lg">•</span>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button with gradient and loading state */}
              <button
                type="submit"
                disabled={buttonLoading}
                className={`
                  btn w-full mt-4 text-sm sm:text-base 
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
                    <span>Log In</span>
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
              Don't have an account?{' '}
              <Link
                to={'/signup'}
                className="relative inline-block font-semibold text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 group"
              >
                Sign Up
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </p>
          </div>
        </div>
      </BoarderAnimation>
    </div>
  );
};

export default Login;