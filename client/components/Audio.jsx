import React from 'react';
import { SongTime, SongEnd } from './styles/AudioStyles.jsx';

const Audio = ({ link, began, progress, duration, handleProgression }) => {
  // calculate min and sec for duration of song
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
   </div>
  );
};

export default Audio;
