/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
import React from 'react';

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
    const user = document.getElementsByClassName('userPhoto')[0];
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
      <div className="comments">
        {comments.map((comment) => {
          return (
            <div key={comment.user} className="comment">
              <button className="photoButton" type="button" onClick={this.handleComment} onMouseOver={this.handleComment} onFocus={this.handleComment}>
                <img className="userPhoto" src={comment.photo} alt="user" />
              </button>
              {clickHover ? <div>{`${comment.user}  ${comment.comment}`}</div> : ''}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Comments;
