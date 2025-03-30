import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

const Container = styled.div`
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  color: #2ecc71;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 700;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  perspective: 1000px;
`;

const Card = styled(motion.div)`
  position: relative;
  height: 320px;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.6s;

  &.flipped {
    transform: rotateY(180deg);
  }
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  background: rgba(46, 204, 113, 0.1);
  border: 1px solid rgba(46, 204, 113, 0.3);
  box-shadow: 0 0 20px rgba(46, 204, 113, 0.2);
  overflow: hidden;
`;

const CardFront = styled(CardFace)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  overflow: auto;
  padding: 1.5rem;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px 15px 0 0;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: #2ecc71;
  margin: 1rem 0;
  text-align: center;
  font-weight: 700;
`;

const SubTitle = styled.h4`
  font-size: 1.2rem;
  color: #b8ff30;
  margin-top: 1rem;
  font-weight: 700;
`;

const BlogView = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const NavigationBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background: rgba(46, 204, 113, 0.2);
  border: 1px solid #2ecc71;
  color: #2ecc71;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(46, 204, 113, 0.3);
    box-shadow: 0 0 10px rgba(46, 204, 113, 0.3);
  }
`;

const crops = [
  {
    name: 'Tomatoes',
    sinhala: 'තක්කලි',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    content: {
      growing: 'Start seeds indoors 6-8 weeks before last frost. Plant in well-draining soil with full sun exposure.',
      soil: 'Well-draining, slightly acidic soil (pH 6.0-6.8). Rich in organic matter.',
      season: 'Best planted in early spring for summer harvest.',
      duration: '60-80 days to maturity',
      care: 'Regular watering, support with cages or stakes, prune suckers for indeterminate varieties.',
      diseases: 'Blight, Fusarium Wilt, Bacterial Spot, Septoria Leaf Spot'
    }
  },
  {
    name: 'Chili',
    sinhala: 'මිරිස්',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    content: {
      growing: 'Start seeds indoors 8-10 weeks before last frost. Requires warm soil and full sun.',
      soil: 'Well-draining, fertile soil with pH 6.0-7.0',
      season: 'Plant in spring after all frost danger has passed',
      duration: '60-90 days to maturity',
      care: 'Consistent watering, avoid overwatering. Support may be needed for larger varieties.',
      diseases: 'Bacterial Leaf Spot, Powdery Mildew, Anthracnose'
    }
  },
  {
    name: 'Cabbage',
    sinhala: 'ගෝවා',
    image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    content: {
      growing: 'Start seeds indoors 4-6 weeks before last frost. Transplant when seedlings have 4-5 true leaves.',
      soil: 'Rich, well-draining soil with pH 6.0-6.8. High in organic matter.',
      season: 'Spring or fall crop, tolerates cool weather',
      duration: '70-120 days to maturity',
      care: 'Regular watering, mulch to retain moisture, watch for pests',
      diseases: 'Club Root, Black Rot, Downy Mildew'
    }
  },
  {
    name: 'Bitter Gourd',
    sinhala: 'කරවිල',
    image: 'https://drvaidji.com/cdn/shop/articles/Bitter_Melon_1024x1024_37ab9838-93f6-4c88-83b4-508443174b78.jpg?v=1699514225',
    content: {
      growing: 'Direct sow or transplant after soil warms. Needs trellising support.',
      soil: 'Well-draining, fertile soil with pH 6.0-6.8',
      season: 'Warm season crop, plant in spring',
      duration: '55-70 days to maturity',
      care: 'Regular watering, provide climbing support, prune for better yield',
      diseases: 'Powdery Mildew, Mosaic Virus, Leaf Spot'
    }
  },
  {
    name: 'Long Beans',
    sinhala: 'මෑ කරල්',
    image: 'https://www.simplyrecipes.com/thmb/w3O3iG6yaLoYICopMOqkc19_hg0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2010__10__chinese-long-beans-horiz-c-1200-ea6ba302f1f8445b9dfdd9b55f0cc7ec.jpg',
    content: {
      growing: 'Direct sow seeds 1 inch deep and 4 inches apart. Provide strong trellising system at least 6-8 feet tall. Seeds germinate in 5-7 days.',
      soil: 'Well-draining, fertile soil with pH 6.0-7.0. Add compost before planting. Prefers loamy soil rich in organic matter.',
      season: 'Plant in late spring when soil temperature reaches 68°F (20°C). Thrives in hot weather.',
      duration: '60-75 days to maturity. Can produce continuously for several months.',
      care: 'Regular deep watering, especially during flowering and pod formation. Mulch to retain moisture and suppress weeds. Train vines on trellis early.',
      diseases: 'Bean Rust, Bacterial Blight, Root Rot, Mosaic Virus, Anthracnose',
      tips: 'Harvest pods when young and tender (12-18 inches long). Regular harvesting encourages continued production. Avoid overhead watering to prevent disease.'
    }
  },
  {
    name: 'Pumpkin',
    sinhala: 'වට්ටක්කා',
    image: 'https://images.unsplash.com/photo-1569976710208-b52636b52c09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    content: {
      growing: 'Direct sow after soil warms. Needs plenty of space.',
      soil: 'Rich, well-draining soil with pH 6.0-6.8',
      season: 'Warm season crop, plant in late spring',
      duration: '85-120 days to maturity',
      care: 'Regular deep watering, mulch soil, watch for pests',
      diseases: 'Powdery Mildew, Bacterial Wilt, Vine Borers'
    }
  },
  {
    name: 'Eggplant',
    sinhala: 'වම්බටු',
    image: 'https://www.treehugger.com/thmb/K0v7mj-MTjEpIENA1hyCoFcfCOk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2018__06__eggplant-3e0f0e053ba4479d864b97d5c8a2b762.jpg',
    content: {
      growing: 'Start indoors 8-10 weeks before last frost. Needs warm soil.',
      soil: 'Rich, well-draining soil with pH 6.0-7.0',
      season: 'Warm season crop, plant after all frost danger',
      duration: '65-80 days to maturity',
      care: 'Regular watering, support plants, prune for larger fruits',
      diseases: 'Verticillium Wilt, Blight, Fruit Rot'
    }
  },
  {
    name: 'Cucumber',
    sinhala: 'පිපිඤ්ඤා',
    image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    content: {
      growing: 'Direct sow after soil warms. Can be trellised to save space.',
      soil: 'Rich, well-draining soil with pH 6.0-7.0',
      season: 'Warm season crop, plant in late spring',
      duration: '50-70 days to maturity',
      care: 'Consistent moisture, mulch soil, harvest frequently',
      diseases: 'Powdery Mildew, Angular Leaf Spot, Bacterial Wilt'
    }
  },
  {
    name: 'Green Leaves',
    sinhala: 'ගොටුකොළ, මුකුණුවැන්න, තම්පලා',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    content: {
      growing: 'Direct sow or transplant. Quick growing crops.',
      soil: 'Moist, well-draining soil with pH 6.0-7.0',
      season: 'Year-round in tropical climates',
      duration: '30-45 days to maturity',
      care: 'Regular watering, organic fertilizer, succession planting',
      diseases: 'Leaf Spot, Downy Mildew, Root Rot'
    }
  },
  {
    name: 'Drumstick',
    sinhala: 'මුරුංගා',
    image: 'https://eastindianrecipes.net/wp-content/uploads/2021/09/Drumstick-Foogath-Sauteed-Moringa-veggies7.jpg',
    content: {
      growing: 'Direct seed or propagate from cuttings. Fast-growing tree.',
      soil: 'Well-draining soil, tolerates poor soil',
      season: 'Year-round in tropical climates',
      duration: '6-8 months for first harvest',
      care: 'Minimal water once established, annual pruning',
      diseases: 'Root Rot, Leaf Spot, Stem Canker'
    }
  }
];

