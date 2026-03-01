# 💬 Real-Time Chat Application

This is a **Real-Time Chat Application** built with a separate **frontend** and **backend** using socket-based communication.  
Users can chat with each other in real time.

⚠️ **Note:** This project is not deployed because most free hosting platforms do not support persistent socket connections (WebSockets).  
You must run this project locally.


---

## ✨ Features

- Real-time messaging using sockets
- Separate frontend and backend structure
- Environment variable support
- Clean and modular code

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- Socket.io-client

### Backend

- Node.js
- Express
- Socket.io
- dotenv

---

## ⚙️ Environment Variables Setup

You must manually create `.env` files in both frontend and backend folders.

---

### 📌 Backend Environment Variables (`backend/.env`)

PORT=3000
MONGODB
JWTSECRET
CLIENT_ROUTE
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

⚠️ For Vite projects, environment variables must start with `VITE_`.


### 1️⃣ Clone the repository

```bash
git clone <your-repository-link>
cd project-root
