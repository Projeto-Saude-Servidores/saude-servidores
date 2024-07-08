import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

function GraficoColunas({ data }) {
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

  return (
    <Stack direction="column" spacing={1} sx={{ width: '100%', height: '100%' }}>
      <BarChart
        series={[
          { dataKey: 'high', layout, stack: 'stack', colorKey: 'color' },
        ]}
        {...(layout === 'vertical' ? chartSettingsV(dataset) : chartSettingsH(dataset))}
        borderRadius={10}
        sx={{ height: '80%' }}
        margin={{
          left: 30,
          right: 30,
          top: 30,
          bottom: 30,
        }}
      />
    </Stack>
  );
}

GraficoColunas.propTypes = {
  data: PropTypes.object.isRequired,
};

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

export default GraficoColunas;
