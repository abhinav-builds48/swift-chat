// apiConfig.js

let baseUrl;
let socketUrl;

if (import.meta.env.PROD) {
  baseUrl = "https://swift-chat-7wvz.onrender.com";
  socketUrl = "wss://swift-chat-7wvz.onrender.com";
} else {
  baseUrl = "http://localhost:4000";
  socketUrl = "ws://localhost:4000";
}

export { baseUrl, socketUrl };