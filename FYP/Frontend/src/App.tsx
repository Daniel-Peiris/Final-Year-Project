import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Search, LineChart, Book, ChevronDown, Brain, BarChart3, Database, Calculator } from 'lucide-react';
import CropOracle from './components/CropOracle';
import MarketPulse from './components/MarketPulse';
import AgroWiki from './components/AgroWiki';
import YieldSage from './components/YieldSage';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  color: #ffffff;
  overflow-x: hidden;
`;

const MainBanner = styled.div`
  height: 800px;
  background: url('https://bluebridgefinancial.com/wp-content/uploads/2025/01/AdobeStock_964332604.jpeg') center/cover no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 1rem;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 600px;
    padding: 1rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7));
    z-index: 1;
  }
`;

const BannerContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  position: relative;
  padding: 0 1rem;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 1rem;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1.2rem 3rem 1.2rem 1.5rem;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(46, 204, 113, 0.3);
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: #2ecc71;
    box-shadow: 0 0 20px rgba(46, 204, 113, 0.2);
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1rem 2.5rem 1rem 1.25rem;
  }
`;

const SearchResults = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 1rem;
  right: 1rem;
  margin-top: 0.5rem;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 15px;
  border: 1px solid rgba(46, 204, 113, 0.3);
  backdrop-filter: blur(10px);
  overflow-y: auto;
  max-height: 300px;
  z-index: 100;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  &::-webkit-scrollbar {
    width: 6px;
    background: transparent;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(46, 204, 113, 0.5);
    border-radius: 10px;

    &:hover {
      background: rgba(46, 204, 113, 0.7);
    }
  }

  scrollbar-width: thin;
  scrollbar-color: rgba(46, 204, 113, 0.5) rgba(255, 255, 255, 0.1);
`;

const SearchResult = styled(motion.div)`
  padding: 1rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(46, 204, 113, 0.2);
  }

  .crop-name {
    font-weight: 500;
  }

  .crop-type {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1.25rem;
    
    .crop-name {
      font-size: 0.95rem;
    }
    
    .crop-type {
      font-size: 0.85rem;
    }
  }
`;

const NoResults = styled.div`
  padding: 1rem 1.5rem;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
`;

const TabContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 10;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    padding: 0.75rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

interface TabProps {
  active: boolean;
}

const Tab = styled(motion.button)<TabProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: ${props => props.active ? 'rgba(46, 204, 113, 0.2)' : 'transparent'};
  border: 1px solid ${props => props.active ? '#2ecc71' : 'rgba(255,255,255,0.1)'};
  color: ${props => props.active ? '#2ecc71' : '#ffffff'};
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    padding: 0.625rem 0.875rem;
    font-size: 0.875rem;
  }

  &:hover {
    border-color: #2ecc71;
    box-shadow: 0 0 15px rgba(46, 204, 113, 0.3);
  }
`;

const ContentContainer = styled(motion.div)`
  padding: 1.5rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const InfoSection = styled.section`
  padding: 4rem 0;
  background: #0f0f0f;
  width: 100%;
  margin: 2rem 0;

  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`;

const SectionTitle = styled(motion.h2)`
  color: #2ecc71;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: linear-gradient(45deg, #2ecc71, #b8ff30);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;


  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }
`;

const Card = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(46, 204, 113, 0.2);
  transition: all 0.3s ease;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(46, 204, 113, 0.1);
  }

  svg {
    width: 48px;
    height: 48px;
    color: #2ecc71;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #2ecc71;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }
`;

const FAQ = styled.div`
  max-width: 800px;
  margin: 4rem auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    margin: 2rem auto;
  }
`;

const Question = styled.div`
  margin-bottom: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(46, 204, 113, 0.2);
  overflow: hidden;
`;

const QuestionHeader = styled.button`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.1rem;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.875rem;
  }
`;

const Answer = styled(motion.div)`
  padding: 0 1rem 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0 0.875rem 0.875rem;
  }
`;

const Footer = styled.footer`
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  text-align: center;
  border-top: 1px solid rgba(46, 204, 113, 0.2);

  @media (max-width: 768px) {
    padding: 1.5rem;
    font-size: 0.875rem;
  }
`;

