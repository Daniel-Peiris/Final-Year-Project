import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, DollarSign, TrendingUp, Scale, Coins, AlertCircle } from 'lucide-react';

const Container = styled.div`
  padding: 1rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;

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
  background: rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(46, 204, 113, 0.2);
  box-shadow: 0 4px 30px rgba(46, 204, 113, 0.1);
  backdrop-filter: blur(5px);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const FormGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  background: rgba(0, 0, 0, 0);
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: rgba(46, 204, 113, 0.3);
    box-shadow: 0 0 15px rgba(46, 204, 113, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.875rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.75rem;

  svg {
    color: #2ecc71;
    min-width: 20px;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(46, 204, 113, 0.3);
  border-radius: 8px;
  color: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2ecc71;
    box-shadow: 0 0 10px rgba(46, 204, 113, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0.75rem 0.875rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 0.625rem 0.75rem;
    font-size: 0.875rem;
  }
`;

const ErrorText = styled.span`
  color: #e74c3c;
  font-size: 0.85rem;
  position: absolute;
  bottom: -1.2rem;
  left: 0;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    bottom: -1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 1.2rem;
  font-size: 1.2rem;
  background: linear-gradient(45deg, #2ecc71, #27ae60);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
    margin-top: 1.5rem;
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
    font-size: 0.875rem;
    margin-top: 1.25rem;
    letter-spacing: 0.5px;
  }
`;

const Result = styled(motion.div)`
  width: 100%;
  margin-top: 2rem;
  padding: 2rem;
  background: rgba(46, 204, 113, 0.15);
  border-radius: 15px;
  border: 2px solid rgba(46, 204, 113, 0.3);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin-top: 1.25rem;
  }
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.875rem;
  }
`;

const ResultCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(46, 204, 113, 0.2);
  
  h4 {
    color: #2ecc71;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    font-size: 1.8rem;
    font-weight: 700;
    color: white;
  }

  .unit {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
  }

  @media (max-width: 768px) {
    padding: 1.25rem;

    h4 {
      font-size: 1rem;
    }

    p {
      font-size: 1.5rem;
    }

    .unit {
      font-size: 0.875rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem;

    h4 {
      font-size: 0.875rem;
    }

    p {
      font-size: 1.25rem;
    }

    .unit {
      font-size: 0.75rem;
    }
  }
`;

interface FormErrors {
  [key: string]: string | undefined;
}

interface ProfitResults {
  revenue: number;
  totalCost: number;
  profit: number;
  roi: number;
  profitMargin: number;
}

const YieldSage: React.FC = () => {
  const [values, setValues] = useState({
    harvestAmount: '',
    marketPrice: '',
    productionCost: '',
    laborCost: '',
    transportCost: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [results, setResults] = useState<ProfitResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateInput = (value: string, field: string): string | undefined => {
    if (!value.trim()) {
      return `${field} is required`;
    }
    const num = Number(value);
    if (isNaN(num)) {
      return `${field} must be a number`;
    }
    if (num < 0) {
      return `${field} cannot be negative`;
    }
    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    const error = validateInput(value, name);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const calculateProfit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    const newErrors: FormErrors = {};
    Object.entries(values).forEach(([key, value]) => {
      const error = validateInput(value, key);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    if (Object.values(newErrors).some(err => err)) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expected_harvest: parseFloat(values.harvestAmount),
          market_price: parseFloat(values.marketPrice),
          production_cost: parseFloat(values.productionCost),
          labor_cost: parseFloat(values.laborCost),
          transport_cost: parseFloat(values.transportCost)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from backend.');
      }
      const data: ProfitResults = await response.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setApiError('Error calculating profit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number): string =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);

  const hasErrors = Object.values(errors).some(error => Boolean(error));

  return (
    <Container>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Calculator size={50} />
        Yield Sage
      </SectionTitle>

      <Form
        onSubmit={calculateProfit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FormGroup>
          <Label>
            <Scale size={20} />
            Expected Harvest (kg)
          </Label>
          <Input
            type="number"
            name="harvestAmount"
            value={values.harvestAmount}
            onChange={handleInputChange}
            step="any"
          />
          {errors.harvestAmount && (
            <ErrorText>
              <AlertCircle size={14} />
              {errors.harvestAmount}
            </ErrorText>
          )}
        </FormGroup>

        <FormGroup>
          <Label>
            <DollarSign size={20} />
            Market Price (Rs/kg)
          </Label>
          <Input
            type="number"
            name="marketPrice"
            value={values.marketPrice}
            onChange={handleInputChange}
            step="any"
          />
          {errors.marketPrice && (
            <ErrorText>
              <AlertCircle size={14} />
              {errors.marketPrice}
            </ErrorText>
          )}
        </FormGroup>

        <FormGroup>
          <Label>
            <Coins size={20} />
            Production Cost (Rs)
          </Label>
          <Input
            type="number"
            name="productionCost"
            value={values.productionCost}
            onChange={handleInputChange}
            step="any"
          />
          {errors.productionCost && (
            <ErrorText>
              <AlertCircle size={14} />
              {errors.productionCost}
            </ErrorText>
          )}
        </FormGroup>

        <FormGroup>
          <Label>
            <Coins size={20} />
            Labor Cost (Rs)
          </Label>
          <Input
            type="number"
            name="laborCost"
            value={values.laborCost}
            onChange={handleInputChange}
            step="any"
          />
          {errors.laborCost && (
            <ErrorText>
              <AlertCircle size={14} />
              {errors.laborCost}
            </ErrorText>
          )}
        </FormGroup>

        <FormGroup>
          <Label>
            <Coins size={20} />
            Transport Cost (Rs)
          </Label>
          <Input
            type="number"
            name="transportCost"
            value={values.transportCost}
            onChange={handleInputChange}
            step="any"
          />
          {errors.transportCost && (
            <ErrorText>
              <AlertCircle size={14} />
              {errors.transportCost}
            </ErrorText>
          )}
        </FormGroup>

        {apiError && (
          <ErrorText>
            <AlertCircle size={14} />
            {apiError}
          </ErrorText>
        )}

        <Button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading || hasErrors}
        >
          <Calculator size={24} />
          {isLoading ? 'Calculating...' : 'Calculate Profit'}
        </Button>
      </Form>

      <AnimatePresence>
        {results && (
          <Result
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ResultGrid>
              <ResultCard
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h4>
                  <DollarSign size={18} />
                  Revenue
                </h4>
                <p>
                  {formatNumber(results.revenue)}
                  <span className="unit"> Rs</span>
                </p>
              </ResultCard>

              <ResultCard
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h4>
                  <Coins size={18} />
                  Total Cost
                </h4>
                <p>
                  {formatNumber(results.totalCost)}
                  <span className="unit"> Rs</span>
                </p>
              </ResultCard>

              <ResultCard
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h4>
                  <Calculator size={18} />
                  Net Profit
                </h4>
                <p>
                  {formatNumber(results.profit)}
                  <span className="unit"> Rs</span>
                </p>
              </ResultCard>

              <ResultCard
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h4>
                  <TrendingUp size={18} />
                  ROI
                </h4>
                <p>
                  {formatNumber(results.roi)}
                  <span className="unit">%</span>
                </p>
              </ResultCard>

              <ResultCard
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h4>
                  <TrendingUp size={18} />
                  Profit Margin
                </h4>
                <p>
                  {formatNumber(results.profitMargin)}
                  <span className="unit">%</span>
                </p>
              </ResultCard>
            </ResultGrid>
          </Result>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default YieldSage;