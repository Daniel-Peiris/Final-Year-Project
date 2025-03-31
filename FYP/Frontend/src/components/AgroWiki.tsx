import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ArrowLeft, Book } from 'lucide-react';

const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
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

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  perspective: 1000px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Card = styled(motion.div)`
  position: relative;
  height: 320px;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.6s;

  @media (max-width: 768px) {
    height: 280px;
  }

  @media (max-width: 480px) {
    height: 240px;
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
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardFront = styled(CardFace)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px 15px 0 0;

  @media (max-width: 768px) {
    height: 160px;
  }

  @media (max-width: 480px) {
    height: 140px;
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: #2ecc71;
  margin: 1rem 0;
  text-align: center;
  font-weight: 700;
  

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin: 0.75rem 0;
  }

  @media (max-width: 480px) {
    font-size: 1.125rem;
    margin: 0.5rem 0;
  }
`;

const SubTitle = styled.h4`
  font-size: 1.2rem;
  color: #b8ff30;
  margin-top: 1rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-top: 0.875rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-top: 0.75rem;
  }
`;

const BlogView = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const NavigationBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 8px;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    padding: 0.75rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;
    padding: 0.5rem;
  }
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  background: rgba(46, 204, 113, 0.2);
  border: 1px solid #2ecc71;
  color: #2ecc71;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: rgba(46, 204, 113, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.875rem;
    font-size: 0.8125rem;
  }
`;

const ContentSection = styled.div`
  margin-bottom: 2rem;

  p {
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;

    p {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 1.25rem;

    p {
      font-size: 0.875rem;
    }
  }
`;

const DetailImage = styled(Image)`
  height: 400px;
  margin-bottom: 2rem;
  border-radius: 15px;

  @media (max-width: 768px) {
    height: 300px;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    height: 200px;
    margin-bottom: 1rem;
  }
`;

interface CropContent {
  growing: string;
  soil: string;
  season: string;
  duration: string;
  care: string;
  diseases: string;
  tips?: string;
}

interface Crop {
  name: string;
  sinhala: string;
  image: string;
  content: CropContent;
}

function AgroWiki() {
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);

  const crops: Crop[] = [
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

  if (selectedCrop) {
    return (
      <BlogView>
        <NavigationBar>
          <NavButton onClick={() => setSelectedCrop(null)}>
            <ArrowLeft size={20} />
            Back to Crops
          </NavButton>
        </NavigationBar>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DetailImage src={selectedCrop.image} alt={selectedCrop.name} />
          <Title>{selectedCrop.name} ({selectedCrop.sinhala})</Title>
          
          <ContentSection>
            <SubTitle>How to Grow</SubTitle>
            <p>{selectedCrop.content.growing}</p>
          </ContentSection>

          <ContentSection>
            <SubTitle>Soil Requirements</SubTitle>
            <p>{selectedCrop.content.soil}</p>
          </ContentSection>

          <ContentSection>
            <SubTitle>Growing Season</SubTitle>
            <p>{selectedCrop.content.season}</p>
          </ContentSection>

          <ContentSection>
            <SubTitle>Time to Harvest</SubTitle>
            <p>{selectedCrop.content.duration}</p>
          </ContentSection>

          <ContentSection>
            <SubTitle>Care Instructions</SubTitle>
            <p>{selectedCrop.content.care}</p>
          </ContentSection>

          <ContentSection>
            <SubTitle>Common Diseases</SubTitle>
            <p>{selectedCrop.content.diseases}</p>
          </ContentSection>

          {selectedCrop.content.tips && (
            <ContentSection>
              <SubTitle>Additional Tips</SubTitle>
              <p>{selectedCrop.content.tips}</p>
            </ContentSection>
          )}
        </motion.div>
      </BlogView>
    );
  }

  return (
    <Container>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Book size={50} />
        Agro Wiki
      </SectionTitle>

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