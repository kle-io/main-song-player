import React from 'react';
import styled from 'styled-components';

const NavLeft = styled.div`
width: 575px;
height: 68px;
position: relative;
left: 75px;
bottom: 75px;
`;

const Artist = styled.a`
font-size: 16px;
color: #ccc;
background-color: rgba(0,0,0,0.8);
padding: 4px 4px;
position: absolute;
box-sizing: content-box;
`;

const Title = styled.span`
font-size: 24px;
color: white;
background-color: rgba(0,0,0,0.8);
padding: 4px 5px;
position: absolute;
box-sizing: content-box;
bottom: 0px;
left: 0;
`;

const InfoLeft = ({ artist, title }) => {
  return (
    <NavLeft>
      <Artist>{artist}</Artist>
      <Title>{title}</Title>
    </NavLeft>
  );
};

export default InfoLeft;
