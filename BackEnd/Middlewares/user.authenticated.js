import ErrorHandler from '../Utils/errorHandler.utils.js';
import { decodeJWTToken } from '../Utils/JWT.utils.js';

export const checkUserAuthentication = (req, res, next) => {
  try {
    const token =
      req.cookies.sid || req.headers['authenticated']?.replace('Bearer ', '');
    if (!token) {
      return next(new ErrorHandler('Unauthorized access', 401));
    }
    const decoded = decodeJWTToken(token);
    req.user = decoded.id;
    next();
  } catch (error) {
    next(new ErrorHandler('Unauthorized access', 401));
  }
};
