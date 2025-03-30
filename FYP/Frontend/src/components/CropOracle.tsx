import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: #2ecc71;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 700;
`;

function CropOracle() {
  return (
    <Container>
      <SectionTitle>Crop Oracle</SectionTitle>
      {/* Implementation coming in next phase */}
    </Container>
  );
}

export default CropOracle;