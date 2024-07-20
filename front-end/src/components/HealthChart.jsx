import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";

const GraficoSaude = ({ sector }) => {
  const [healthData, setHealthData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/saude/${sector}`
        );
        if (!response.data) {
          throw new Error("Dados não encontrados ou formato inválido.");
        }
        console.log(response.data);
        setHealthData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(
          `Erro na requisição de saúde para o setor ${sector}:`,
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

  if (!healthData || Object.keys(healthData).length === 0) {
    return <div>Dados não encontrados ou formato inválido.</div>;
  }

  const health_columns = [
    "9. Você pratica alguma atividade física regularmente (mínimo 3 vezes por semana)?",
    "10. Você possuí algum problema de saúde? Liste abaixo:",
    "11. Tem alguma deficiência, se sim qual(ais)",
  ];

  const abreviated_columns = [
    "Atividade física regular",
    "Problemas de saúde",
    "Deficiência",
  ];

  const chartData = health_columns.map((column) => {
    const questionData = healthData[column] || {};
    return {
      name: column,
      Visual: questionData["Visual"] || 0,
      Nenhuma: questionData["Nenhuma"] || 0,
      Auditiva: questionData["Auditiva"] || 0,
      Sim: questionData["Sim"] || 0,
      Não: questionData["Não"] || 0,
      diabetes: questionData["diabetes"] || 0,
      asma: questionData["asma"] || 0,
      nenhum: questionData["nenhum"] || 0,
      hipertensão: questionData["hipertensão"] || 0,
      Médio: questionData["Médio"] || 0,
    };
  });

  const seriesData = [
    { name: "Visual", data: chartData.map((item) => item.Visual) },
    { name: "Nenhuma", data: chartData.map((item) => item.Nenhuma) },
    { name: "Auditiva", data: chartData.map((item) => item.Auditiva) },
    { name: "Sim", data: chartData.map((item) => item.Sim) },
    { name: "Não", data: chartData.map((item) => item.Não) },
    { name: "diabetes", data: chartData.map((item) => item.diabetes) },
    { name: "asma", data: chartData.map((item) => item.asma) },
    { name: "nenhum", data: chartData.map((item) => item.nenhum) },
    { name: "hipertensão", data: chartData.map((item) => item.hipertensão) },
    { name: "Médio", data: chartData.map((item) => item.Médio) },
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

export default GraficoSaude;
