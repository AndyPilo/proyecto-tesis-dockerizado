import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, TimeScale } from 'chart.js';
import { Box } from '@mui/material';
import { useData } from "../context/DataContext";

// Registramos los elementos que vamos a usar en Chart.js
Chart.register(LineElement, CategoryScale, LinearScale, PointElement, TimeScale);

export default function GenericLineChart({ dataKey, title, color, sensorId }) {
  const [wsData, setWsData] = useState([]);
  const { isWsReady, wsValue } = useData();

  useEffect(() => {
    if (isWsReady) {
      console.log(`${title} WebSocket (Socket.io) conectado`);
    }

    if (wsValue) {
      try {
        const parsedMessage = JSON.parse(wsValue);
        const receivedSensorId = parsedMessage.id;
        const parsedValue = parseFloat(parsedMessage[dataKey]);

        if (!isNaN(parsedValue) && (sensorId === "" || String(sensorId) === String(receivedSensorId))) {
          setWsData((prev) => {
            const newData = [...prev, { value: parsedValue, time: new Date() }];

            // Limitar a los últimos 50 valores
            if (newData.length > 50) {
              return newData.slice(-50);
            }
            return newData;
          });
        }
      } catch (error) {
        console.error('Error al parsear el mensaje Socket.io:', error);
      }
    }
  }, [isWsReady, wsValue, dataKey, sensorId]);

  const chartData = {
    labels: wsData.map((_, index) => index + 1),
    datasets: [
      {
        label: title,
        data: wsData.map((dataPoint) => dataPoint.value),
        borderColor: color,
        backgroundColor: color,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'linear', // Línea simple de tiempo
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  if (wsData.length === 0) {
    return <h4>No hay datos de {title} disponibles</h4>;
  }

  return (
    <Box>
      <h3>{title}</h3>
      <Line data={chartData} options={options} width={400} height={300} />
    </Box>
  );
}
