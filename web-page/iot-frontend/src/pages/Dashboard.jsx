import React, { useState } from "react";
import Sidenav from "../components/Sidenav";
import Navbar from "../components/Navbar";
import Box from "@mui/material/Box";
import LineChart from "../components/LineChart";
import Grid from "@mui/material/Grid";
import { TextField, Button } from "@mui/material";

export default function Dashboard() {
  const [sensorId, setSensorId] = useState(""); // Estado para manejar el ID del sensor
  const [idFilter, setIdFilter] = useState(""); // Filtro que se aplicará al hacer clic en "Filtrar"

  // Función para manejar el filtrado al hacer clic en el botón
  const handleFilter = () => {
    setIdFilter(sensorId);
  };

  return (
    <>
      <Navbar />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Campo para filtrar por ID del sensor */}
          <Box display="flex" alignItems="center" mb={2} mt={3}>
            <TextField
              label="Filtrar por ID de Sensor"
              value={sensorId}
              onChange={(e) => setSensorId(e.target.value)}
              variant="outlined"
              size="small" // Cambia el tamaño a 'small' para reducir el alto del TextField
              sx={{ marginRight: "16px", height: "40px" }} // Espaciado entre el campo de texto y el botón
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleFilter}
              sx={{ height: "40px", padding: "8px 16px" }} // Usar flex para hacer que el ancho sea proporcional
            >
              Filtrar
            </Button>
          </Box>
          <Grid container spacing={2}>
            {/* Gráfico de temperatura */}
            <Grid item xs={12} md={4}>
              <LineChart
                dataKey="temperature"
                title="Temperatura"
                color="#FF5733"
                sensorId={idFilter} // Pasar el ID del sensor al gráfico
              />
            </Grid>
            {/* Gráfico de humedad */}
            <Grid item xs={12} md={4}>
              <LineChart
                dataKey="humidity"
                title="Humedad"
                color="#3498db"
                sensorId={idFilter} // Pasar el ID del sensor al gráfico
              />
            </Grid>
            {/* Gráfico de conductividad */}
            <Grid item xs={12} md={4}>
              <LineChart
                dataKey="conductivity"
                title="Conductividad"
                color="#d4ac0d"
                sensorId={idFilter} // Pasar el ID del sensor al gráfico
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
