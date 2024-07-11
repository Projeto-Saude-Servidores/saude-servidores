"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import GraficoColunas from "@/components/GraficoColunas";
import NavBar from "@/components/NavBar";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
// import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import OverviewData from "@/components/Overview";
import SectorStack from "../components/SectorStack";

export default function Home() {
  const [responseData, setResponseData] = useState({});
  const [selectedSector, setSelectedSector] = useState(null);
  const [sectorData, setSectorData] = useState({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/setores")
      .then((response) => {
        const data = response.data;
        console.log(data);
        setResponseData(data);
      })
      .catch((error) => console.error("Erro na requisição:", error));
  }, []);

  const handleSectorChange = (event) => {
    const selectedSector = event.target.value;
    setSelectedSector(selectedSector);

    if (selectedSector) {
      axios
        .get(`http://127.0.0.1:5000/api/setores`)
        .then((response) => {
          setSectorData(response.data);
        })
        .catch((error) => {
          console.error(`Erro na requisição para o setor:`, error);
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
            <div className="w-full text-left pl-4 pb-1 font-bold">
              Nível de dores por departamento
              {/* tirei o icon por enquanto, mas pode colocar de volta se achar mais bonito */}
            </div>
            <div className="rounded-md justify-center w-full h-full">
              <GraficoColunas data={responseData} />
            </div>
          </div>

          <div className="bg-white rounded-lg h-1/2 w-full shadow-md flex flex-col items-center">
            <div className="w-full text-left pl-4 pb-1 font-bold mt-2">
              Nível de dor específica por setor
              {/* tirei o icon por enquanto, mas pode colocar de volta se achar mais bonito */}
            </div>
            <select
              className=" mt-2 mb-2 border border-gray-300 rounded-md w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedSector || ""}
              onChange={handleSectorChange}
            >
              <option value="">SELECIONE O SETOR...</option>
              {Object.keys(responseData).map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
            {selectedSector && <SectorStack sector={selectedSector} />}
          </div>
        </div>

        <div className="flex flex-col h-full w-1/2 justify-start items-center">
          <div className="bg-white rounded-lg h-full w-full pt-3 shadow-md flex flex-col justify-start items-center">
            <div className="bg-white rounded-full mb-1 border-black border-2 pl-3 pr-3 pt-1 pb-1 text-center">
              Resumo das Respostas
            </div>
            {selectedSector && <OverviewData sectorData={sectorData} />}
          </div>
        </div>
        <div className=" h-44 "></div>
      </div>
    </NavBar>
  );
}
