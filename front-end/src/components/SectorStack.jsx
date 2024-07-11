import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from '@mui/material/Stack';

export default function SectorStack({ sector }) {
  const [painData, setPainData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/setores/${sector}`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const data = await response.json();
        setPainData(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setLoading(false); // Marca o carregamento como completo mesmo em caso de erro
      }
    };

    fetchData();
  }, [sector]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  if (!painData || !painData["nível 0"]) {
    return <div>Dados não encontrados ou formato inválido.</div>;
  }

  const bodyPartNames = painData["nível 0"].map((item) => Object.keys(item)[0]);

  return (
    <Stack direction="column" spacing={1} sx={{ width: '100%', height: '100%' }}>
        <BarChart
      tooltip={{ trigger: "item" }}
      axisHighlight={{
        x: "line",
        y: "band",
      }}
      layout="horizontal"
      yAxis={[
        {
          scaleType: "band",
          data: bodyPartNames, // Usando os nomes das partes do corpo como dados do eixo Y
        },
      ]}
      series={[
        {
          data: painData["nível 0"].map((item) => item[Object.keys(item)[0]]),
          stack: "A",
          label: "Nível 0",
          highlighted: { additionalRadius: 10 }, // Adiciona um brilho adicional ao passar o mouse
        },
        {
          data: painData["nível 1"].map((item) => item[Object.keys(item)[0]]),
          stack: "A",
          label: "Nível 1",
        },
        {
          data: painData["nível 2"].map((item) => item[Object.keys(item)[0]]),
          stack: "A",
          label: "Nível 2",
        },
        {
          data: painData["nível 3"].map((item) => item[Object.keys(item)[0]]),
          stack: "A",
          label: "Nível 3",
        },
        {
          data: painData["nível 4"].map((item) => item[Object.keys(item)[0]]),
          stack: "A",
          label: "Nível 4",
        },
        {
          data: painData["nível 5"].map((item) => item[Object.keys(item)[0]]),
          stack: "A",
          label: "Nível 5",
        },
      ]}
      sx={{ height: '80%' }}
      colors={[
        "#000080",
        "#1E90FF",
        "#00FF7F",
        "#EDC949",
        "#E15759",
        "#8B4513",
      ]}
      margin={{ right: 100, left: 150, top: 0, bottom: 25 }}
      slotProps={{
        legend: {
          direction: "column",
          position: { vertical: "middle", horizontal: "right" },
          padding: 0,
        },
        xAxis: {
          tickLabelProps: { fontSize: 12, fontFamily: "Roboto" },
        },
        yAxis: {
          tickLabelProps: { fontSize: 12, fontFamily: "Roboto" },
          orientation: "left",
          margin: { left: 100 },
        },
        bar: {
          barStyle: { borderRadius: 5 },
        },
      }}
    />
    </Stack>
    
  );
}