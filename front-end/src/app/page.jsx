// Importações necessárias
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import GraficoColunas from "@/components/GraficoColunas";
import NavBar from "@/components/NavBar";
import SectorPainChart from "@/components/Sector";

// Componente Home principal
export default function Home() {
  const [responseData, setResponseData] = useState({});
  const [selectedSector, setSelectedSector] = useState(null);

  // Hook useEffect para carregar dados iniciais
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
    setSelectedSector(event.target.value);
  };

  return (
    <NavBar>
      <div className="h-screen flex flex-row flex-grow gap-5 p-5 w-full justify-center items-center ">
        <div className="flex flex-col gap-5 w-1/2 justify-center items-center h-full">
          <div className="bg-white rounded-lg h-1/2 w-full justify-center pt-3 shadow-md">
            <h1 className="text-center font-bold mb-0">
              Nível de dores por departamento
            </h1>
            <GraficoColunas responseData={responseData} />
          </div>
          <div className="bg-white rounded-lg h-1/2 w-full shadow-md">
            <h2 className="text-center font-bold mb-2">Selecione um setor:</h2>

            <select
              className=" mb-2 border border-gray-300  rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedSector || ""}
              onChange={handleSectorChange}
            >
              <option value="">Selecione um setor</option>
              {Object.keys(responseData).map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
            {selectedSector && <SectorPainChart sector={selectedSector} />}
          </div>
        </div>

        <div className="flex flex-col h-full w-1/2 justify-center items-center">
          <div className="bg-white rounded-lg h-full  w-full pt-3 shadow-md">
            INFORMAÇÕES GERAIS
          </div>
        </div>
      </div>
    </NavBar>
  );
}

//
