import styled from 'styled-components';

const SongTime = styled.span`
font-size: 10px;
color: #ccc;
background-color: rgba(0,0,0,0.8);
width: 28px;
text-align: center;
position: absolute;
top: 36px;
z-index: 10;
`;

const SongEnd = styled(SongTime)`
right: 0;
`;

export {
  SongTime,
  SongEnd,
};
