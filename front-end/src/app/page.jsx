"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GraficoColunas from '@/components/GraficoColunas';
import NavBar from '@/components/NavBar';

export default function Home() {
  const [responseData, setResponseData] = useState({});

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/setores')
      .then(response => {
        const data = response.data;
        console.log(data);
        setResponseData(data);
      })
      .catch(error => console.error('Erro na requisição:', error));
  }, []);

  return (
    <NavBar>
      <main className="h-screen flex flex-col items-center justify-between bg-gray-300">
        <div className="flex flex-row flex-grow gap-5 p-5 w-full justify-center items-center">
          <div className="flex flex-col gap-5 w-1/2 justify-center items-center h-full">
            <div className="bg-white rounded-lg h-1/2 w-full justify-center pt-3 shadow-md">
              <h1 className="text-center font-bold mb-0">Nível de dores por departamento</h1>
              <GraficoColunas responseData={responseData} />
            </div>
            <div className="bg-white rounded-lg h-1/2 w-full shadow-md">Gráfico 2</div>
          </div>
          <div className="flex flex-col h-full w-1/2 justify-center items-center">
            <div className="bg-white rounded-lg h-full w-full pt-3 shadow-md">
              <h1 className="text-center font-bold mb-0">Dados da amostra</h1>
            </div>
          </div>
        </div>
      </main>
    </NavBar>
  );
}
