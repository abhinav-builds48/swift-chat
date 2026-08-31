# Swift Chat 💬

A real-time chat application built with React, Node.js, Express, MongoDB, and WebSocket.

Swift Chat allows users to register, log in, view other users, see online users, and exchange messages in real time.

##  Live Application

Frontend: https://swift-chat-eta.vercel.app

Backend: https://swift-chat-7wvz.onrender.com

##  Features

- User registration and login
- Email verification
- Secure authentication using JWT
- Password hashing using bcrypt
- Real-time messaging using WebSocket
- Online users status
- Offline users list
- User profiles
- Avatar support
- Chat history
- MongoDB database
- Responsive chat interface
- CORS configuration for production
- REST API for user and message operations

## 🛠️ Technologies Used

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- React Hot Toast
- WebSocket

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- WebSocket
- JWT
- bcrypt
- Joi
- Nodemailer
- CORS
- Cookie Parser
- dotenv

## 📁 Project Structure

```text
swift-chat/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── apiConfig.js
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── db.js
│   ├── index.js
│   ├── wsServer.js
│   ├── package.json
│   └── .env
│
└── README.md

⚙️ Local Setup
1. Clone the repository
git clone https://github.com/abhinav-builds48/swift-chat.git
