// ChatHome.jsx

import React, { useEffect, useState } from "react";
import { useProfile } from "../context/profileContext";
import axios from "axios";

import ChatMessages from "../components/Chat/ChatMessages";
import MessageInputForm from "../components/Chat/MessageInputForm";
import Nav from "../components/Chat/Nav";
import OnlineUsersList from "../components/Chat/OnlineUserList";
import TopBar from "../components/Chat/TopBar";

import { baseUrl, socketUrl } from "../../apiConfig";

import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const ChatHome = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { userDetails } = useProfile();

  const {
    isAuthenticated,
    checkAuth,
    loading,
  } = useAuth();

  const navigate = useNavigate();

  // -----------------------------
  // WebSocket connection
  // -----------------------------
  useEffect(() => {
    if (!userDetails) return;

    const socket = new WebSocket(socketUrl);

    socket.addEventListener("open", () => {
      console.log("WebSocket connected:", socketUrl);
    });

    socket.addEventListener("message", handleMessage);

    socket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    socket.addEventListener("close", () => {
      console.log("WebSocket disconnected");
    });

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [userDetails]);

  // -----------------------------
  // Authentication
  // -----------------------------
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      console.log("User not authenticated. Redirecting...");
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  // -----------------------------
  // Fetch offline users
  // -----------------------------
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/api/user/people`,
          {
            withCredentials: true,
          }
        );

        const people = res.data || [];

        const offlinePeopleArr = people
          .filter((p) => p._id !== userDetails?._id)
          .filter((p) => !onlinePeople[p._id]);

        const offlinePeopleWithAvatar = offlinePeopleArr.map((p) => ({
          ...p,
          avatarLink: p.avatarLink,
        }));

        const offlinePeopleObject =
          offlinePeopleWithAvatar.reduce((acc, p) => {
            acc[p._id] = p;
            return acc;
          }, {});

        setOfflinePeople(offlinePeopleObject);
      } catch (error) {
        console.error(
          "Error fetching people:",
          error.response?.data || error.message
        );
      }
    };

    if (userDetails && isAuthenticated) {
      fetchPeople();
    }
  }, [userDetails, onlinePeople, isAuthenticated]);

  // -----------------------------
  // Fetch messages
  // -----------------------------
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUserId) return;

      try {
        const res = await axios.get(
          `${baseUrl}/api/user/messages/${selectedUserId}`,
          {
            withCredentials: true,
          }
        );

        setMessages(res.data);
      } catch (error) {
        console.error(
          "Error fetching messages:",
          error.response?.data || error.message
        );
      }
    };

    fetchMessages();
  }, [selectedUserId]);

  // -----------------------------
  // Handle WebSocket messages
  // -----------------------------
  const handleMessage = (ev) => {
    try {
      const messageData = JSON.parse(ev.data);

      if ("online" in messageData) {
        showOnlinePeople(messageData.online);
      }

      if ("text" in messageData) {
        if (messageData.sender === selectedUserId) {
          setMessages((prev) => [
            ...prev,
            messageData,
          ]);
        }
      }
    } catch (error) {
      console.error(
        "Error processing WebSocket message:",
        error
      );
    }
  };

  // -----------------------------
  // Show online people
  // -----------------------------
  const showOnlinePeople = (peopleArray) => {
    const people = {};

    peopleArray.forEach(
      ({ userId, username, avatarLink }) => {
        if (userId !== userDetails?._id) {
          people[userId] = {
            username,
            avatarLink,
          };
        }
      }
    );

    setOnlinePeople(people);
  };

  // -----------------------------
  // Send message
  // -----------------------------
  const sendMessage = (ev) => {
    if (ev) {
      ev.preventDefault();
    }

    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected.");
      return;
    }

    if (!newMessage.trim() || !selectedUserId) {
      return;
    }

    console.log("Sending message...");
    console.log("Message:", newMessage);
    console.log("Recipient:", selectedUserId);

    ws.send(
      JSON.stringify({
        text: newMessage,
        recipient: selectedUserId,
      })
    );

    setMessages((prev) => [
      ...prev,
      {
        text: newMessage,
        sender: userDetails?._id,
        recipient: selectedUserId,
        _id: Date.now(),
      },
    ]);

    setNewMessage("");
  };

  // -----------------------------
  // Loading screen
  // -----------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-white">
        Checking authentication...
      </div>
    );
  }

  // -----------------------------
  // Don't render chat if not authenticated
  // -----------------------------
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">

      <Nav />

      <OnlineUsersList
        onlinePeople={onlinePeople}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        offlinePeople={offlinePeople}
      />

      <section className="w-[71%] lg:w-[62%] relative pb-10">

        {selectedUserId && (
          <TopBar
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            offlinePeople={offlinePeople}
            onlinePeople={onlinePeople}
          />
        )}

        <ChatMessages
          messages={messages}
          userDetails={userDetails}
          selectedUserId={selectedUserId}
        />

        <div className="absolute w-full bottom-0 flex justify-center items-center">

          <MessageInputForm
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            selectedUserId={selectedUserId}
          />

        </div>

      </section>

    </div>
  );
};

export default ChatHome;