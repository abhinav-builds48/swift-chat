import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import ChatHome from "./pages/ChatHome";
import Profile from "./components/Profile";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/authContext";
import { ProfileProvider } from "./context/profileContext";

import axios from "axios";
import { baseUrl } from "../apiConfig";

const Layout = () => {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "users/:id/verify/:token",
        element: <VerifyEmail />,
      },
      {
        path: "chathome",
        element: <ChatHome />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.withCredentials = true;

  return (
    <AuthProvider>
      <ProfileProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;