import React from "react";

const OverviewData = ({ sectorData }) => {
  return (
    <div className="p-5 w-full">
      {Object.keys(sectorData).length === 0 ? (
        <p className="text-center">Nenhum dado disponível para o setor selecionado.</p>
      ) : (
        <div>
          {Object.entries(sectorData).map(([departamento, nivel]) => (
            <div key={departamento} className="flex justify-between mb-2">
              <span className="font-bold">{departamento}:</span>
              <span>{nivel}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OverviewData;
