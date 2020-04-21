import React from 'react';
import Moment from 'moment';
import { NavRight, SongImg, NavInfo, Posted, Genre } from './styles/InfoRightStyles.jsx';

const InfoRight = ({ photo, posted, genre, handlePhotoCoverClick }) => {
  return (
    <NavRight>
      <SongImg src={photo} className="cover" alt="song-cover" onClick={handlePhotoCoverClick} />
      <NavInfo>
        <Posted>{Moment(posted).fromNow()}</Posted>
        <Genre>{`# ${genre}`}</Genre>
      </NavInfo>
    </NavRight>
  );
};

export default InfoRight;
