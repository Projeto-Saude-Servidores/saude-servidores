"use client";
import GraficoColunas from "@/components/GraficoColunas";
import NavBar from "@/components/NavBar";
import Sample from "@/components/Sample";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [painLevels, setPainLevels] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/setores')
        .then(response => {
            const responseData = response.data;
            console.log(responseData);
            const painLevelArray = Object.values(responseData).map(value => parseFloat(value.toFixed(1)));
            console.log(painLevelArray);
            setPainLevels(painLevelArray);
        })
        .catch(error => console.error('Erro na requisição:', error));
}, []);




  return (
    <NavBar>
    <main className="h-screen flex flex-col items-center justify-between bg-gray-300">
      

  
    
      <div className="flex flex-row flex-grow p-5 w-full justify-center items-center">
        <div className="flex flex-col gap-5 w-1/2 justify-center items-center h-full">
          {/* Quadrado 1 */}
          <div className="bg-white rounded-lg h-1/2 w-4/5 justify-center pt-3 shadow-md">
          <h1 className="text-center font-bold">Nível de dores por departamento</h1>
          <GraficoColunas data={painLevels}/>
          </div>

          {/* Quadrado 2 */}
          <div className="bg-white rounded-lg h-1/2 w-4/5 shadow-md">Gráfico 2</div>
        </div>

        <div className="flex flex-col h-full w-1/2 justify-center items-center">
          {/* Quadrado 1 */}
          <div className="bg-white rounded-lg h-full w-4/5 shadow-md">Informações/filtros</div>
        </div>
      </div>
    </main>
    </NavBar>
  );
}
