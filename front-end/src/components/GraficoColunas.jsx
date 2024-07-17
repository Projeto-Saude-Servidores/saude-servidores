import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";

function GraficoColunas({ data }) {
  const getColor = (value) => {
    if (value < 1) {
      return "#76B7B2";
    } else if (value >= 1 && value < 2) {
      return "#EDC949";
    } else {
      return "#E15759";
    }
  };

  const dataset = React.useMemo(() => {
    return Object.entries(data).map(([order, high]) => ({
      order,
      high,
      color: getColor(high),
    }));
  }, [data]);

  const colorMap = dataset.reduce((acc, item) => {
    acc[item.order] = item.color;
    return acc;
  }, {});

  console.log("dataset:", JSON.stringify(dataset, null, 2));
  console.log("colorMap:", JSON.stringify(colorMap, null, 2));

  // Definição da legenda personalizada com espaçamento ajustado
  const customLegend = (
    <Stack
      direction="row"
      spacing={2}
      className="pr-8"
      justifyContent="flex-end"
      sx={{ marginRight: 4 }}
    >
      <Stack direction="row" spacing={0.5} alignItems="center">
        <div style={{ width: 20, height: 20, backgroundColor: "#76B7B2" }} />
        <span>Bom</span>
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <div style={{ width: 20, height: 20, backgroundColor: "#EDC949" }} />
        <span>Médio</span>
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <div style={{ width: 20, height: 20, backgroundColor: "#E15759" }} />
        <span>Ruim</span>
      </Stack>
    </Stack>
  );

  return (
    <div className=" h-[500px]">
      <Stack
        direction="column"
        spacing={1}
        sx={{ width: "100%", height: "100%" }}
      >
        <Stack direction="column" spacing={1}>
          {customLegend}
        </Stack>
        <BarChart
          series={[
            {
              dataKey: "high",
              layout: "vertical",
              stack: "stack",
            },
          ]}
          dataset={dataset}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "order",
              colorMap: {
                type: "ordinal",
                colors: Object.values(colorMap),
              },
            },
          ]}
          yAxis={[]}
          borderRadius={10}
          sx={{ height: "70%" }}
          margin={{
            left: 30,
            right: 30,
            top: 30,
            bottom: 35,
          }}
        />
      </Stack>
    </div>
  );
}

GraficoColunas.propTypes = {
  data: PropTypes.object.isRequired,
};

export default GraficoColunas;
