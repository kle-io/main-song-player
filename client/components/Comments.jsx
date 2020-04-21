/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
import React from 'react';
import styled from 'styled-components';

const NavComments = styled.div`
position: absolute;
top: 50px;
font-size: 11px;
`;

// calculate point on waveform for when comment was made
const commentLocation = (time, duration) => (
  Math.floor((time / duration) * 820)
);

// Left side of User image aligns with waveform progression based on when user commented
const UserImg = styled.img`
z-index: 20;
width: 20px;
height: 20px;
background-image: 100%;
position: relative;
&:hover {
  cursor: pointer;
}
left: ${({ time, duration }) => `${commentLocation(time, duration)}px`};
`;

// align comments to left if user commented before half way mark
// align comments to right if user commented after half way mark

const Comment = styled.div`
position: relative;
color: white;
top: 30px;
max-width: 200px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
text-align: ${({ time, duration }) => `${commentLocation(time, duration) > 410 ? 'right' : 'left'}`};
left: ${({ time, duration, length }) => `${Math.floor((time / duration) * 820) > 410 ? Math.floor((time / duration) * 820) - 5.7 * (length > 30 ? 30 : length - 5) : Math.floor((time / duration) * 820)}px`};
`;

const User = styled(Comment)`
color: #ff4c00;
`;

const Comments = ({ comments, duration, handleCommentHover, handleCommentClick }) => {
  return (
    <div>
      {comments.map((comment) => {
        const { time } = comment;
        const length = comment.comment.length;
        return (
          <NavComments key={comment.user}>
            <UserImg
              className="userPhoto"
              src={comment.photo}
              alt="user"
              time={time}
              duration={duration}
              id={comment.user}
              onClick={handleCommentClick}
              onMouseOver={handleCommentHover}
              onMouseOut={handleCommentHover}
            />
            {comment.hover || comment.click ? <User time={time} duration={duration} length={length} >{`${comment.user}`}</User> : ''}
            {comment.hover || comment.click ? <Comment time={time} duration={duration} length={length} >{`${comment.comment}`}</Comment> : ''}
          </NavComments>
        );
      })}
    </div>
  );
};

export default Comments;
