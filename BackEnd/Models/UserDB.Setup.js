import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    // Optional fields (initially null)
    phone: {
      type: String,
      default: null,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    profession: {
      type: String,
      default: null,
    },
    skills: {
      type: [String], // array of skills
      default: null,
    },
    website: {
      type: String,
      default: null,
    },

    address: {
      type: String,
      default: null,
    },
    education: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