function AgroWiki() {
  const [selectedCrop, setSelectedCrop] = useState(null);

  if (selectedCrop) {
    return (
      <BlogView>
        <NavigationBar>
          <NavButton onClick={() => setSelectedCrop(null)}>
            <ArrowLeft size={20} />
            Back
          </NavButton>
          <NavButton>
            <Home size={20} />
            Home
          </NavButton>
        </NavigationBar>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image src={selectedCrop.image} alt={selectedCrop.name} style={{ height: '400px' }} />
          <Title>{selectedCrop.name} ({selectedCrop.sinhala})</Title>
          
          <SubTitle>How to Grow</SubTitle>
          <p>{selectedCrop.content.growing}</p>

          <SubTitle>Soil Requirements</SubTitle>
          <p>{selectedCrop.content.soil}</p>

          <SubTitle>Growing Season</SubTitle>
          <p>{selectedCrop.content.season}</p>

          <SubTitle>Time to Harvest</SubTitle>
          <p>{selectedCrop.content.duration}</p>

          <SubTitle>Care Instructions</SubTitle>
          <p>{selectedCrop.content.care}</p>

          <SubTitle>Common Diseases</SubTitle>
          <p>{selectedCrop.content.diseases}</p>

          {selectedCrop.content.tips && (
            <>
              <SubTitle>Additional Tips</SubTitle>
              <p>{selectedCrop.content.tips}</p>
            </>
          )}
        </motion.div>
      </BlogView>
    );
  }

  return (
    <Container>
      <SectionTitle>Knowledge Base</SectionTitle>
      <CardGrid>
        {crops.map((crop) => (
          <Card
            key={crop.name}
            onClick={() => setSelectedCrop(crop)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CardFront>
              <Image src={crop.image} alt={crop.name} />
              <Title>{crop.name}</Title>
              <p>{crop.sinhala}</p>
            </CardFront>
          </Card>
        ))}
      </CardGrid>
    </Container>
  );
}

export default AgroWiki;