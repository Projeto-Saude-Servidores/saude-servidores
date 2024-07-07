import React from 'react';
import { Chart } from 'react-google-charts';
import CircularProgress from '@mui/material/CircularProgress';

class GraficoColunas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    // carregamento
    setTimeout(() => {
      this.setState({ loading: false });
    }); 
  }

  render() {
    const { responseData } = this.props;

    // Convertendo o objeto responseData em um array de arrays para o react-google-charts
    const chartData = Object.entries(responseData).map(([departamento, nivel]) => {
      return [departamento, parseFloat(nivel.toFixed(2)), nivel < 1 ? '#00FF00' : (nivel > 2.5 ? '#FF0000' : '#FFFF00')];
    });

    // Adicionando o cabeçalho do gráfico
    const chartHeader = [['Departamentos', 'Nível de dor médio', { role: 'style' }]];
    const finalData = chartHeader.concat(chartData);

    return (
      <div className="border-2 rounded-lg px-2">
        <div style={{ position: 'relative', width: '100%', height: '90%' }}>
        {this.state.loading && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <CircularProgress />
          </div>
        )}
        <Chart
          width={'100%'}
          height={'100%'}
          chartType="ColumnChart"
          data={finalData}
          options={{
            hAxis: {
              title: 'Departamentos',
              titleTextStyle: { color: '#263238', fontSize: '14px', bold: true },
            },
            vAxis: {
              title: 'Nível de dores',
              titleTextStyle: { color: '#263238', fontSize: '14px', bold: true },
            },
            legend: { position: 'none' },
            animation: {
              startup: true,
              easing: "out",
              duration: 1200,
            },
            chartArea: {
              top: 20, 
              width: '90%', 
              height: '80%' 
            },
            tooltip: { isHtml: true, ignoreBounds: true, textStyle: { fontSize: 12 }, cssClassNames: {
              tooltip: 'rounded-md p-2 shadow-md bg-white',
              },
            },
            
          }}
        />
      </div>
      </div>
    );
  }
}

export default GraficoColunas;
