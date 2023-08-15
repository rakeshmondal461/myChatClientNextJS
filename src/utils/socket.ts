import io from "socket.io-client";

let socket: any;
interface serverMessageInterface {
  msg: string;
}

export const initSocket = (userId: string) => {
  socket = io("http://localhost:4001"); // Replace with your Socket.io server URL

  socket.on("connect", () => {
    console.log("Connected to Socket.io server");
    socket.emit("userConnected", { userId: userId });
  });

  socket.on("userOnline", (user: any) => {
    console.log(`${user} is online now`); // world
  });

  socket.emit("hello from client", "world");
};

export const sendMessage = (msg: String, user: String) => {
  socket.emit("messageFromClient", { msg, user });
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket.io connection not initialized");
  }

  return socket;
};
