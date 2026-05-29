import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const socket = io(BASE_URL, {
  transports: ["websocket", "polling"],
});

export default socket;