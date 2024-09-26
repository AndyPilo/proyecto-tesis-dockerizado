import React, { useState, useEffect } from "react";
import Sidenav from "../components/Sidenav";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import TableAlert from "../components/TableAlert";
import { UseWs } from "../utils/UseWs"; // Suponiendo que tienes un hook de WebSocket

export default function Alert() {
  const [alertData, setAlertData] = useState([]);
  const [isWsReady, wsValue] = UseWs("ws://localhost:8081");

  useEffect(() => {
    if (isWsReady) {
      console.log("WebSocket connected for alerts");
    }

    if (wsValue) {
      const alert = JSON.parse(wsValue); // Asegúrate de que el formato de wsValue coincide con tus alertas
      setAlertData((prev) => [...prev, alert]); // Acumula las alertas en el estado
    }
  }, [isWsReady, wsValue]);

  return (
    <>
      <Navbar />
      <Box height={80} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <TableAlert alertData={alertData} />
        </Box>
      </Box>
    </>
  );
}
