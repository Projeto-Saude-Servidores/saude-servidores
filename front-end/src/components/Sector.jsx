import { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import CircularProgress from "@mui/material/CircularProgress";

const SectorPainChart = ({ sector }) => {
  const [sectorData, setSectorData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/api/setores/${sector}`)
      .then((response) => {
        const data = response.data;
        setSectorData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Erro na requisição para o setor ${sector}:`, error);
        setLoading(false);
      });
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

  // Convertendo os dados do setor em um formato compatível com o gráfico
  const chartData = Object.entries(sectorData).map(([departamento, nivel]) => {
    return [departamento, parseFloat(nivel.toFixed(2))];
  });

  // Adicionando o cabeçalho do gráfico
  const chartHeader = [["Departamentos", "Nível de dor médio"]];
  const finalData = chartHeader.concat(chartData);

  return (
    <div style={{ position: "relative", width: "100%", height: "80%" }}>
      <Chart
        width={"100%"}
        height={"100%"}
        chartType="ColumnChart"
        data={finalData}
        options={{
          title: `${sector}`,
          hAxis: {
            title: "Tipos de dores",
            titleTextStyle: { color: "#263238", fontSize: "14px", bold: true },
          },
          vAxis: {
            title: "Nível de dor",
            titleTextStyle: { color: "#263238", fontSize: "14px", bold: true },
          },
          legend: { position: "none" },
          animation: {
            startup: true,
            easing: "out",
            duration: 1200,
          },
          chartArea: {
            top: 20,
            width: "90%",
            height: "70%",
          },
          tooltip: {
            isHtml: true,
            ignoreBounds: true,
            textStyle: { fontSize: 12 },
            cssClassNames: {
              tooltip: "rounded-md p-2 shadow-md bg-white",
            },
          },
        }}
      />
    </div>
  );
};

export default SectorPainChart;
