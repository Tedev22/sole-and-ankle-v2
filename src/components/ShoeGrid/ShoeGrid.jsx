import React from 'react';
import styled from 'styled-components';

import SHOES from '../../data';
import ShoeCard from '../ShoeCard';

const ShoeGrid = () => {
  return (
    <Wrapper>
      {SHOES.map((shoe) => (
        <CardWrapper key={shoe.slug}>
          <ShoeCard  {...shoe} />
        </CardWrapper>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px; 

`;

const CardWrapper = styled.div`
min-width: 240px; 
flex: 1;  
`;

export default ShoeGrid;
