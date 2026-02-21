import express from 'express';
import {

  handleGetAllUserInfo,
  handleGetClickUserInfo,
  handleGetUserInfo,
  handleLogin,
  handleLogout,
  handleRegister,
  handleUpdateProfile,
} from '../Controllers/handleUser.Controller.js';
import {
  validateLoginInfo,
  validateRegisterInfo,
} from '../Middlewares/info.validation.js';
import { checkUserAuthentication } from '../Middlewares/user.authenticated.js';
import { upload } from '../Utils/multerSetup.js';

const router = express.Router();
router.post('/register', validateRegisterInfo, handleRegister);
router.post('/login', validateLoginInfo, handleLogin);
router.get('/logout', checkUserAuthentication, handleLogout);
router.get('/get-user-info', checkUserAuthentication, handleGetUserInfo);
router.get('/get-all-user', checkUserAuthentication, handleGetAllUserInfo);
router.post(
  '/update-user',
  checkUserAuthentication,
  upload.single('avatar'),
  handleUpdateProfile
);
router.get('/click-user/:id', checkUserAuthentication, handleGetClickUserInfo);
export default router;
