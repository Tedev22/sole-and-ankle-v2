import React from 'react';
import styled from 'styled-components';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant=='on-sale' && <SaleFlag>Sale</SaleFlag>}
          {variant=='new-release' && <JustReleasedFlag>Just Released</JustReleasedFlag>}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <PriceWrapper>
            <Price
            style= {{
              '--color': variant === 'on-sale' && COLORS.gray[700],
              '--text-decoration': variant === 'on-sale' && 'line-through'
            }}
            >{formatPrice(price)}</Price>
            {variant=='on-sale' && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
          </PriceWrapper>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  display: flex;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div` 
position: relative; 
`;

const Image = styled.img`
 width: 100%;
 border-radius: 8px 8px 4px 4px;;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;
const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const SaleFlag = styled.div`
  background-color: ${COLORS.primary};
  color: white; 
  padding: 3px 10px; 
  position: absolute;
  top: 5px; 
  right: -5px;
  border-radius: 2px;
`;

const JustReleasedFlag = styled.div`
  background-color: ${COLORS.secondary};
  color: white; 
  padding: 3px 10px; 
  position: absolute;
  top: 5px; 
  right: -5px;
  border-radius: 2px;
`;

export default ShoeCard;
