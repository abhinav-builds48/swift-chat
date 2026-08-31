const ws = require("ws");
const jwt = require("jsonwebtoken");
const Message = require("./models/messageModel");
const { User } = require("./models/userModel");

const createWebSocketServer = (server) => {
  const wss = new ws.WebSocketServer({ server });

  wss.on("connection", (connection, req) => {
    const notifyAboutOnlinePeople = async () => {
      const onlineUsers = await Promise.all(
        Array.from(wss.clients).map(async (client) => {
          const { userId, username } = client;

          const user = await User.findById(userId);
          const avatarLink = user ? user.avatarLink : null;

          return {
            userId,
            username,
            avatarLink,
          };
        })
      );

      console.log("Online Users:", onlineUsers);

      [...wss.clients].forEach((client) => {
        client.send(
          JSON.stringify({
            online: onlineUsers,
          })
        );
      });
    };

    connection.isAlive = true;

    connection.timer = setInterval(() => {
      connection.ping();

      connection.deathTimer = setTimeout(() => {
        connection.isAlive = false;

        clearInterval(connection.timer);

        connection.terminate();

        notifyAboutOnlinePeople();

        console.log("dead");
      }, 1000);
    }, 5000);

    connection.on("pong", () => {
      clearTimeout(connection.deathTimer);
    });

    const cookies = req.headers.cookie;

    if (cookies) {
      const tokenString = cookies
        .split(";")
        .find((str) => str.trim().startsWith("authToken="));

      if (tokenString) {
        const token = tokenString.trim().split("=")[1];

        jwt.verify(
          token,
          process.env.JWTPRIVATEKEY,
          {},
          (err, userData) => {
            if (err) {
              console.log("JWT verification error:", err);
              return;
            }

            const { _id, firstName, lastName } = userData;

            connection.userId = _id;
            connection.username = `${firstName} ${lastName}`;
          }
        );
      }
    }

    connection.on("message", async (message) => {
      try {
        const messageData = JSON.parse(message.toString());

        const { recipient, text } = messageData;

        if (!recipient || !text) {
          return;
        }

        const msgDoc = await Message.create({
          sender: connection.userId,
          recipient,
          text,
        });

        [...wss.clients].forEach((client) => {
          if (client.userId === recipient) {
            client.send(
              JSON.stringify({
                sender: connection.userId,
                text,
                _id: msgDoc._id,
              })
            );
          }
        });
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    });

    connection.on("close", () => {
      clearInterval(connection.timer);
      clearTimeout(connection.deathTimer);

      notifyAboutOnlinePeople();
    });

    notifyAboutOnlinePeople();
  });
};

module.exports = createWebSocketServer;