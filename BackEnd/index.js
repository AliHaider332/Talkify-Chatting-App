import express from 'express';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import ConnectMongoDB from './Utils/mongoDb.connection.js';
import router from './Routes/userRoutes.js';
import { errorMiddleware } from './Middlewares/error.middleware.js';
import messageRoutes from './Routes/messageRouters.js';
import { app, httpServer } from './Utils/socket.io.js';
import multer from 'multer';
import { upload } from './Utils/multerSetup.js';

ConnectMongoDB();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // <- must be added
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(router);
app.use(messageRoutes);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

app.use(errorMiddleware);

httpServer.listen(PORT, () => {
  console.log(`Hi I am Running on Port ${PORT}`);
});
