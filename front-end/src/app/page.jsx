"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import GraficoColunas from "@/components/GraficoColunas";
import NavBar from "@/components/NavBar";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import OverviewData from "@/components/Overview";
import SectorStack from "../components/SectorStack";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import TableSector from "@/components/TableSector";
import GraficoSatisfacao from "@/components/SatisfactionChart";
import Sample from "@/components/Sample";


export default function Home() {
  const satisfactionColumns = [
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Em muitos campos a minha vida está próxima do meu ideal.]",
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [As minhas condições de vida são excelentes]",
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Estou satisfeito com a minha vida]",
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Até o presente momento tenho alcançado as coisas importantes que quero para a minha vida]",
    "30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Se pudesse viver a minha vida de novo não mudaria quase nada]"
  ];

  const [responseData, setResponseData] = useState({});
  const [selectedSector, setSelectedSector] = useState("");
  const [sectorData, setSectorData] = useState({});
  const [chartType, setChartType] = useState("pain"); // Define o tipo de gráfico padrão como "pain"
  const [satisfactionType, setSatisfactionType] = useState("30. Sobre a sua satisfação com a vida, utilize a escala de 1 a 7 pontos para indicar sua concordância com cada afirmação a seguir. [Em muitos campos a minha vida está próxima do meu ideal.]"); // Define o tipo de gráfico padrão como "pain"

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/setores")
      .then((response) => {
        const data = response.data;
        setResponseData(data);
      })
      .catch((error) => console.error("Erro na requisição:", error));
  }, []);

  const handleSectorChange = (event) => {
    const selectedSector = event.target.value;
    setSelectedSector(selectedSector);
    fetchSectorData(selectedSector);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value); // Atualiza o tipo de gráfico com base na seleção do usuário
  };

  const fetchSectorData = (sector) => {
    if (sector) {
      axios
        .get(`http://127.0.0.1:5000/api/${chartType}/${sector}`) // Usa chartType para determinar o endpoint da API dinamicamente
        .then((response) => {
          setSectorData(response.data);
        })
        .catch((error) => {
          console.error(`Erro na requisição para o setor ${sector}:`, error);
          setSectorData({});
        });
    } else {
      setSectorData({});
    }
  };

  return (
    <NavBar>
      <div className="h-screen flex flex-row flex-grow gap-5 p-5 w-full items-center bg-gray-200">
        <div className="flex flex-col gap-5 w-1/2 justify-center items-center h-full">
          <div className="bg-white rounded-lg h-1/2 w-full pt-3 shadow-md flex flex-col items-center">
            <div className="w-full text-left items-start pl-4 pb-1 font-bold">
              Nível de dores por departamento
            </div>
            <div className="rounded-md justify-center w-full h-full">
              <GraficoColunas data={responseData} />
            </div>
          </div>

          <div className="bg-white rounded-lg h-1/2 w-full shadow-md flex flex-col items-center">
            <div className="flex flex-col w-full h-1/5 justify-between">
              <div className="flex flex-row items-center w-full justify-between px-4 text-left pl-4 pb-1 font-bold mt-2">
                Nível de dor específica por setor
                <FormControl
                  variant="outlined"
                  className="ml-4"
                  sx={{ minWidth: 120 }}
                  size="small"
                >
                  <InputLabel>Setor</InputLabel>
                  <Select
                    value={selectedSector}
                    onChange={handleSectorChange}
                    label="Setor"
                    MenuProps={{
                      PaperProps: {
                        style: {
                          textAlign: "center",
                        },
                      },
                    }}

                    
                  >
                    {Object.keys(responseData).map((sector) => (
                      <MenuItem key={sector} value={sector}>
                        {sector}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  variant="outlined"
                  className="ml-4"
                  sx={{ minWidth: 120 }}
                  size="small"
                >
                  <InputLabel>Tipo de Gráfico</InputLabel>
                  <Select
                    value={chartType}
                    onChange={handleChartTypeChange}
                    label="Tipo de Gráfico"
                    MenuProps={{
                      PaperProps: {
                        style: {
                          textAlign: "center",
                        },
                      },
                    }}
                  >

                    
                    <MenuItem value="pain">Nível de Dores</MenuItem>
                    <MenuItem value="satisfaction">Satisfação com a Vida</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="justify-center w-full h-full">
              {selectedSector && chartType === "pain" && (
                <SectorStack sector={selectedSector} />
              )}
              {selectedSector && chartType === "satisfaction" && (
                <GraficoSatisfacao sector={selectedSector} />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full w-1/2 justify-start items-center">
          <div className="bg-white rounded-lg h-full w-full pt-3 shadow-md flex flex-col justify-start items-center">
            <div className="bg-white rounded-full mb-1 border-black border-2 pl-3 pr-3 pt-1 pb-1 text-center">
              Resumo das Respostas
            </div>
            <hr className="my-4 border-gray-700" />
            <div>
              <TableSector sector={selectedSector} />
            </div>
          </div>
        </div>
        <div className=" h-44 "></div>
        <Sample></Sample>
      </div>
    </NavBar>
  );
}
