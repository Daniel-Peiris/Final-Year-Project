import React, { useState, useEffect, FormEvent } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, MapPin, Mountain, Ruler, Calculator, Leaf, Search } from 'lucide-react';

const Container = styled.div`
  padding: 2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  color: #2ecc71;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  svg {
    color: #2ecc71;
  }
`;

const Form = styled(motion.form)`
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(46, 204, 113, 0.2);
  box-shadow: 0 4px 30px rgba(46, 204, 113, 0.1);
  backdrop-filter: blur(5px);
`;

const FormGroup = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(46, 204, 113, 0.1);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(46, 204, 113, 0.3);
    box-shadow: 0 0 15px rgba(46, 204, 113, 0.1);
    transform: translateY(-2px);
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);

  svg {
    color: #2ecc71;
  }
`;

const Select = styled.select`
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(46, 204, 113, 0.3);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2ecc71;
    box-shadow: 0 0 10px rgba(46, 204, 113, 0.2);
  }

  option {
    background: #1a1a1a;
    color: white;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(46, 204, 113, 0.3);
  border-radius: 8px;
  color: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2ecc71;
    box-shadow: 0 0 10px rgba(46, 204, 113, 0.2);
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
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
  gap: 0.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
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

  h3 {
    color: #2ecc71;
    font-size: 1.8rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  p {
    color: white;
    font-size: 3rem;
    font-weight: 700;
    text-shadow: 0 0 10px rgba(46, 204, 113, 0.5);
  }

  .unit {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.7);
    margin-left: 0.5rem;
  }
`;

const LeafDecoration = styled(motion.div)`
  position: absolute;
  color: rgba(46, 204, 113, 0.2);
`;

const formAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const CropOracle: React.FC = () => {
  const crops: string[] = [
    "Tomatoes",
    "Chili",
    "Cabbage",
    "Bitter Gourd",
    "Long Beans",
    "Pumpkin",
    "Eggplant",
    "Cucumber",
    "Drumstick",
  ];
  const provinces: string[] = ["Western", "Central", "Southern", "Northern", "Eastern"];
  const districtsByProvince: { [key: string]: string[] } = {
    "Western": ["Colombo", "Gampaha", "Kalutara"],
    "Central": ["Kandy", "Matale", "Nuwara Eliya"],
    "Southern": ["Galle", "Matara", "Hambantota"],
    "Northern": ["Jaffna", "Kilinochchi", "Mullaitivu"],
    "Eastern": ["Trincomalee", "Batticaloa", "Ampara"]
  };
  const landscapes: string[] = ["Flat Land", "Hillside", "Valley", "Coastal"];

  const [selectedCrop, setSelectedCrop] = useState<string>(crops[0]);
  const [selectedProvince, setSelectedProvince] = useState<string>(provinces[0]);
  const [districts, setDistricts] = useState<string[]>(districtsByProvince[provinces[0]]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(districtsByProvince[provinces[0]][0]);
  const [selectedLandscape, setSelectedLandscape] = useState<string>(landscapes[0]);
  const [size, setSize] = useState<number>(1000);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const newDistricts = districtsByProvince[selectedProvince];
    setDistricts(newDistricts);
    setSelectedDistrict(newDistricts[0]);
  }, [selectedProvince]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setPrediction(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const simulatedPrediction = Math.round(size * (Math.random() * 0.5 + 0.5));
    setPrediction(simulatedPrediction);
    setIsCalculating(false);
  };

  return (
    <Container>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Search size={52} />
        Crop Oracle
        
      </SectionTitle>

      <Form
        variants={formAnimation}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
      >
        <FormGroup variants={itemAnimation}>
          <Label>
            <Sprout size={20} />
            Select Crop:
            <Select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)}>
              {crops.map((crop) => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </Select>
          </Label>
        </FormGroup>

        <FormGroup variants={itemAnimation}>
          <Label>
            <MapPin size={20} />
            Select Province:
            <Select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
              {provinces.map((province) => (
                <option key={province} value={province}>{province}</option>
              ))}
            </Select>
          </Label>
        </FormGroup>

        <FormGroup variants={itemAnimation}>
          <Label>
            <MapPin size={20} />
            Select District:
            <Select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
              {districts.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </Select>
          </Label>
        </FormGroup>

        <FormGroup variants={itemAnimation}>
          <Label>
            <Mountain size={20} />
            Select Landscape:
            <Select value={selectedLandscape} onChange={(e) => setSelectedLandscape(e.target.value)}>
              {landscapes.map((landscape) => (
                <option key={landscape} value={landscape}>{landscape}</option>
              ))}
            </Select>
          </Label>
        </FormGroup>

        <FormGroup variants={itemAnimation}>
          <Label>
            <Ruler size={20} />
            Land Size (sqm):
            <Input
              type="number"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min="100"
              step="100"
            />
          </Label>
        </FormGroup>

        <Button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isCalculating}
        >
          <Calculator size={24} />
          {isCalculating ? 'Calculating...' : 'Calculate Harvest Prediction'}
        </Button>
      </Form>

      <AnimatePresence mode="wait">
        {prediction !== null && (
          <Result
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            {[...Array(4)].map((_, i) => (
              <LeafDecoration
                key={i}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                <Leaf size={24} />
              </LeafDecoration>
            ))}
            <h3>Predicted Harvest</h3>
            <motion.p
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {prediction.toLocaleString()}
              <span className="unit">kg</span>
            </motion.p>
          </Result>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default CropOracle;