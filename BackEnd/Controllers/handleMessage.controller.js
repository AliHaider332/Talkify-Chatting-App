import { Conversation } from '../Models/ConversationDB.Setup.js';
import { Message } from '../Models/MessageDB.Setup.js';
import ErrorHandler from '../Utils/errorHandler.utils.js';
import { asyncHandler } from '../Utils/asyncHandler.utils.js';
import mongoose from 'mongoose';
import { getSocketId, io } from '../Utils/socket.io.js';
export const handleSendMessage = asyncHandler(async (req, res) => {
  const sender = req.user;
  const receiver = req.params.receiver;
  const { message } = req.body;
  if (!sender || !receiver || !message) {
    throw new ErrorHandler('All Field are require, Message not generate', 400);
  }
  const senderID = new mongoose.Types.ObjectId(sender);
  const receiverID = new mongoose.Types.ObjectId(receiver);
  const newMessage = await Message.create({
    messageContent: message,
    sender: senderID,
    receiver: receiverID,
  });
  let chatHistory = await Conversation.findOne({
    participants: { $all: [senderID, receiverID] },
  });
  if (!chatHistory) {
    chatHistory = await Conversation({
      participants: [sender, receiver],
      messages: [],
    });
  }
  if (!chatHistory) {
    chatHistory.messages = [];
  }
  chatHistory.messages.push(newMessage._id);
  await chatHistory.save();
  const receiverSocketId = getSocketId(receiver);
  io.to(receiverSocketId).emit('message', newMessage);

  res.status(200).json({
    message: 'Message generated successfully',
    responseData: newMessage,
  });
});

export const handleGetMessages = asyncHandler(async (req, res) => {
  const sender = req.user; // assuming req.user contains user object
  const { receiver } = req.params;

  if (!sender || !receiver) {
    throw new ErrorHandler('All fields are required', 400);
  }

  if (sender.toString() === receiver.toString()) {
    return res.status(200).json({
      message: 'Message get successfully',
      responseData: { messages: [] },
    });
  }

  const senderID = new mongoose.Types.ObjectId(sender);
  const receiverID = new mongoose.Types.ObjectId(receiver);

  let chatHistory = await Conversation.findOne({
    participants: { $all: [senderID, receiverID] },
  }).populate('messages');

  res.status(200).json({
    message: 'Message get successfully',
    responseData: chatHistory?.messages || [],
  });
});
