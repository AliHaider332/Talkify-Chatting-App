import express from 'express';
import { checkUserAuthentication } from '../Middlewares/user.authenticated.js';
import {
  handleSendMessage,
  handleGetMessages,
} from '../Controllers/handleMessage.controller.js';
const messageRoutes = express.Router();

messageRoutes.post(
  '/add-message/:receiver',
  checkUserAuthentication,
  handleSendMessage
);
messageRoutes.get(
  '/get-conversation/:receiver',
  checkUserAuthentication,
  handleGetMessages
);

export default messageRoutes;
