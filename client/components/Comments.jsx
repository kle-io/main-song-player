/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
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
    const show = this.state.clickHover;
    const user = document.getElementsByClassName('userPhoto')[0];
    if (show) {
      user.style.borderRadius = '20px';
    } else {
      user.style.borderRadius = '0';
    }
    this.setState({
      clickHover: !show,
    });
  }

  render() {
    return (
      <div className="comments">
        {this.props.comments.map((comment) => {
          return (
            <div key={comment.user} className="comment">
              <button className="photoButton" type="button" onClick={this.handleComment} onMouseOver={this.handleComment} onFocus={this.handleComment}>
                <img className="userPhoto" src={comment.photo} alt="user" />
              </button>
              {this.state.clickHover ? <div>{`${comment.user}  ${comment.comment}`}</div> : ''}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Comments;
