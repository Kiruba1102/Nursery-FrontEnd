import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.div`
  /* Add your section-level styles here */
`;

const CardContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex; /* Display as flex container */
  flex-direction: column; /* Display children in a column */
  align-items: center; /* Center items horizontally */
  max-width: 200px; /* Limit maximum width of each card */
`;

const ProductImage = styled.img`
  width: 100%; /* Take full width of the container */
  max-height: 200px;
  object-fit: cover;
  height:255px;
`;

const ProductName = styled.h3`
  font-size: 18px;
  margin: 8px 0;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  color: #007bff;
`;

const products = [
  {
    name: 'Moon Shine',
    image: 'https://www.ugaoo.com/cdn/shop/files/DSC_1062.jpg?v=1695723058&width=375',
    price: '₹399',
  },
  {
    name: 'Jew with pot',
    image: 'https://www.ugaoo.com/cdn/shop/files/1_0041efc1-9511-4917-9825-019f31118568.jpg?v=1709643216&width=375',
    price: '₹299',
  },
  {
    name: 'Taiwan Rugmini',
    image: 'https://www.ugaoo.com/cdn/shop/products/Krish12Planter-Red_e9c0e1a8-6bda-4167-80c4-287969098a81.jpg?v=1706610339&width=375',
    price: '₹349',
  },
  {
    name: 'Futra Leaf',
    image: 'https://www.ugaoo.com/cdn/shop/files/XL-022.jpg?v=1708075287&width=375',
    price: '₹499',
  },
  {
    name: 'Netted Ficus',
    image: 'https://www.ugaoo.com/cdn/shop/files/XL-019.jpg?v=1708075218&width=375',
    price: '₹199',
  },
];

const TopProductsSection = () => {
  return (
    <SectionContainer>
      <h1>Our Top Products</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {products.map((product, index) => (
          <CardContainer key={index}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price}</ProductPrice>
          </CardContainer>
        ))}
      </div>
    </SectionContainer>
  );
};

export default TopProductsSection;
