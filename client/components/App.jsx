/* eslint-disable class-methods-use-this */

import React from 'react';
import Axios from 'axios';
// import styled, { createGlobalStyle } from 'styled-components';
import InfoLeft from './InfoLeft.jsx';
import InfoRight from './InfoRight.jsx'
import Audio from './Audio.jsx';
import Comments from './Comments.jsx';
import Waveform from './Waveform.jsx';

const GlobalStyle = window.styled.createGlobalStyle`
  *:focus {
    outline: none;
  }

  body {
    font-family: Verdana, Tahoma, sans-serif;
    font-weight: 100;
  }
`;

const Nav = window.styled.div`
  width: 1240px;
  height: 380px;
  position: relative;
  margin: auto;
  top: 40px;
  right: 0;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  padding: 30px 560px 20px 30px;
  opacity: 0.9;
`;

const PlayButton = window.styled.button`
background-image: url(https://kleiomainplayer.s3-us-west-1.amazonaws.com/play.png);
background-color: transparent;
background-size: 100%;
background-repeat: no-repeat;
width: 70px;
height: 70px;
border: none;
position: relative;
right: 5px;
bottom: 5px;
`;

const NavMusic = window.styled.div`
width: 820px;
height: 100px;
position: absolute;
bottom: 40px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: '',
      genre: '',
      title: '',
      photo: '',
      color1: '',
      color2: '',
      duration: '',
      link: '',
      posted: '',
      comments: [],
      play: true,
      progress: '',
      began: false,
      peaks: [],
      posPeaks: [],
      negPeaks: [],
      click: false,
      current: 0,
    };
    this.getSong = this.getSong.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleProgression = this.handleProgression.bind(this);
    this.handleCommentHoverIn = this.handleCommentHoverIn.bind(this);
    this.handleCommentHoverOut = this.handleCommentHoverOut.bind(this);
    this.handleCommentClick = this.handleCommentClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handlePhotoCoverClick = this.handlePhotoCoverClick.bind(this);
  }

  componentDidMount() {
    const pathNum = location.pathname.split("/")[1];
    this.getSong(pathNum);
  }

  getSong(songNum) {
    if (typeof (songNum) !== 'number') {
      songNum = Math.floor(Math.random() * 100);
    }
    Axios.get(`/api/mainplayer/songs/${songNum}`)
      .then((data) => {
        const songData = data.data;
        const comments = songData.comments.map((comment) => {
          comment.click = false;
          comment.hover = false;
          return comment;
        })
        this.setState({
          artist: songData.artist,
          genre: songData.genre,
          title: songData.title,
          photo: songData.photo,
          color1: songData.color1,
          color2: songData.color2,
          duration: songData.duration,
          link: songData.link,
          posted: songData.posted,
          comments: comments,
          peaks: songData.peaks
        }, () => {
          const gradient = document.getElementsByClassName('main')[0];
          if (gradient) {
            gradient.style.backgroundImage = `linear-gradient(to right, ${this.state.color1}, ${this.state.color2})`;
          }
          // determine peak for the current song
          const { peaks } = this.state;
          const posPeaks = [];
          const negPeaks = [];
          for (let i = 0; i < peaks.length; i += 2) {
            if (i + 1 < peaks.length) {
              posPeaks.push(Math.floor(peaks[i + 1] * 50));
              negPeaks.push(Math.floor(peaks[i] * 50) * -1);
            }
          }
          this.setState({
            posPeaks,
            negPeaks,
          });
        })
      })
      .catch((err) => {
        console.log('error getting songs');
      });
  }

  handlePlay(event) {
    event.preventDefault();
    const playButton = document.getElementsByClassName('playButton')[0];
    const audio = document.getElementsByTagName('audio')[0];
    const { play, click } = this.state;
    const progressPos = document.getElementsByClassName('progressPos')[0];
    const progressNeg = document.getElementsByClassName('progressNeg')[0];
    if (!click) {
      progressPos.style.backgroundImage = 'linear-gradient(#e87422db, #ff4c00db)';
      progressNeg.style.backgroundImage = 'linear-gradient(#ff4c00db, #e87422db)';
    } else {
      progressNeg.style.backgroundImage = 'linear-gradient(#e87422db, #746153c9)';
    }
    if (play) {
      audio.play();
      playButton.style.backgroundImage = 'url(https://kleiomainplayer.s3-us-west-1.amazonaws.com/pause.png)';
    } else {
      audio.pause();
      playButton.style.backgroundImage = 'url(https://kleiomainplayer.s3-us-west-1.amazonaws.com/play.png)';
    }
    this.setState({
      play: !play,
      began: true,
    });
  }

  handleProgression(event) {
    event.preventDefault();
    const audio = document.getElementsByTagName('audio')[0];
    let { click, current, posPeaks, duration } = this.state;
    const progressionPerQuarterSec = posPeaks.length / duration / 4;
    const newCurrent = current + progressionPerQuarterSec;
    let progressPos = document.getElementsByClassName('progressPos')[Math.floor(current)];
    let progressNeg = document.getElementsByClassName('progressNeg')[Math.floor(current)];
    if (!click && Math.floor(current)) {
      progressPos.style.backgroundImage = 'linear-gradient(#e87422db, #ff4c00db)';
      progressNeg.style.backgroundImage = 'linear-gradient(#ff4c00db, #e87422db)';
    } else if (click) {
      progressPos.style.backgroundImage = 'linear-gradient(#e87422db, #ff4c00db)';
      progressNeg.style.backgroundImage = 'linear-gradient(#e87422db, #746153c9)';
    }
    const { comments, passed } = this.state;
    const updateComments = comments.map((comment) => {
      if ((Math.floor(audio.currentTime) > comment.time)) {
        comment.hover = false;
        return comment;
      }
      if (Math.floor(audio.currentTime) === comment.time) {
        comment.hover = true;
        return comment;
      }
      return comment;
    })

    let sec = parseInt(audio.currentTime % 60, 0);
    const min = parseInt((audio.currentTime / 60) % 60, 0);
    if (sec.toString().length === 1) {
      sec = `0${sec}`;
    }

    this.setState({
      progress: `${min}:${sec}`,
      comments: updateComments,
      current: newCurrent,
    });
  }

  handleCommentHoverIn(event) {
    event.preventDefault();
    event.stopPropagation();
    const user = event.target.id;
    event.target.style.borderRadius = '20px';
    const { comments } = this.state;
    const updateComments = comments.map((comment) => {
      if (comment.user === user) {
        comment.hover = true;
        return comment;
      }
      return comment;
    });
    this.setState({
      comments: updateComments,
    });
  }

  handleCommentHoverOut(event) {
    event.preventDefault();
    const user = event.target.id;
    event.target.style.borderRadius = '0';
    const { comments } = this.state;
    const updateComments = comments.map((comment) => {
      if (comment.user === user) {
        comment.hover = false;
        return comment;
      }
      return comment;
    });
    this.setState({
      comments: updateComments,
    });
  }

  handleCommentClick(event) {
    event.preventDefault();
    const user = event.target.id;
    const users = document.getElementsByClassName('userPhoto');
    const { comments, current } = this.state;
    let target;
    const updateComments = comments.map((comment, index) => {
      if (comment.user === user) {
        comment.click = true;
        target = index;
        return comment;
      }
      return comment;
    });
    for (let i = 0; i < users.length; i++) {
      if (target !== i) {
        users[i].style.opacity = '0.3';
        users[i].style.pointerEvents = 'none';
      }
    }
    const audio = document.getElementsByTagName('audio')[0];
    for (let i = 0; i < Math.floor(current); i++) {
      const progressNeg = document.getElementsByClassName('progressNeg')[i];
      progressNeg.style.backgroundImage = 'linear-gradient(#e87422db, #746153c9)'
    }
    this.setState({
      comments: updateComments,
      click: true,
    });
  }

  handleClickOutside(event) {
    event.preventDefault();
    const { click, current, comments } = this.state;
    if (click) {
      const users = document.getElementsByClassName('userPhoto');
      for (let i = 0; i < users.length; i++) {
        users[i].style.opacity = '1';
        users[i].style.borderRadius = '0';
        users[i].style.pointerEvents = 'auto';
      }
      const audio = document.getElementsByTagName('audio')[0];
      for (let i = 0; i < Math.floor(current); i++) {
        const progressNeg = document.getElementsByClassName('progressNeg')[i];
        progressNeg.style.backgroundImage = 'linear-gradient(#ff4c00db, #e87422db)';
      }
      const updateComments = comments.map((comment, index) => {
        comment.click = false;
        return comment;
      });
      this.setState({
        click: false,
        comments: updateComments,
      });
    }
  }

  handlePhotoCoverClick(event) {
    event.preventDefault();
  }

  render() {
    const { artist, genre, title, photo, duration, link, posted, comments, progress, began, peaks, posPeaks, negPeaks } = this.state;
    return (
      <div>
        <GlobalStyle />
        <Nav className="main" onClick={this.handleClickOutside}>
          <PlayButton className="playButton" onClick={this.handlePlay} />
          <InfoLeft artist={artist} title={title} />
          <InfoRight photo={photo} posted={posted} genre={genre} handlePhotoCoverClick={this.handlePhotoCoverClick} />
          <NavMusic>
            <Audio link={link} began={began} progress={progress} duration={duration} handleProgression={this.handleProgression} />
            <Waveform posPeaks={posPeaks} negPeaks={negPeaks} />
            <Comments comments={comments} duration={duration} handleCommentClick={this.handleCommentClick} handleCommentHoverIn={this.handleCommentHoverIn} handleCommentHoverOut={this.handleCommentHoverOut} />
          </NavMusic>
        </Nav>
      </div>
    );
  }
}

export default App;
