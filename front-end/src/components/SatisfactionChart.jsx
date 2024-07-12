import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";

const GraficoSatisfacao = ({ sector }) => {
  const [satisfactionData, setSatisfactionData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/satisfacao/${sector}`
        );
        if (!response.data) {
          throw new Error("Dados não encontrados ou formato inválido.");
        }
        setSatisfactionData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(`Erro na requisição de satisfação para o setor ${sector}:`, error);
        setLoading(false);
      }
    };

    if (sector) {
      fetchData();
    }
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

  if (!satisfactionData || Object.keys(satisfactionData).length === 0) {
    return <div>Dados não encontrados ou formato inválido.</div>;
  }

  const chartData = [];

  Object.entries(satisfactionData).forEach(([question, counts]) => {
    const seriesData = { name: question };
    for (let i = 1; i <= 7; i++) {
      seriesData[`data${i}`] = counts[i] || 0;
    }
    chartData.push(seriesData);
  });

  const satisfaction_columns = [
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Em muitos campos a minha vida está próxima do meu ideal.]",
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [As minhas condições de vida são excelentes]",
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Estou satisfeito com a minha vida]",
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Até o presente momento tenho alcançado as coisas importantes que quero para a minha vida]",
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Se pudesse viver a minha vida de novo não mudaria quase nada]"
  ];

  const bodyPartNames = satisfaction_columns.map((column) => {
    const matches = column.match(/\[(.*?)\]/);
    return matches ? matches[1] : ''; 
  });

  const legendItems = satisfaction_columns.map((column, index) => ({
    label: column,
    color: chartData[index] ? chartData[index].color : undefined, // Associar cores se necessário
  }));

  return (
    <Stack direction="column" spacing={1} sx={{ width: "100%", height: "100%" }}>
      <BarChart
        tooltip={{ trigger: "item" }}
        axisHighlight={{ x: "line", y: "band" }}
        layout="horizontal"
        yAxis={[{ scaleType: "band", data: bodyPartNames }]}
        series={chartData.map((series) => ({
          data: [
            series.data1,
            series.data2,
            series.data3,
            series.data4,
            series.data5,
            series.data6,
            series.data7,
          ],
          name: series.name,
        }))}
        sx={{ height: "80%" }}
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
        legendItems={legendItems}
      />
    </Stack>
  );
};

export default GraficoSatisfacao;
