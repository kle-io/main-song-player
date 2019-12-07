import React from 'react';
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

const SongProgression = styled.div`
position: relative;
width: 0px;
height: 2px;
left: 0;
top: 47px;
background-color: white;
`;

const Audio = ({ link, began, progress, duration, handleProgression }) => {
  const min = Math.floor(duration / 60);
  let sec = Math.floor(60 * ((duration / 60) - min));
  if (sec.toString().length === 1) {
    sec = `0${sec}`;
  }
  return (
   <div>
     <audio src={link} onTimeUpdate={handleProgression}>our browser does not support the audio element.</audio>
     {began ? <SongTime>{progress}</SongTime> : ''}
     <SongEnd>{`${min}:${sec}`}</SongEnd>
     <SongProgression className="songProgression" />
   </div>
  );
};

export default Audio;
