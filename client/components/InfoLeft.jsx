import React from 'react';
import { NavLeft, Artist, Title } from './styles/InfoLeftStyles.jsx';

const InfoLeft = ({ artist, title }) => {
  return (
    <NavLeft>
      <Artist>{artist}</Artist>
      <Title>{title}</Title>
    </NavLeft>
  );
};

export default InfoLeft;
