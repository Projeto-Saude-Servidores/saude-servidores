"use client";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function SectorStack() {
  return (
    <BarChart
      axisHighlight={{
        x: "line",
        y: "line",
      }}
      layout="horizontal"
      yAxis={[
        {
          scaleType: "band",
          data: [
            "DOR1",
            "DOR2",
            "DOR3",
            "DOR4",
            "DOR5",
            "DOR6",
            "DOR7",
            "DOR8",
            "DOR9",
            "DOR10",
            "DOR11",
            "DOR12",
            "DOR13",
            "DOR14",
          ],
        },
      ]}
      series={[
        {
          // [nivel1 de pescoço, nivel 1 de punho,....]
          data: [3, 4, 1, 6, 5, 7, 2, 3, 4, 5, 6, 7, 2, 3],
          stack: "A",
          label: "Nível 1",
        },
        {
          data: [4, 3, 1, 5, 8, 2, 4, 5, 6, 7, 2, 3, 4, 5],
          stack: "A",
          label: "Nível 2",
        },
        {
          data: [4, 2, 5, 4, 1, 3, 4, 5, 6, 2, 3, 4, 5, 6],
          stack: "A",
          label: "Nível 3",
        },
        {
          data: [2, 8, 1, 3, 1, 5, 6, 7, 2, 3, 4, 5, 6, 2],
          stack: "A",
          label: "Nível 4",
        },
        {
          data: [2, 8, 1, 3, 1, 2, 3, 4, 5, 6, 7, 2, 3, 4],
          stack: "A",
          label: "Nível 5",
        },
      ]}
      width={600}
      height={350}
      colors={[" #808080", "#1f77b4", "#2ca02c", "#ff7f0e", "#d62728"]}
      // Cores personalizadas para as barras
      legend={{
        title: "Níveis de Dor", // Título da legenda
      }}
      margin={{ right: 100 }}
      slotProps={{
        // Estilizações adicionais
        legend: {
          direction: "column",
          position: { vertical: "middle", horizontal: "right" },
          padding: 0,
        },
        xAxis: {
          tickLabelProps: { fontSize: 12, fontFamily: "Roboto" }, // Estilo dos rótulos do eixo x
        },
        yAxis: {
          tickLabelProps: { fontSize: 12, fontFamily: "Roboto" }, // Estilo dos rótulos do eixo y
        },
        bar: {
          barStyle: { borderRadius: 5 }, // Estilo das barras
        },
      }}
    />
  );
}
