import React from 'react';
import { NavModal, Title, LineBreak, CoverImg} from './styles/CoverModalStyles.jsx';

const CoverModal = ({ photo, title, handleClickOutside }) => {
  return (
    <NavModal onClick={handleClickOutside}>
      <Title>{title}</Title>
      <LineBreak />
      <CoverImg src={photo} alt="song-cover-close-up"/>
    </NavModal>
  )
}

export default CoverModal;
