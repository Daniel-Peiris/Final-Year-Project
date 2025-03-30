import React from 'react';
import styled from '@emotion/styled';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

const ChartContainer = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(46, 204, 113, 0.2);
`;

const SectionTitle = styled.h2`
  color: #2ecc71;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 700;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

function MarketPulse() {
  const priceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Tomatoes (Rs/kg)',
        data: [120, 150, 180, 160, 140, 190],
        borderColor: '#2ecc71',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        tension: 0.4
      },
      {
        label: 'Chili (Rs/kg)',
        data: [400, 380, 420, 450, 430, 460],
        borderColor: '#b8ff30',
        backgroundColor: 'rgba(184, 255, 48, 0.1)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        text: 'Crop Price Trends',
        color: 'white'
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      }
    }
  };

  return (
    <Container>
      <SectionTitle>Market Pulse</SectionTitle>
      <Grid>
        <ChartContainer>
          <Line data={priceData} options={options} />
        </ChartContainer>
        <ChartContainer>
          <Line 
            data={{
              ...priceData,
              datasets: priceData.datasets.map(dataset => ({
                ...dataset,
                data: dataset.data.map(val => val * 1.2) // Forecast data
              }))
            }}
            options={{
              ...options,
              plugins: {
                ...options.plugins,
                title: {
                  ...options.plugins.title,
                  text: 'Price Forecast (Next 6 Months)'
                }
              }
            }}
          />
        </ChartContainer>
      </Grid>
    </Container>
  );
}

export default MarketPulse;