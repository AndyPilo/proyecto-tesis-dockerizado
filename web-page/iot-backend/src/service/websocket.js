import { Server } from "socket.io";

let io;

const startWebSocketServer = async (httpServer) => {
  // Crear una instancia de socket.io usando el servidor HTTP
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000", // Asegúrate de que coincida con el origen de tu frontend
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Manejar la conexión de los clientes
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado a Socket.IO");

    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });

    socket.on("error", (error) => {
      console.error("Error en el socket", error);
    });
  });
};

export { startWebSocketServer, io };
