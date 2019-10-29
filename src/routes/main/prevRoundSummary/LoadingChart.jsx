import React from 'react';
import Chart from 'react-apexcharts';

import './PrevRoundSummaryChart.scss';

const LoadingChart = () => {
  const options = {
    noData: {
      text: 'Loading',
      style: {
        color: '#bfc4ce',
        fontSize: '1.5rem',
        fontFamily: 'Nexa Bold'
      }
    },
    dataLabels: {
      enabled: false
    },

    tooltip: {
      x: {
        show: true
      },
      y: {
        title: {
          formatter: () => 'SGD'
        }
      }
    },

    grid: {
      show: true,
      borderColor: '#DDDFE7',
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },

    markers: {
      size: 0,
      style: 'hollow'
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          fontSize: '14px',
          fontFamily: 'Nexa Bold'
        }
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    colors: ['#1f4190'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.7,
        stops: [0, 100]
      }
    }
  };

  return <Chart type="area" options={options} series={[]} height={250} />;
};

export default LoadingChart;
