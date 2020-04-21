import styled from 'styled-components';

const NavModal = styled.div`
height: 500px;
width: 500px;
display: inline-block;
position: absolute;
top: 75px;
left: 450px;
z-index: 10;
vertical-align: middle;
`;

const Title = styled.p`
z-index: 20;
font-family: Verdana, Tahoma, sans-serif;
font-weight: 100px;
font-size: 20px;
top: 5px;
left: -15px;
position: absolute;
`;

const CoverImg = styled.img`
width: 100%;
height: 100%;
padding: 25px;
padding-top: 75px;
background-color: white;
position: absolute;
top: 0px;
right: 0px;
object-fit: cover;
box-shadow: inset 0 0 0 1px rgba(0,0,0,.1);
&:hover {
  cursor: pointer;
}
`;

const LineBreak = styled.hr`
position: relative;
border: 0.5px solid #a9a9a9;
z-index: 20;
top: 50px;
left: -25px;
`;

export {
  NavModal,
  Title,
  CoverImg,
  LineBreak,
};
