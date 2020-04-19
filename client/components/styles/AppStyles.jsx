import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*:focus {
  outline: none;
}

body {
  font-family: Verdana, Tahoma, sans-serif;
  font-weight: 100;
}
`;

const Nav = styled.div`
width: 1240px;
height: 380px;
position: relative;
margin: auto;
top: 40px;
right: 0;
bottom: 0;
left: 0;
box-sizing: border-box;
padding: 30px 560px 20px 30px;
opacity: 0.9;
`;

const PlayButton = styled.button`
background-image: url(https://kleiomainplayer.s3-us-west-1.amazonaws.com/play.png);
background-color: transparent;
background-size: 100%;
background-repeat: no-repeat;
width: 70px;
height: 70px;
border: none;
position: relative;
right: 5px;
bottom: 5px;
`;

const NavMusic = styled.div`
width: 820px;
height: 100px;
position: absolute;
bottom: 40px;
`;

export {
  GlobalStyle,
  Nav,
  PlayButton,
  NavMusic,
};
