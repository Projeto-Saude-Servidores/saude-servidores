import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

function GraficoColunas({ data }) {
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

  console.log('dataset:', JSON.stringify(dataset, null, 2));
  console.log('colorMap:', JSON.stringify(colorMap, null, 2));

  return (
    <Stack direction="column" spacing={1} sx={{ width: '100%', height: '100%' }}>
      <BarChart
        series={[
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

export default GraficoColunas;
