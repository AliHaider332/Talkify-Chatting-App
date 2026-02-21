import { User } from '../Models/UserDB.Setup.js';
import { asyncHandler } from '../Utils/asyncHandler.utils.js';
import ErrorHandler from '../Utils/errorHandler.utils.js';
import bcrypt from 'bcryptjs';
import { setJWTToken } from '../Utils/JWT.utils.js';
import mongoose from 'mongoose';
export const handleRegister = asyncHandler(async (req, res) => {
  const { firstName, lastName, gender, username, email, password } = req.user;

  const check = await User.findOne({ email });
  if (check) {
    throw new ErrorHandler('User already Exist', 400);
  }

  const avatar = gender == 'male' ? 'male.avif' : 'female.avif';
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstName,
    lastName,
    gender,
    avatar,
    username,
    email,
    password: hashedPassword,
  });

  const token = setJWTToken(newUser._id);
  res
    .status(200)
    .cookie('sid', token, {
      httpOnly: true,
      secure: true, // use true only in HTTPS (production)
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 day
    })
    .json({
      success: true,
      message: 'Successfully Registered',
      responseData: newUser,
    });
});

export const handleLogin = asyncHandler(async (req, res) => {
  const { identity, password } = req.user;
  const requiredUser = await User.findOne({
    $or: [{ email: identity }, { username: identity }],
  });
  if (!requiredUser) {
    throw new ErrorHandler('User email or username not match', 400);
  }
  const checkPassword = await bcrypt.compare(password, requiredUser.password);
  if (!checkPassword) {
    throw new ErrorHandler('Password mismatch', 400);
  }
  const token = setJWTToken(requiredUser._id);
  res
    .status(200)
    .cookie('sid', token, {
      httpOnly: true,
      secure: true, // use true only in HTTPS (production)
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 day
    })
    .json({
      success: true,
      message: 'Successfully Log In',
      responseData: requiredUser,
    });
});

export const handleLogout = (req, res) => {
  res.clearCookie('sid');
  res.status(200).json({ message: 'Logout Successfully', success: true });
};
export const handleGetUserInfo = asyncHandler(async (req, res) => {
  const id = req.user;
  const requireUser = await User.findById(id);
  if (!requireUser) {
    throw new ErrorHandler('Unauthorized access', 401);
  }
  res
    .status(200)
    .json({ responseData: requireUser, message: 'User Info', success: true });
});

export const handleGetAllUserInfo = asyncHandler(async (req, res) => {
  const id = req.user; // This comes from auth middleware
  const allUsers = await User.find({ _id: { $ne: id } });

  res.status(200).json({
    responseData: allUsers,
    message: 'User Info',
    success: true,
  });
});

export const handleUpdateProfile = asyncHandler(async (req, res) => {
  const userID = req.user; // userId from auth middleware

  const {
    firstName,
    lastName,
    gender,
    username,
    email,
    phone,
    dateOfBirth,
    bio,
    profession,
    skills,
    website,
    address,
    education,
  } = req.body;
  const avatar = req.file?.path;
  let updatedData = {};

  // add only fields that are provided
  if (firstName) updatedData.firstName = firstName;
  if (lastName) updatedData.lastName = lastName;
  if (gender) updatedData.gender = gender;
  if (username) updatedData.username = username;
  if (email) updatedData.email = email;
  if (phone) updatedData.phone = phone;
  if (dateOfBirth) updatedData.dateOfBirth = dateOfBirth;
  if (bio) updatedData.bio = bio;
  if (profession) updatedData.profession = profession;
  if (skills) updatedData.skills = skills;
  if (website) updatedData.website = website;
  if (address) updatedData.address = address;
  if (education) updatedData.education = education;

  // only update avatar if uploaded
  if (avatar) {
    updatedData.avatar = avatar;
  }
  console.log(updatedData);

  const userProfile = await User.findByIdAndUpdate(
    userID,
    { $set: updatedData },
    { new: true, runValidators: true }
  );

  if (!userProfile) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'User information updated successfully',
    responseData: userProfile,
  });
});

export const handleGetClickUserInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID format",
    });
  }

  // Find user by ID
  const user = await User.findById(id);

  // If user not found
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Success response
  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    responseData: user,
  });
});