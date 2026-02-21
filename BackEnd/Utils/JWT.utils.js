import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
const secret = process.env.JWTSECRET 
export const setJWTToken = (id) => {
  return jwt.sign({ id }, secret, { expiresIn: '2d' });
};

export const decodeJWTToken = (token) => {
  return jwt.verify(token, secret);
};