const ScrollPrompt = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  transform: translateX(-50%);
  color: #2ecc71;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  z-index: 2;
  text-align: center;
  width: 100%;
  max-width: 200px;

  span {
    font-size: 1rem;
    font-weight: 500;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  svg {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;

    span {
      font-size: 0.875rem;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

interface Crop {
  name: string;
  type: string;
  sinhala: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('cropOracle');
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const crops: Crop[] = [
    { name: 'Tomatoes', type: 'Vegetable', sinhala: 'තක්කාලි' },
    { name: 'Chili', type: 'Spice', sinhala: 'මිරිස්' },
    { name: 'Cabbage', type: 'Vegetable', sinhala: 'ගෝවා' },
    { name: 'Bitter Gourd', type: 'Vegetable', sinhala: 'කරවිල' },
    { name: 'Long Beans', type: 'Legume', sinhala: 'මෑ බෝංචි' },
    { name: 'Pumpkin', type: 'Vegetable', sinhala: 'වට්ටක්කා' },
    { name: 'Eggplant', type: 'Vegetable', sinhala: 'වම්බටු' },
    { name: 'Cucumber', type: 'Vegetable', sinhala: 'පිපිඤ්ඤා' },
    { name: 'Drumstick', type: 'Vegetable', sinhala: 'මුරුංගා' }
  ];

  const filteredCrops = crops.filter(crop => 
    crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crop.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crop.sinhala.includes(searchQuery)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchFocus = () => {
    setShowResults(true);
  };

  const handleCropSelect = () => {
    setSearchQuery('');
    setShowResults(false);
    setActiveTab('agroWiki');
  };

  const tabs = [
    { id: 'cropOracle', label: 'Crop Oracle', icon: Search },
    { id: 'marketPulse', label: 'Market Pulse', icon: LineChart },
    { id: 'yieldSage', label: 'Yield Sage', icon: Calculator },
    { id: 'agroWiki', label: 'Agro Wiki', icon: Book },
  ];

  const faqs = [
    {
      question: "What is HarvestWise?",
      answer: "HarvestWise is a machine learning-powered web application that helps farmers make data-driven decisions by offering harvest predictions, market price and demand forecasting, profit margin analysis, and a detailed crop knowledge base."
    },
    {
      question: "How accurate are the market predictions?",
      answer: "Our market predictions have achieved over 85% accuracy by analyzing historical price trends, seasonal patterns, and real-time market data."
    },
    {
      question: "What features does HarvestWise offer?",
      answer: "HarvestWise includes four key features: harvest prediction, market price and demand forecasting, profit margin analysis, and a comprehensive crop knowledge base."
    },
    {
      question: "Can I use HarvestWise for any crop?",
      answer: "Currently, HarvestWise supports a wide range of commonly grown crops in Sri Lanka. We are continuously expanding our database to include more crops based on user demand."
    },
    {
      question: "Is HarvestWise easy to use?",
      answer: "Yes, the platform is designed with a simple and intuitive interface to make it accessible for farmers with varying levels of tech knowledge."
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'cropOracle':
        return <CropOracle />;
      case 'yieldSage':
        return <YieldSage />;
      case 'marketPulse':
        return <MarketPulse />;
      case 'agroWiki':
        return <AgroWiki />;
      default:
        return null;
    }
  };

  return (
    <AppContainer>
      <MainBanner>
        <BannerContent>
          <motion.h1
            className="text-5xl font-bold text-center bg-gradient-to-r from-[#2ecc71] to-[#b8ff30] bg-clip-text text-transparent mb-4 flex flex-col items-center gap-4 md:text-4xl sm:text-3xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Sprout size={64} className="text-[#2ecc71] mb-2" />
            Harvest Wise
          </motion.h1>
          <motion.p
            className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed mb-8 md:text-lg sm:text-base px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Revolutionizing agriculture with machine learning-driven insights. Make data-informed decisions about crop selection and market timing.
          </motion.p>
          <SearchContainer ref={searchRef}>
            <SearchInput
              placeholder="Search for crops or market data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
            />
            <Search size={20} style={{ position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)', color: '#2ecc71' }} />
            <AnimatePresence>
              {showResults && searchQuery && (
                <SearchResults
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {filteredCrops.length > 0 ? (
                    filteredCrops.map((crop, index) => (
                      <SearchResult
                        key={crop.name}
                        onClick={() => handleCropSelect()}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Sprout size={20} color="#2ecc71" />
                        <div>
                          <div className="crop-name">{crop.name}</div>
                          <div className="crop-type">{crop.type} • {crop.sinhala}</div>
                        </div>
                      </SearchResult>
                    ))
                  ) : (
                    <NoResults>No crops found</NoResults>
                  )}
                </SearchResults>
              )}
            </AnimatePresence>
          </SearchContainer>
        </BannerContent>
        <ScrollPrompt
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
        >
          <span>Explore More</span>
          <ChevronDown size={24} />
        </ScrollPrompt>
      </MainBanner>

      <TabContainer>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <tab.icon size={20} />
            {tab.label}
          </Tab>
        ))}
      </TabContainer>

      <ContentContainer>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        <InfoSection>
        <SectionTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Why Choose Us
          </SectionTitle>
          <Grid>
            <Card>
              <Brain />
              <h3>ML - Driven Insights</h3>
              <p>Advanced machine learning algorithms deliver accurate recommendations to support optimal crop management and planning.</p>
            </Card>
            <Card>
              <BarChart3 />
              <h3>Real - time Analytics</h3>
              <p>Track real-time market trends and weather conditions to make smarter, timely farming decisions.</p>
            </Card>
            <Card>
              <Database />
              <h3>Comprehensive Knowledge</h3>
              <p>Explore a rich database of agricultural best practices and crop-specific guidance tailored for effective farming.</p>
            </Card>
          </Grid>
        </InfoSection>

        <FAQ>
          <SectionTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </SectionTitle>
          {faqs.map((faq, index) => (
            <Question key={index}>
              <QuestionHeader onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}>
                {faq.question}
                <ChevronDown
                  size={20}
                  style={{
                    transform: activeQuestion === index ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </QuestionHeader>
              <AnimatePresence>
                {activeQuestion === index && (
                  <Answer
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    {faq.answer}
                  </Answer>
                )}
              </AnimatePresence>
            </Question>
          ))}
        </FAQ>
      </ContentContainer>

      <Footer>
        <p>© 2025 HarvestWise. Created by Daniel Peiris. All rights reserved.</p>
      </Footer>
    </AppContainer>
  );
}

export default App;