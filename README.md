# Swift Chat 💬

A real-time chat application built with React, Node.js, Express, MongoDB, and WebSocket.

Swift Chat allows users to register, log in, view other users, see online users, and exchange messages in real time.

## 🌐 Live Application

https://swift-chat-eta.vercel.app

## ✨ Features

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
```
## ⚙️ Setup

### 1. Make sure Node.js is installed

Check Node.js version:

```bash
node --version
```

Check npm version:

```bash
npm --version
```

Node.js 18+ is recommended.

### 2. Clone the repository

```bash
git clone https://github.com/abhinav-builds48/swift-chat.git
cd swift-chat
```

### 3. Setup the Backend

Go to the server directory:

```bash
cd server
```

Install backend dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` folder and add:

```env
DB=your_mongodb_connection_string
JWTPRIVATEKEY=your_jwt_private_key
SALT=10
PORT=4000
BASE_URL=http://localhost:5173

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=true
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

NODE_ENV=development
```

### 4. Start the Backend

```bash
npm start
```

Backend will run at:

```text
http://localhost:4000
```

### 5. Setup the Frontend

Open a new terminal and go to the frontend folder:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

### 6. Start the Frontend

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

### 7. Open the Application

Open the following link in your browser:

[Swift Chat](https://swift-chat-eta.vercel.app)

### 8. Production Deployment

The frontend is deployed on Vercel and the backend is deployed on Render.
