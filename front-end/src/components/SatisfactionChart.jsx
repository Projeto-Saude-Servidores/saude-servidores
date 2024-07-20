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
        console.error(
          `Erro na requisição de satisfação para o setor ${sector}:`,
          error
        );
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

  const satisfaction_columns = [
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Em muitos campos a minha vida está próxima do meu ideal.]",
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [As minhas condições de vida são excelentes]",
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Estou satisfeito com a minha vida]",
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Até o presente momento tenho alcançado as coisas importantes que quero para a minha vida]",
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Se pudesse viver a minha vida de novo não mudaria quase nada]",
  ];

  const abreviated_columns = [
    "Vida próxima do ideal",
    "Condições de vida",
    "Satisfação com a vida",
    "Alcançado objetivos",
    "Mudaria algo na minha vida",
  ];

  const chartData = satisfaction_columns.map((column) => {
    const questionData = satisfactionData[column] || {};
    return {
      name: column,
      data1: questionData[1] || 0,
      data2: questionData[2] || 0,
      data3: questionData[3] || 0,
      data4: questionData[4] || 0,
      data5: questionData[5] || 0,
      data6: questionData[6] || 0,
      data7: questionData[7] || 0,
    };
  });

  const seriesData = [
    { name: "1", data: chartData.map((item) => item.data1) },
    { name: "2", data: chartData.map((item) => item.data2) },
    { name: "3", data: chartData.map((item) => item.data3) },
    { name: "4", data: chartData.map((item) => item.data4) },
    { name: "5", data: chartData.map((item) => item.data5) },
    { name: "6", data: chartData.map((item) => item.data6) },
    { name: "7", data: chartData.map((item) => item.data7) },
  ];

  return (
    <div className="h-[400px]">
      <Stack
        direction="column"
        spacing={1}
        sx={{ width: "100%", height: "100%" }}
      >
        <BarChart
          tooltip={{ trigger: "item" }}
          axisHighlight={{ x: "line", y: "band" }}
          layout="horizontal"
          yAxis={[{ scaleType: "band", data: abreviated_columns }]}
          series={seriesData.map((serie) => ({
            name: serie.name,
            data: serie.data,
            stack: "A",
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
        />
      </Stack>
    </div>
  );
};

export default GraficoSatisfacao;
