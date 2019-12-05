import React from 'react';
import styled from 'styled-components';

const SongTime = styled.span`
font-size: 10px;
color: #ccc;
background-color: rgba(0,0,0,0.8);
width: 28px;
text-align: center;
position: absolute;
top: 60px;
`;

const SongEnd = styled(SongTime)`
right: 0;
`;

const SongProgression = styled.div`
position: relative;
width: 0px;
height: 2px;
left: 0;
top: 50px;
background-color: white;
`;

const Audio = ({ link, began, progress, duration, handleProgression }) => {
  return (
   <div>
     <audio src={link} onTimeUpdate={handleProgression}>our browser does not support the audio element.</audio>
     {began ? <SongTime>{progress}</SongTime> : ''}
     <SongEnd>
       {`${Math.floor(duration / 60)}:${(60 * ((duration / 60) - Math.floor(duration / 60))).toString().substring(0, 2)}`}
     </SongEnd>
     <SongProgression className="songProgression" />
   </div>
  );
};

export default Audio;
