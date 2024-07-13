  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import CircularProgress from "@mui/material/CircularProgress";
  import Stack from "@mui/material/Stack";
  import { BarChart } from "@mui/x-charts/BarChart";

  const GraficoPostura = ({ sector }) => {
    const [postureData, setPostureData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/api/postura/${sector}`);
          if (!response.data) {
            throw new Error("Dados não encontrados ou formato inválido.");
          }
          console.log(response.data);
          setPostureData(response.data);
          setLoading(false);
        } catch (error) {
          console.error(`Erro na requisição de postura para o setor ${sector}:`, error);
          setLoading(false);
        }
      };

      if (sector) {
        fetchData();
      }
    }, [sector]);

    if (loading) {
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <CircularProgress />
        </div>
      );
    }

    if (!postureData || Object.keys(postureData).length === 0) {
      return <div>Dados não encontrados ou formato inválido.</div>;
    }

    const posture_columns = [
      "21. Quando sentado na sua cadeira, sua mesa de trabalho fica na altura do seu cotovelo?",
      "22. Ao trabalhar sentado na cadeira, você apoia seus pés no chão ou em algum suporte?",
      "23. Sua cadeira possui altura ajustável do assento?",
      "24. Com relação a cadeira, ela possui encosto com a forma levemente adaptada ao corpo para proteção da região lombar?",
      "25. A mesa de trabalho ou cadeira proporciona espaço ou suporte para apoiar os antebraços?",
      "26. Ao utilizar o computador durante o trabalho, você utiliza:",
      "27. Ao utilizar o computador durante o trabalho, você utiliza:",
      "28. A borda superior da tela do seu computador está na altura dos seus olhos?"
    ];

    const chartData = posture_columns.map(column => {
      const questionData = postureData[column] || {};
      return {
        name: column,
        Sim: questionData['Sim'] || 0,
        Nao: questionData['Não'] || 0,
        "Teclado integrado": questionData['Teclado integrado'] || 0,
        "Touchpad": questionData['Touchpad'] || 0,
        "Mouse": questionData['Mouse'] || 0,
        "Teclado externo": questionData['Teclado externo'] || 0,
      };
    });

    const seriesData = [
      {
        name: "Sim",
        data: chartData.map(item => item.Sim)
      },
      {
        name: "Não",
        data: chartData.map(item => item.Nao)
      },
      {
        name: "Teclado integrado",
        data: chartData.map(item => item["Teclado integrado"])
      },
      {
        name: "Touchpad",
        data: chartData.map(item => item["Touchpad"])
      },
      {
        name: "Mouse",
        data: chartData.map(item => item["Mouse"])
      },
      {
        name: "Teclado externo",
        data: chartData.map(item => item["Teclado externo"])
      }
    ];

    return (
      <Stack direction="column" spacing={1} sx={{ width: "100%", height: "100%" }}>
        <BarChart
          tooltip={{ trigger: "item" }}
          axisHighlight={{ x: "line", y: "band" }}
          layout="horizontal"
          yAxis={[{ scaleType: "band", data: posture_columns }]}
          series={seriesData.map(serie => ({
            name: serie.name,
            data: serie.data
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
    );
  };

  export default GraficoPostura;
