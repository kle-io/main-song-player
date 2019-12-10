import React from 'react';
import Moment from 'moment';
import styled from 'styled-components';

const NavRight = styled.div`
height: 340px;
width: 340px;
display: inline-block;
position: absolute;
top: 20px;
right: 20px;
`;

const SongImg = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
box-shadow: inset 0 0 0 1px rgba(0,0,0,.1);
&:hover {
  cursor: pointer;
}
`;

const NavInfo = styled.div`
width: 150px;
height: 68px;
margin-right: 0;
margin-left: auto;
position: relative;
right: 370px;
bottom: 338px;
`;

const Posted = styled.span`
position: absolute;
right: 0;
font-size: 16px;
color: white;
`;

const Genre = styled.a`
font-size: 15px;
color: white;
border-radius: 15px;
padding: 3px 7px;
background-color: #999999ba;
text-align: left;
position: absolute;
right: 0;
bottom: 0;
max-width: 150px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
&:hover {
  background-color: #333333ba;
  cursor: pointer;
}
`;

const InfoRight = ({ photo, posted, genre }) => {
  return (
    <NavRight>
      <SongImg src={photo} className="cover" alt="song-cover" />
      <NavInfo>
        <Posted>{Moment(posted).fromNow()}</Posted>
        <Genre>{`# ${genre}`}</Genre>
      </NavInfo>
    </NavRight>
  );
};

export default InfoRight;
