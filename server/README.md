# Swift Chat

Swift Chat is a full-stack real-time chat application built using React, Node.js, Express, MongoDB, and WebSockets.

## Features

- User registration
- User login
- JWT authentication
- Email verification
- Secure password hashing
- Real-time messaging
- Online and offline user status
- Search users
- User profile management
- Avatar selection
- MongoDB database
- Gmail SMTP email service
- Responsive user interface
- Production build using Vite

## Tech Stack

### Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- WebSocket (ws)
- JSON Web Token (JWT)
- Nodemailer
- bcrypt

## Project Structure

```text
chatapp/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── db/
│   ├── sendEmail.js
│   ├── wsServer.js
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md