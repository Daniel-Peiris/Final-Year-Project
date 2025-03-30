import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Search, Map, LineChart, Book, ChevronDown, Brain, BarChart3, Database } from 'lucide-react';
import CropOracle from './components/CropOracle';
import SoilSynapse from './components/SoilSynapse';
import MarketPulse from './components/MarketPulse';
import AgroWiki from './components/AgroWiki';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  color: #ffffff;
`;

const MainBanner = styled.div`
  height: 800px;
  background: url('https://www.agrirs.co.uk/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMXF2UWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--d74a2c1ac2f7b21112d3805d64c0dcb98fc57c59/iStock-1346294867.jpg') center/cover no-repeat;
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

const VideoBg = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.6;
  mix-blend-mode: overlay;
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
  padding: 1rem 1.5rem;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(46, 204, 113, 0.3);
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2ecc71;
    box-shadow: 0 0 20px rgba(46, 204, 113, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.875rem 1.25rem;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #2ecc71;

  @media (max-width: 768px) {
    right: 2rem;
  }
`;

const Banner = styled(motion.div)`
  height: 300px;
  background: linear-gradient(45deg, #2ecc71, #b8ff30);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 200px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transform: translateX(-100%);
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background: #f0f0f;
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 10;
  margin-top: 1rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    padding: 0.75rem;
    gap: 0.5rem;
  }
`;

const Tab = styled(motion.button)<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background: ${props => props.active ? 'rgba(46, 204, 113, 0.2)' : 'transparent'};
  border: 1px solid ${props => props.active ? '#2ecc71' : 'rgba(255,255,255,0.1)'};
  color: ${props => props.active ? '#2ecc71' : '#ffffff'};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  &:hover {
    border-color: #2ecc71;
    box-shadow: 0 0 15px rgba(46, 204, 113, 0.3);
  }
`;

const ContentContainer = styled(motion.div)`
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(45deg, #2ecc71, #b8ff30);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 800px;
  margin: 1rem auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1rem;
  }
`;

const InfoSection = styled.section`
  padding: 4rem 0;
  background: #0f0f0f;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -51vw;
  margin-right: -49vw;
  margin-top: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 2rem 0;
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

  @media (max-width: 768px) {
    font-size: 0.875rem;
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
  left: 50%;
  transform: translateX(-50%);
  color: #2ecc71;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  z-index: 2;

  @media (max-width: 768px) {
    bottom: 1.5rem;
  }
`;

function App() {
  const [activeTab, setActiveTab] = useState('cropOracle');
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const tabs = [
    { id: 'cropOracle', label: 'Crop Oracle', icon: Search },
    { id: 'soilSynapse', label: 'Soil Synapse', icon: Map },
    { id: 'marketPulse', label: 'Market Pulse', icon: LineChart },
    { id: 'agroWiki', label: 'Agro Wiki', icon: Book },
  ];

  const faqs = [
    {
      question: "How does HarvestWise's AI work?",
      answer: "Our AI system analyzes historical crop data, weather patterns, and market trends to provide accurate predictions and recommendations for optimal farming practices."
    },
    {
      question: "What kind of data does Soil Synapse use?",
      answer: "Soil Synapse combines satellite imagery, soil sensor data, and historical agricultural records to provide detailed insights about soil health and composition."
    },
    {
      question: "How accurate are the market predictions?",
      answer: "Our market predictions have achieved over 85% accuracy by analyzing historical price trends, seasonal patterns, and real-time market data."
    }
  ];

  const scrollToContent = () => {
    window.scrollTo({
      top: 800,
      behavior: 'smooth'
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'cropOracle':
        return <CropOracle />;
      case 'soilSynapse':
        return <SoilSynapse />;
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
          <Title
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Sprout size={48} style={{ display: 'inline', marginRight: '1rem' }} />
            Harvest Wise
          </Title>
          <Subtitle
            as={motion.p}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Revolutionizing agriculture with AI-driven insights. Make data-informed decisions
            about crop selection, soil management, and market timing.
          </Subtitle>
          <SearchContainer>
            <SearchInput placeholder="Search for crops, soil types, or market data..." />
            <SearchIcon size={20} />
          </SearchContainer>
        </BannerContent>
        <ScrollPrompt
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={scrollToContent}
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
          <Title as="h2" style={{ fontSize: '2.5rem', marginBottom: '3rem', color: '#ffffff' }}>
            Why Choose HarvestWise?
          </Title>
          <Grid>
            <Card>
              <Brain />
              <h3 style={{ color: '#2ecc71', marginBottom: '1rem', fontSize: '1.5rem', textAlign: 'center' }}>
                AI-Powered Insights
              </h3>
              <p>Advanced machine learning algorithms provide precise recommendations for optimal crop management.</p>
            </Card>
            <Card>
              <BarChart3 />
              <h3 style={{ color: '#2ecc71', marginBottom: '1rem', fontSize: '1.5rem', textAlign: 'center' }}>
                Real-time Analytics
              </h3>
              <p>Monitor market trends, weather patterns, and soil conditions in real-time for informed decision-making.</p>
            </Card>
            <Card>
              <Database />
              <h3 style={{ color: '#2ecc71', marginBottom: '1rem', fontSize: '1.5rem', textAlign: 'center' }}>
                Comprehensive Knowledge
              </h3>
              <p>Access our extensive database of agricultural best practices and crop-specific guidance.</p>
            </Card>
          </Grid>
        </InfoSection>

        <FAQ>
          <Title as="h2" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
            Frequently Asked Questions
          </Title>
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
        <p>© 2024 HarvestWise. Created by Daniel Peiris. All rights reserved.</p>
      </Footer>
    </AppContainer>
  );
}

export default App;