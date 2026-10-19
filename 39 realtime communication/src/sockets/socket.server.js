import { Server } from "socket.io";

function initializeSocket(httpServer) {
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("a user connected: ", socket.id);

    socket.on("disconnect", (socket) => {
      console.log("a user disconnected: ", socket.id);
    });
  });
}

export default initializeSocket;

/**
 * io = whole server
 * socket = single user
 * emit = event fire krna
 * on = event listen krna
 */
