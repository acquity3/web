import React from 'react';
import Chart from 'react-apexcharts';

import './PrevRoundSummaryChart.scss';

const PrevRoundSummaryChart = ({ data = [] }) => {
  const options = {
    noData: {
      text: 'Not enough data to display yet',
      style: {
        color: '#1f4190',
        fontSize: window.innerWidth < 426 ? '1rem' : '1.5rem',
        fontFamily: 'Nexa'
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
          formatter: () => 'US$'
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
      },
      padding: {
        top: -45
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
          fontFamily: 'Nexa'
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
  const series = [
    {
      name: 'Average price',
      data
    }
  ];

  return <Chart type="area" options={options} series={series} height={250} />;
};

export default PrevRoundSummaryChart;
