"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import GraficoColunas from "@/components/GraficoColunas";
import NavBar from "@/components/NavBar";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import OverviewData from "@/components/Overview";
import SectorStack from "../components/SectorStack";
import OldStack from "../components/OldStack";
import GenderStack from "../components/GenderStack";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import TableSector from "@/components/TableSector";
import TableOld from "@/components/TableOld";
import TableGender from "@/components/TableGender";
import GraficoSatisfacao from "@/components/SatisfactionChart";
import Sample from "@/components/Sample";
import GraficoPostura from "@/components/PostureChart";
import GraficoAmbiente from "@/components/WorkplaceChart";
import GraficoSaude from "@/components/HealthChart";
import CorpoHumano from "@/components/CorpoHumano";
import OldCorpoHumano from "@/components/OldCorpoHumano";
import GenderCorpoHumano from "@/components/GenderCorpoHumano";
import TablePosture from "@/components/TableSectorPosture";
import HealthTable from "@/components/TableSectorHealth";
import TabelaSatisfacao from "@/components/TableSectorSatisfaction";
import WorkplaceTable from "@/components/TableSectorWorkplace";

export default function Home() {
  const [responseDataSectors, setResponseDataSectors] = useState({});
  const [responseDataOlds, setResponseDataOlds] = useState({});
  const [responseDataGenders, setResponseDataGenders] = useState({});
  const [selectedSector, setSelectedSector] = useState("ADM");
  const [selectedOld, setSelectedOld] = useState("faixa1");
  const [selectedGender, setSelectedGender] = useState("Masculino");
  const [sectorData, setSectorData] = useState({});
  const [oldData, setOldData] = useState({});
  const [genderData, setGenderData] = useState({});
  const [chartType, setChartType] = useState("pain");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/setores")
      .then((response) => {
        const data = response.data;
        setResponseDataSectors(data);
      })
      .catch((error) => console.error("Erro na requisição:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/idades")
      .then((response) => {
        const data = response.data;
        setResponseDataOlds(data);
      })
      .catch((error) => console.error("Erro na requisição:", error));
  }, []);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/generos")
      .then((response) => {
        const data = response.data;
        setResponseDataGenders(data);
      })
      .catch((error) => console.error("Erro na requisição:", error));
  }, []);

  const handleSectorChange = (event) => {
    const selectedSector = event.target.value;
    setSelectedSector(selectedSector);
    fetchSectorData(selectedSector);
  };

  const handleOldChange = (event) => {
    const selectedOld = event.target.value;
    setSelectedOld(selectedOld);
    fetchOldData(selectedOld);
  };

  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    setSelectedGender(selectedGender);
    fetchGenderData(selectedGender);
  };
  
  

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const fetchSectorData = (sector) => {
    if (sector) {
      axios
        .get(`http://127.0.0.1:5000/api/${chartType}/${sector}`)
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

  const fetchOldData = (old) => {
    if (old) {
      axios
        .get(`http://127.0.0.1:5000/api/${chartType}/${old}`)
        .then((response) => {
          setOldData(response.data);
        })
        .catch((error) => {
          console.error(`Erro na requisição para a faixa etária ${old}:`, error);
          setOldData({});
        });
    } else {
      setOldData({});
    }
  };
  const fetchGenderData = (gender) => {
    if (gender) {
      axios
        .get(`http://127.0.0.1:5000/api/${chartType}/${gender}`)
        .then((response) => {
          setGenderData(response.data);
        })
        .catch((error) => {
          console.error(`Erro na requisição para o gênero ${gender}:`, error);
          setGenderData({});
        });
    } else {
      setGenderData({});
    }
  };

  const seletorGrafico = (
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
                    <MenuItem value="pain">Dores por departamento</MenuItem>
                    <MenuItem value="pain_old">Dores por faixa etária</MenuItem>
                    <MenuItem value="pain_gender">Dores por gênero</MenuItem>
                    <MenuItem value="satisfaction">
                      Satisfação com a Vida
                    </MenuItem>
                    <MenuItem value="posture">Postura</MenuItem>
                    <MenuItem value="workplace">Ambiente De Trabalho</MenuItem>
                    <MenuItem value="health">Saúde</MenuItem>
                  </Select>
                </FormControl>
  )

  return (
    <NavBar>
      <div className="h-full flex flex-row gap-5 p-5 w-full items-center bg-gray-200">
        <div className="flex flex-col gap-5 h-full w-1/2 justify-center items-center ">
          <div className=" bg-white rounded-lg h-1/2 w-full pt-3 shadow-md flex flex-grow flex-col items-center">

            
            {selectedSector && chartType !== "pain_old" && chartType !== "pain_gender" && (
                <div className="w-full flex flex-row text-left justify-between items-start px-4 pb-1 mb-2 font-bold">
                  Nível médio de dores relacionado a departamentos
                  {seletorGrafico}
                </div>
            )}
            {selectedSector && chartType === "pain_old" && (
                <div className="w-full flex flex-row text-left justify-between items-start px-4 pb-1 mb-2 font-bold">
                  Nível médio de dores relacionado a faixas etárias
                  {seletorGrafico}
                </div>
            )}
            {selectedSector && chartType === "pain_gender" && (
                <div className="w-full flex flex-row text-left justify-between items-start px-4 pb-1 mb-2 font-bold">
                  Nível médio de dores relacionado a gêneros
                  {seletorGrafico}
                </div>
            )}
            

            {selectedSector && chartType !== "pain_old" && chartType !== "pain_gender" &&(
                <div className="rounded-md justify-center w-full h-full">
                  <GraficoColunas data={responseDataSectors} />
                </div>
            )}
            {selectedSector && chartType === "pain_old" && (
                <div className="rounded-md justify-center w-full h-full">
                  <GraficoColunas data={responseDataOlds} />
                </div>
            )}
            {selectedSector && chartType === "pain_gender" && (
                <div className="rounded-md justify-center w-full h-full">
                  <GraficoColunas data={responseDataGenders} />
                </div>
            )}
            
          </div>

          <div className="bg-white rounded-lg h-1/2 w-full shadow-md flex flex-col items-center">
            <div className="flex flex-col w-full h-1/5 justify-between">

              {selectedSector && chartType !== "pain_old" && chartType !== "pain_gender" &&(
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
                      {Object.keys(responseDataSectors).map((sector) => (
                        <MenuItem key={sector} value={sector}>
                          {sector}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              )}

              {selectedSector && chartType === "pain_old" && (
                  <div className="flex flex-row items-center w-full justify-between px-4 text-left pl-4 pb-1 font-bold mt-2">
                  Nível de dor específica por faixa etária
                  <FormControl
                    variant="outlined"
                    className="ml-4"
                    sx={{ minWidth: 120 }}
                    size="small"
                  >
                    <InputLabel>Faixa Etária</InputLabel>
                    <Select
                      value={selectedOld}
                      onChange={handleOldChange}
                      label="Faixa Etária"
                      MenuProps={{
                        PaperProps: {
                          style: {
                            textAlign: "center",
                          },
                        },
                      }}
                    >
                      <MenuItem value="faixa1">29 anos ou menos</MenuItem>
                      <MenuItem value="faixa2">30 - 34 anos</MenuItem>
                      <MenuItem value="faixa3">35 - 39 anos</MenuItem>
                      <MenuItem value="faixa4">40 - 49 anos</MenuItem>
                      <MenuItem value="faixa5">50 anos ou mais</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              )}
              {selectedSector && chartType === "pain_gender" && (
                  <div className="flex flex-row items-center w-full justify-between px-4 text-left pl-4 pb-1 font-bold mt-2">
                  Nível de dor específica por gênero
                  <FormControl
                    variant="outlined"
                    className="ml-4"
                    sx={{ minWidth: 120 }}
                    size="small"
                  >
                    <InputLabel>Gênero</InputLabel>
                    <Select
                      value={selectedGender}
                      onChange={handleGenderChange}
                      label="Gênero"
                      MenuProps={{
                        PaperProps: {
                          style: {
                            textAlign: "center",
                          },
                        },
                      }}
                    >
                      <MenuItem value="Masculino">Masculino</MenuItem>
                      <MenuItem value="Feminino">Feminino</MenuItem>

                    </Select>
                  </FormControl>
                </div>
              )}
              
            </div>

            <div className="justify-center w-full h-full">
              {selectedSector && chartType === "pain" && (
                <SectorStack sector={selectedSector} />
              )}
              {selectedOld && chartType === "pain_old" && (
                <OldStack old={selectedOld} />
              )}
              {selectedGender && chartType === "pain_gender" && (
                <GenderStack gender={selectedGender} />
              )}
              {selectedSector && chartType === "satisfaction" && (
                <GraficoSatisfacao sector={selectedSector} />
              )}
              {selectedSector && chartType === "posture" && (
                <GraficoPostura sector={selectedSector} />
              )}
              {selectedSector && chartType === "workplace" && (
                <GraficoAmbiente sector={selectedSector} />
              )}
              {selectedSector && chartType === "health" && (
                <GraficoSaude sector={selectedSector} />
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
            <div className=" w-full">
              {selectedSector && chartType === "pain" && (
                  <TableSector sector={selectedSector} />
              )}
              {selectedOld && chartType === "pain_old" && (
                  <TableOld old={selectedOld} />
              )}
              {selectedGender && chartType === "pain_gender" && (
                  <TableGender gender={selectedGender} />
              )}
              {selectedSector && chartType === "satisfaction" && (
                <TabelaSatisfacao sector={selectedSector} />
              )}
              {selectedSector && chartType === "posture" && (
                  <TablePosture sector={selectedSector} />
              )}
              {selectedSector && chartType === "workplace" && (
                <WorkplaceTable sector={selectedSector} />
              )}
              {selectedSector && chartType === "health" && (
                <HealthTable sector={selectedSector} />
              )}
            </div>
            <div className=" w-1/2">
              {selectedSector && chartType === "pain" && (
                  <CorpoHumano sector={selectedSector} />
              )}
              {selectedOld && chartType === "pain_old" && (
                  <OldCorpoHumano old={selectedOld} />
              )}
              {selectedGender && chartType === "pain_gender" && (
                  <GenderCorpoHumano gender={selectedGender} />
              )}
            </div>
          </div>
        </div>
        <div className=" h-44 "></div>
        <Sample></Sample>
      </div>
    </NavBar>
  );
}
