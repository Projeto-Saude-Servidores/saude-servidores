import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
<<<<<<< HEAD
=======
import { axisClasses } from '@mui/x-charts/ChartsAxis';
>>>>>>> b412d402f154ce2331174637eaceda00ab18ac2b
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

function GraficoColunas({ data }) {
<<<<<<< HEAD
  const getColor = (value) => {
    if (value < 1) {
      return '#76B7B2';
    } else if (value >= 1 && value < 2) {
      return '#EDC949';
    } else {
      return '#E15759';
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

  const legendItems = [
    { label: 'bom', color: '#76B7B2' },
    { label: 'médio', color: '#EDC949' },
    { label: 'ruim', color: '#E15759' },
  ];

  console.log('dataset:', JSON.stringify(dataset, null, 2));
  console.log('colorMap:', JSON.stringify(colorMap, null, 2));
=======
  console.log('Dataset:', data); // Verifica os dados recebidos antes do processamento


  // ainda sem funcionar as cores
  const getColor = (value) => {
    if (value < 1) {
      return '#76B7B2';
    } else if (value >= 1 && value < 2) {
      return '#EDC949';
    } else {
      return '#E15759';
    }
  };

  const dataset = React.useMemo(() => {
    return Object.entries(data).map(([key, value]) => ({
      order: key,
      high: value,
      color: getColor(value), // Adiciona a cor com base nos critérios definidos
    }));
  }, [data]);

  console.log('Dataset com cores:', dataset); // Verifica o dataset com as cores atribuídas
>>>>>>> b412d402f154ce2331174637eaceda00ab18ac2b

  return (
    <Stack direction="column" spacing={1} sx={{ width: '100%', height: '100%' }}>
      <BarChart
        series={[
<<<<<<< HEAD
          {
            dataKey: 'high',
            layout: 'vertical',
            stack: 'stack',
          },
        ]}
        dataset={dataset}
        xAxis={[
          {
            scaleType: 'band',
            dataKey: 'order',
            colorMap: {
              type: 'ordinal',
              colors: Object.values(colorMap),
            },
          },
        ]}
        yAxis={[]}
=======
          { dataKey: 'high', layout, stack: 'stack', colorKey: 'color' },
        ]}
        {...(layout === 'vertical' ? chartSettingsV(dataset) : chartSettingsH(dataset))}
>>>>>>> b412d402f154ce2331174637eaceda00ab18ac2b
        borderRadius={10}
        sx={{ height: '80%' }}
        margin={{
          left: 30,
          right: 30,
          top: 30,
          bottom: 30,
        }}
<<<<<<< HEAD
        slotProps={{
          legend: {
            items: legendItems.map((item) => ({
              label: item.label,
              marker: { fill: item.color },
            })),
          },
        }}
=======
>>>>>>> b412d402f154ce2331174637eaceda00ab18ac2b
      />
    </Stack>
  );
}

GraficoColunas.propTypes = {
  data: PropTypes.object.isRequired,
};

<<<<<<< HEAD
=======
const chartSettingsH = (dataset) => ({
  dataset,
  yAxis: [{ scaleType: 'band', dataKey: 'order' }],
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
});

const chartSettingsV = (dataset) => ({
  ...chartSettingsH(dataset),
  xAxis: [{ scaleType: 'band', dataKey: 'order' }],
  yAxis: undefined,
});

>>>>>>> b412d402f154ce2331174637eaceda00ab18ac2b
export default GraficoColunas;
