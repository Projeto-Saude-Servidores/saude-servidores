"use client";
import React from 'react';
import ReactApexChart from 'react-apexcharts';

class GraficoColunas extends React.Component {
  constructor(props) {
    super(props);

    const data = [1.3, 2, 1.6, 4.4, 4, 0.9, 4.8, 3.5, 3.2, 0.5];
    
    const colors = data.map(value => {
      if (value < 1.5) return '#00FF00'; // verde
      if (value > 4) return '#FF0000'; // vermelho
      return '#FFFF00'; // amarelo
    });

    this.state = {
      series: [{
        name: 'Nível de dor média',
        data: data
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
            distributed: true, // Configura as barras para usar cores distribuídas
          },
        },
        dataLabels: {
          enabled: false // Desativa legendas de dados individuais
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['GAB', 'TI', 'ADM', 'BB', 'RH', 'DE', 'DP', 'DC', 'IN', 'FIN'],
          title: {
            text: 'Departamentos', // Adiciona o título ao eixo X
            style: {
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#263238'
            },
            offsetY: -10, // Ajusta a posição vertical do título
          }
        },
        yaxis: {
          title: {
            text: 'Nível das dores'
          }
        },
        fill: {
          opacity: 1,
          colors: colors // Aplica as cores às colunas
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            }
          }
        },
        legend: {
          show: false // Desativa a legenda padrão
        }
      },
    };
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
