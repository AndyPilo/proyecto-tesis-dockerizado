import app from "./app.js";
import adminInit from "./admin.js";
import { startWebSocketServer, io } from "./service/websocket.js";
import consumerRun from "./consumer.js";
import { connectDB } from "./db.js";
import { createServer } from "http"; // Importa el módulo HTTP

connectDB();
const PORT = process.env.PORT || 8080;

// Crear el servidor HTTP
const httpServer = createServer(app);

const init = async () => {
  //await adminInit()
  await startWebSocketServer(httpServer); // Pasar el servidor HTTP
  await consumerRun("app-sensor-data", ["sensor_data"], io); // Cambiar wss por io
  await consumerRun("app-alert", ["alert_data"], io); // Cambiar wss por io
};

// Cambiar de app.listen a httpServer.listen
httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  init();
});
