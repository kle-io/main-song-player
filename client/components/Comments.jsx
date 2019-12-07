/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
import React from 'react';
import styled from 'styled-components';

const NavComments = styled.div`
position: relative;
left: 100px;
font-size: 10px;
`;

const UserButton = styled.button`
border: none;
background-color: transparent;
`;

const UserImg = styled.img`
background-image: 100%;
width: 20px;
height: 20px;
`;

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickHover: false,
    };
    this.handleComment = this.handleComment.bind(this);
  }

  handleComment(event) {
    event.preventDefault();
    const { clickHover } = this.state;
    const user = document.getElementsByClassName('userButton')[0];
    if (clickHover) {
      user.style.borderRadius = '20px';
    } else {
      user.style.borderRadius = '0';
    }
    this.setState({
      clickHover: !clickHover,
    });
  }

  render() {
    const { comments } = this.props;
    const { clickHover } = this.state;
    return (
      <NavComments>
        {comments.map((comment) => {
          return (
            <div key={comment.user}>
              <UserButton className="userButton" onClick={this.handleComment} onMouseOver={this.handleComment} onFocus={this.handleComment}>
                <UserImg src={comment.photo} alt="user" />
              </UserButton>
              {clickHover ? <div>{`${comment.user}  ${comment.comment}`}</div> : ''}
            </div>
          );
        })}
      </NavComments>
    );
  }
}

export default Comments;
