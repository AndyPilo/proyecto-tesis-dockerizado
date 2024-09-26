import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const UseWs = (url) => {
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState(null);
  const socketRef = useRef(null); // Referencia al socket.io

  const send = (data) => {
    if (socketRef?.current?.connected) {
      socketRef.current.emit("message", data); // Enviar un evento con socket.io
    } else {
      console.error("Socket.io no está listo");
    }
  };

  useEffect(() => {
    // Inicializar socket.io con la URL del servidor
    const socket = io(url, {
      withCredentials: true, // Si necesitas habilitar cookies o autenticación
    });

    socket.on("connect", () => {
      setIsReady(true);
    });

    socket.on("message", (message) => {
      setVal(message);
    });

    socket.on("error", (error) => {
      console.error("Error en socket.io:", error);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      setIsReady(false);
    };
  }, [url]);

  return [isReady, val, send];
};
