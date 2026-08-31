import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Nav = () => {
  const { logout, isAuthenticated } = useAuth();
  const [isMobile, setIsMobile] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <button
        onClick={() => setIsMobile(!isMobile)}
        className="flex fixed bottom-5 h-10 aspect-square lg:hidden justify-center items-center bg-dark left-5 z-50 ring-2 ring-gray-500 rounded-lg text-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {isMobile && (
        <header className="fixed h-screen w-[150px] z-40 lg:static lg:w-[9%] text-white bg-dark flex flex-col px-3 py-4">
          <Link
            to="/"
            className="flex gap-2 items-center justify-center border-b pb-2 mb-4 border-gray-600"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Swift Logo"
            />
            <span className="font-semibold text-xl mr-2">Swift</span>
          </Link>

          <nav className="h-full flex flex-col my-4 justify-between font-medium pl-2">
            <div className="flex flex-col gap-5">
              <Link to="/profile" className="flex items-end gap-1">
                <span>Profile</span>
              </Link>

              <Link to="/chathome" className="flex gap-1">
                <span>Chats</span>
              </Link>
            </div>

            <div className="flex items-end gap-1 mb-14">
              <button onClick={logout}>Logout</button>
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Nav;