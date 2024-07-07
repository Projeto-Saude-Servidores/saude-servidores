import React from 'react';
import ReactApexChart from 'react-apexcharts';

class GraficoColunas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: 'Nível de dor média',
        data: []  // Inicialmente vazio, vamos atualizar com props
      }],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
            distributed: true,
            events: {
              dataPointSelection: (event, chartContext, config) => {
                const departmentName = this.state.options.xaxis.categories[config.dataPointIndex];
                console.log('Departamento clicado:', departmentName);
              }
            }
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['GAB', 'TI', 'ADM', 'BB', 'RH', 'DE', 'DP', 'DC', 'IN', 'FIN'],
          title: {
            text: 'Departamentos',
            style: {
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#263238'
            },
            offsetY: -10,
          }
        },
        yaxis: {
          title: {
            text: 'Nível das dores'
          }
        },
        fill: {
          opacity: 1,
          colors: []  // Será atualizado com base nos dados recebidos
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            }
          }
        },
        legend: {
          show: false
        }
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data !== prevState.series[0].data) {
      const colors = nextProps.data.map(value => {
        if (value < 1) return '#00FF00'; // verde
        if (value > 2.5) return '#FF0000'; // vermelho
        return '#FFFF00'; // amarelo
      });

      return {
        series: [{
          ...prevState.series[0],
          data: nextProps.data
        }],
        options: {
          ...prevState.options,
          fill: {
            ...prevState.options.fill,
            colors: colors
          }
        }
      };
    }
    return null;
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={300} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default GraficoColunas;
