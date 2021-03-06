import styled from 'styled-components';

const NavLeft = styled.div`
width: 575px;
height: 68px;
position: relative;
left: 70px;
bottom: 75px;
`;

const Artist = styled.a`
font-size: 16px;
color: #ccc;
background-color: rgba(0,0,0,0.8);
padding: 4px 4px;
position: absolute;
box-sizing: content-box;
&:hover {
  color: white;
  cursor: pointer;
}
`;

const Title = styled.span`
position: absolute;
display: inline;
font-size: 24px;
color: white;
background-color: rgba(0,0,0,0.8);
padding: 4px 5px;
box-sizing: content-box;
max-width: 575px;
top: 32px;
`;

export {
  NavLeft,
  Artist,
  Title,
};
