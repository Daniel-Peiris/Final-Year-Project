import React, { useState } from 'react';
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
  Legend,
  Filler,
  ChartData,
  ChartOptions,

} from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Search, AlertCircle, TrendingUp, Activity, Loader2, LineChart, Sprout } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  Filler
);

const Container = styled.div`
  padding: 1rem;
  text-align: center;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0%);
  border-radius: 20px;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-shadow: 0 0 20px rgba(46, 204, 113, 0.3);
  background: linear-gradient(45deg, #2ecc71, #b8ff30);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  svg {
    color: #2ecc71;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
    gap: 0.75rem;

    svg {
      width: 36px;
      height: 36px;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    gap: 0.5rem;

    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

const Form = styled(motion.form)`
  width: 100%;
  max-width: 900px;
  margin: 0 auto 2rem;
  background: rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid rgba(46, 204, 113, 0.3);
  box-shadow: 0 8px 32px rgba(46, 204, 113, 0.1);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin-bottom: 1rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  font-weight: 500;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #2ecc71;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.6rem;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem 1.2rem;
  font-size: 1.1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(46, 204, 113, 0.3);
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2ecc71;
    box-shadow: 0 0 15px rgba(46, 204, 113, 0.3);
  }

  option {
    background: #1a1a1a;
    color: white;
    padding: 10px;
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 0.875rem;
    font-size: 0.875rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.2rem;
  font-size: 1.1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(46, 204, 113, 0.3);
  border-radius: 12px;
  color: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2ecc71;
    box-shadow: 0 0 15px rgba(46, 204, 113, 0.3);
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 0.875rem;
    font-size: 0.875rem;
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 1.2rem;
  font-size: 1.2rem;
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 1rem;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
    gap: 0.6rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
    font-size: 0.875rem;
    gap: 0.5rem;
    letter-spacing: 0.5px;
  }
`;

const ErrorMessage = styled(motion.div)`
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.3);
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    padding: 0.875rem;
    font-size: 0.8125rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    font-size: 0.75rem;
  }
`;

const PredictedPrice = styled(motion.div)`
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.2), rgba(39, 174, 96, 0.2));
  border-radius: 20px;
  padding: 2.5rem 2rem;
  margin: 2rem auto;
  max-width: 600px;
  border: 2px solid rgba(46, 204, 113, 0.4);
  box-shadow: 0 12px 40px rgba(46, 204, 113, 0.2);

  h3 {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }

  .price {
    color: #2ecc71;
    font-size: 3.5rem;
    font-weight: 800;
    text-shadow: 0 0 20px rgba(46, 204, 113, 0.4);
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin: 1.5rem auto;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    .price {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    margin: 1rem auto;

    h3 {
      font-size: 1rem;
    }

    .price {
      font-size: 2rem;
    }
  }
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ChartContainer = styled(motion.div)`
  background: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(46, 204, 113, 0.3);
  box-shadow: 0 8px 32px rgba(46, 204, 113, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(46, 204, 113, 0.2);
  }

  h3 {
    color: #2ecc71;
    font-size: 1.8rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;

    h3 {
      font-size: 1.4rem;
      margin-bottom: 1.5rem;
      gap: 0.6rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      gap: 0.5rem;
    }
  }
`;


interface BackendResponse {
  predicted_price: number;
  priceChart: {
    labels: string[];
    data: number[];
  };
  demandChart: {
    labels: string[];
    data: number[];
  };
}

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'white',
        font: {
          size: 14,
          weight: 'bold'
        },
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: {
        size: 16,
        weight: 'bold'
      },
      bodyFont: {
        size: 14
      },
      padding: 12,
      borderColor: '#2ecc71',
      borderWidth: 1
    }
  },
  scales: {
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
        drawBorder: false
      },
      ticks: {
        color: 'white',
        font: {
          size: 12
        },
        padding: 10,
        callback: function(value: number) {
          return `Rs ${value}`;
        }
      }
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
        drawBorder: false
      },
      ticks: {
        color: 'white',
        font: {
          size: 12
        },
        padding: 10,
        maxRotation: 45,
        minRotation: 45
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index' as const
  }
};

function MarketPulse(): JSX.Element {
  const [crop, setCrop] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [priceChartData, setPriceChartData] = useState<ChartData<'line'> | null>(null);
  const [demandChartData, setDemandChartData] = useState<ChartData<'line'> | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setPredictedPrice(null);
    setPriceChartData(null);
    setDemandChartData(null);

    if (!crop || !date) {
      setError('Please select a crop and a date.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/get_chart_data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop, date }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from backend.');
      }

      const data: BackendResponse = await response.json();

      setPredictedPrice(data.predicted_price);
      setPriceChartData({
        labels: data.priceChart.labels,
        datasets: [
          {
            label: 'Price (Rs/kg)',
            data: data.priceChart.data,
            borderColor: '#2ecc71',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            tension: 0.4,
          },
        ],
      });
      setDemandChartData({
        labels: data.demandChart.labels,
        datasets: [
          {
            label: 'Demand (kg)',
            data: data.demandChart.data,
            borderColor: '#ff9933',
            backgroundColor: 'rgba(255, 153, 51, 0.1)',
            tension: 0.4,
          },
        ],
      });
    } catch (err) {
      console.error(err);
      setError('Error fetching data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <LineChart size={50} />
        Market Pulse
      </SectionTitle>

      <Form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FormGroup>
          <Label>
            <Sprout size={20} />
            Select Crop
          </Label>
          <Select value={crop} onChange={(e) => setCrop(e.target.value)} required>
            <option value="">Select Crop</option>
            <option value="Tomatoes">Tomatoes</option>
            <option value="Chili">Chili</option>
            <option value="Cabbage">Cabbage</option>
            <option value="Bitter_Gourd">Bitter Gourd</option>
            <option value="Long_Beans">Long Beans</option>
            <option value="Pumpkin">Pumpkin</option>
            <option value="Eggplant">Eggplant</option>
            <option value="Cucumber">Cucumber</option>
            <option value="Drumstick">Drumstick</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>
            <Calendar size={20} />
            Select Date
          </Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </FormGroup>

        <Button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={24} />
              Analyzing...
            </>
          ) : (
            <>
              <Search size={24} />
              Analyze Data
            </>
          )}
        </Button>

        {error && (
          <ErrorMessage
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle size={20} />
            {error}
          </ErrorMessage>
        )}
      </Form>

      <AnimatePresence>
        {predictedPrice !== null && (
          <>
            <PredictedPrice
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3>Predicted Price</h3>
              <div className="price">Rs {predictedPrice.toFixed(2)}/kg</div>
            </PredictedPrice>

            <ChartGrid>
              {priceChartData && (
                <ChartContainer
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3>
                    <TrendingUp size={28} />
                    Price Forecast
                  </h3>
                  <div style={{ height: '400px' }}>
                    <Line data={priceChartData} options={chartOptions} />
                  </div>
                </ChartContainer>
              )}

              {demandChartData && (
                <ChartContainer
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3>
                    <Activity size={28} />
                    Demand Forecast
                  </h3>
                  <div style={{ height: '400px' }}>
                    <Line data={demandChartData} options={chartOptions} />
                  </div>
                </ChartContainer>
              )}
            </ChartGrid>
          </>
        )}
      </AnimatePresence>
    </Container>
  );
}

export default MarketPulse;