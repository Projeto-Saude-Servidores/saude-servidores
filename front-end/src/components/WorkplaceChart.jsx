import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";

const GraficoAmbiente = ({ sector }) => {
  const [workplaceData, setWorkplaceData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/ambiente/${sector}`
        );
        if (!response.data) {
          throw new Error("Dados não encontrados ou formato inválido.");
        }
        console.log(response.data);
        setWorkplaceData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(
          `Erro na requisição de ambiente para o setor ${sector}:`,
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

  if (!workplaceData || Object.keys(workplaceData).length === 0) {
    return <div>Dados não encontrados ou formato inválido.</div>;
  }

  const workplace_columns = [
    "12. Como é o seu relacionamento com colegas do setor?",
    "13. Como é o seu relacionamento com a sua chefia?",
    "14. Você classifica o seu trabalho como monótono?",
    "15. Você se sente estressado durante o seu trabalho?",
    "16. O seu trabalho exige esforço mental?",
    "17. Você possui conhecimento em relação a ergonomia?",
    "18. Como você classifica o ruído no seu ambiente de trabalho?",
    "19. Como você classifica a temperatura no seu ambiente de trabalho?",
    "20. A iluminação incomoda na realização do seu trabalho?",
  ];

  const abreviated_columns = [
    "Relacionamento-colegas",
    "Relacionamento-chefe",
    "Trabalho monótono",
    "Estresse no trabalho",
    "Exige esforço mental",
    "Sabe sobre ergonomia",
    "Ruído no trabalho",
    "Temperatura do trabalho",
    "Iluminação atrapalha",
  ];

  const seriesLabels = [
    "Sim", "Não", "Bom", "Ótimo", "Razoável", "Alto", "Baixo", "Médio"
  ];

  const seriesData = seriesLabels.map(label => ({
    name: label,
    data: workplace_columns.map(column => workplaceData[column]?.[label] || 0)
  }));

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
            label: serie.name,
          }))}
          sx={{ height: "80%" }}
          colors={[
            "#000080",
            "#1E90FF",
            "#00FF7F",
            "#EDC949",
            "#E15759",
            "#8B4513",
            "#FF6347",
            "#4682B4",
            "#32CD32",
          ]}
          margin={{ right: 200, left: 150, top: 0, bottom: 25 }}
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

export default GraficoAmbiente;
