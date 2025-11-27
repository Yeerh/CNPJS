import { Server } from "socket.io";

let io = null;

export function initSocketIO(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });
}

export function send(event, data) {
  if (!io) {
    console.error("Socket.IO ainda não foi inicializado!");
    return;
  }
  io.emit(event, data); // envia pra TODOS os clientes conectados
  console.log(`Evento emitido: ${event}`, data);
}