/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
import React from 'react';
import styled from 'styled-components';

const NavComments = styled.div`
position: absolute;
top: 50px;
font-size: 11px;
`;

const UserImg = styled.img`
z-index: 20;
width: 20px;
height: 20px;
background-image: 100%;
position: relative;
left: ${({ time, duration }) => `${Math.floor((time / duration) * 820)}px`};
`;

const Comment = styled.div`
position: relative;
color: white;
top: 30px;
max-width: 200px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
left: ${({ time, duration }) => `${Math.floor((time / duration) * 820)}px`};
`;

const User = styled(Comment)`
color: #ff4c00;
`;

const Comments = ({ comments, duration, handleCommentHoverIn, handleCommentHoverOut, handleCommentClick }) => {
  return (
    <div>
      {comments.map((comment) => {
        const { time } = comment;
        return (
          <NavComments key={comment.user}>
           <UserImg className="userPhoto" src={comment.photo} alt="user" time={time} duration={duration} id={comment.user} onClick={handleCommentClick} onMouseOver={handleCommentHoverIn} onMouseOut={handleCommentHoverOut} />
            {comment.hover || comment.click ? <User time={time} duration={duration} >{`${comment.user}`}</User> : ''}
            {comment.hover || comment.click ? <Comment time={time} duration={duration} >{`${comment.comment}`}</Comment> : ''}
          </NavComments>
        );
      })}
    </div>
  );
};

export default Comments;
