/* eslint-disable class-methods-use-this */

import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import InfoLeft from './InfoLeft.jsx';
import InfoRight from './InfoRight.jsx'
import Audio from './Audio.jsx';
import Comments from './Comments.jsx';
import Waveform from './Waveform.jsx';


const Nav = styled.div`
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

const PlayButton = styled.button`
background-image: url("play.png");
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

const NavMusic = styled.div`
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
    this.getSongs = this.getSongs.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleProgression = this.handleProgression.bind(this);
    this.handleCommentHoverIn = this.handleCommentHoverIn.bind(this);
    this.handleCommentHoverOut = this.handleCommentHoverOut.bind(this);
    this.handleCommentClick = this.handleCommentClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    // this.getSongs();
    this.setState({
      artist: 'Sebastian_Schaefer20',
      genre: 'Indie',
      title: 'Money Market Account transmitting',
      photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/25.jpg',
      color1: '#093047',
      color2: '#0d3c0d',
      duration: 233.904,
      link: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/songs/25.mp3',
      posted: '2019-10-18T19:26:28.652Z',
      peaks: [ -0.92, 0.94, -0.45, 0.71, -0.77, 0.77, -0.68, 0.87, -0.52, 0.54, -0.24, 0.31, -0.96, 0.94, -0.59, 0.9, -0.4, 0.5, -0.84, 0.72, -0.92, 0.94, -0.38, 0.48, -0.92, 0.93, -0.88, 0.65, -0.44, 0.5, -0.83, 0.7, -0.86, 0.64, -0.77, 0.84, -0.85, 0.91, -0.34, 0.34, -0.75, 0.72, -0.49, 0.46, -0.73, 0.69, -0.8, 0.92, -0.71, 0.64, -0.94, 0.92, -0.8, 0.91, -0.69, 0.51, -0.9, 0.62, -0.93, 0.93, -0.95, 0.95, -0.93, 0.93, -0.93, 0.74, -0.88, 0.91, -0.45, 0.45, -0.93, 0.94, -0.93, 0.87, -0.74, 0.6, -0.97, 0.92, -0.92, 0.93, -0.7, 0.8, -0.96, 0.91, -0.82, 0.96, -0.93, 0.86, -0.92, 0.93, -0.91, 0.94, -0.94, 0.88, -0.69, 0.57, -0.76, 0.96, -0.93, 0.96, -0.92, 0.92, -0.92, 0.95, -0.56, 0.58, -0.96, 0.93, -0.97, 0.94, -0.92, 0.92, -0.94, 0.93, -0.94, 0.95, -0.92, 0.94, -0.97, 0.91, -0.96, 0.94, -0.93, 0.94, -0.93, 0.94, -0.92, 0.94, -0.97, 0.93, -0.93, 0.89, -0.98, 1, -0.95, 0.95, -0.96, 0.97, -0.93, 0.94, -0.93, 0.96, -0.94, 0.93, -0.93, 0.93, -0.98, 0.95, -0.95, 0.96, -0.93, 0.94, -0.9, 0.98, -0.94, 0.93, -0.93, 0.93, -0.94, 0.93, -0.95, 0.93, -0.95, 0.98, -0.94, 0.9, -0.93, 0.94, -0.94, 0.94, -0.93, 0.94, -0.45, 0.49, -0.21, 0.31, -0.69, 0.71, -0.93, 0.95, -0.82, 0.72, -0.76, 0.62, -0.89, 0.93, -0.88, 0.79, -0.13, 0.21, -0.7, 0.77, -0.91, 0.95, -0.93, 0.89, -0.92, 0.89, -0.93, 0.93, -0.93, 0.95, -0.91, 0.95, -0.93, 0.95, -0.93, 0.96, -0.95, 0.94, -0.93, 0.93, -0.96, 0.96, -0.61, 0.64, -0.81, 0.93, -0.97, 0.93, -0.89, 0.74, -0.94, 0.93, -0.93, 0.83, -0.69, 0.91, -0.94, 0.93, -0.95, 0.95, -0.94, 0.93, -0.93, 0.95, -0.86, 0.91, -0.91, 0.94, -0.96, 0.94, -0.97, 0.96, -0.93, 0.94, -0.79, 0.92, -0.92, 0.95, -0.52, 0.47, -0.95, 0.93, -0.98, 0.93, -0.96, 0.93, -0.98, 0.96, -0.94, 0.93, -0.93, 0.96, -0.9, 0.9, -0.94, 0.91, -0.93, 0.97, -0.97, 0.98, -0.94, 0.96, -0.96, 0.94, -0.91, 0.95, -0.98, 0.95, -0.96, 0.97, -0.93, 0.96, -0.96, 0.94, -0.95, 0.94, -0.94, 0.95, -0.94, 0.94, -0.93, 0.98, -0.99, 0.98, -0.95, 0.97, -0.96, 0.98, -0.97, 0.97, -0.93, 0.92, -0.97, 0.94, -0.94, 0.95, -0.95, 0.95, -0.83, 0.92, -0.93, 0.95, -0.98, 0.96, -0.93, 0.91, -0.57, 0.6, -0.42, 0.39, -0.64, 0.72, -0.94, 0.93, -0.74, 0.69, -0.56, 0.56, -0.93, 0.88, -0.9, 0.74, -0.93, 0.91, -0.94, 0.93, -0.92, 0.81, -0.93, 0.92, -0.97, 0.94, -0.91, 0.93, -0.91, 0.88, -0.92, 0.92, -0.93, 0.92, -0.9, 0.94, -0.93, 0.94, -0.93, 0.93, -0.88, 0.88, -0.91, 0.89, -0.97, 0.94, -0.93, 0.93, -0.93, 0.93, -0.92, 0.88, -0.88, 0.93, -0.74, 0.69, -0.96, 0.93, -0.93, 0.92, -0.56, 0.52, -0.93, 0.93, -0.84, 0.93, -0.98, 0.98, -0.93, 0.96, -0.95, 0.95, -0.95, 0.97, -0.93, 0.94, -0.9, 0.94, -0.9, 0.91, -0.98, 0.95, -0.98, 0.96, -0.95, 0.94, -0.93, 0.96, -0.94, 0.96, -0.93, 0.93, -0.93, 0.96, -0.96, 0.98, -0.97, 0.96, -0.98, 0.96, -0.98, 0.95, -0.99, 0.94, -0.95, 0.98, -0.96, 0.95, -0.98, 0.96, -0.97, 0.98, -1, 0.97, -0.95, 0.98, -0.93, 0.93, -0.96, 0.98, -0.93, 0.97, -0.98, 0.95, -0.95, 0.93, -0.94, 0.96, -0.94, 0.93, -0.99, 0.93, -0.66, 0.59, -0.64, 0.69, -0.7, 0.73, -0.62, 0.45, -0.25, 0.18, -0.12, 0.07, -0.03, 0.03, -0.01, 0.01, 0, 0 ],
      comments: [
        {
          user: 'Alexa.Lueilwitz46',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/98.jpg',
          comment: 'Perferendis velit ducimus qui ea ducimus eveniet nostrum.',
          time: 16,
          click: false,
          hover: false,
        },
        {
          user: 'Rylee_Ratke56',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/13.jpg',
          comment: 'Repellendus distinctio vel maxime tenetur voluptas voluptatum est quas aspernatur.',
          time: 93,
          click: false,
          hover: false,
        },
        {
          user: 'Gaylord_Daniel89',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/57.jpg',
          comment: 'Sunt eum debitis quis ipsam officiis eveniet nobis.',
          time: 128,
          click: false,
          hover: false,
        },
        {
          user: 'Wilhelmine.Reichert',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/52.jpg',
          comment: 'Eveniet eos est velit et illum iure laudantium necessitatibus inventore.',
          time: 207,
          click: false,
          hover: false,
        },
        {
          user: 'Marcellus32',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/73.jpg',
          comment: 'Perspiciatis aliquid dignissimos corrupti.',
          time: 209,
          click: false,
          hover: false,
        }],
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
    });
  }

  getSongs() {
    Axios.get('/api/songs')
      .then((data) => {
        console.log(data.data);
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
      playButton.style.backgroundImage = 'url(pause.png)';
    } else {
      audio.pause();
      playButton.style.backgroundImage = 'url(play.png)';
    }
    this.setState({
      play: !play,
      began: true,
    });
  }

  handleProgression(event) {
    event.preventDefault();
    const audio = document.getElementsByTagName('audio')[0];
    let { click, current, posPeaks } = this.state
    // let index = Math.floor((audio.currentTime / audio.duration) * 100);
    const progressionPerSec = posPeaks.length/audio.duration
    let progressPos = document.getElementsByClassName('progressPos')[current];
    let progressNeg = document.getElementsByClassName('progressNeg')[current];
    if (!click) {
      progressPos.style.backgroundImage = 'linear-gradient(#e87422db, #ff4c00db)';
      progressNeg.style.backgroundImage = 'linear-gradient(#ff4c00db, #e87422db)';
    } else if (click) {
      progressPos.style.backgroundImage = 'linear-gradient(#e87422db, #ff4c00db)';
      progressNeg.style.backgroundImage = 'linear-gradient(#e87422db, #746153c9)'
    }
    const { comments, passed } = this.state;
    const updateComments = comments.map((comment) => {
      if (comment.hover && (Math.floor(audio.currentTime) !== comment.time)) {
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
    const newCurrent = current + 1;
    this.setState({
      progress: `${min}:${sec}`,
      comments: updateComments,
      current: newCurrent,
    });
  }

  handleCommentHoverIn(event) {
    event.preventDefault();
    const user = event.target.id;
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
    const { comments } = this.state;
    const updateComments = comments.map((comment) => {
      if (comment.user === user && !comment.click) {
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
    event.target.style.borderRadius = '20px';
    const users = document.getElementsByClassName('userPhoto');
    const { comments } = this.state;
    let target;
    const updateComments = comments.map((comment, index) => {
      if (comment.user === user) {
        const click = comment.click;
        comment.hover = false;
        comment.click = !click;
        target = index;
        return comment;
      }
      return comment;
    });
    for (let i = 0; i < users.length; i++) {
      if (target !== i) {
       users[i].style.opacity = '0.3';
      }
    }
    const audio = document.getElementsByTagName('audio')[0];
    const index = Math.floor((audio.currentTime / audio.duration) * 100);
    for (let i = 0; i < index; i++) {
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
    const { click } = this.state;
    if (click) {
      const users = document.getElementsByClassName('userPhoto');
      for (let i = 0; i < users.length; i++) {
         users[i].style.opacity = '1';
         users[i].style.borderRadius = '0';
      }
      const audio = document.getElementsByTagName('audio')[0];
      const index = Math.floor((audio.currentTime / audio.duration) * 100);
      for (let i = 0; i < index; i++) {
        const progressNeg = document.getElementsByClassName('progressNeg')[i];
        progressNeg.style.backgroundImage = 'linear-gradient(#ff4c00db, #e87422db)';
      }
      this.setState({
        click: false,
      })
    }
  }

  render() {
    const { artist, genre, title, photo, duration, link, posted, comments, progress, began, peaks, posPeaks, negPeaks } = this.state;
    return (
      <Nav className="main" onClick={this.handleClickOutside}>
        <PlayButton className="playButton" onClick={this.handlePlay} />
        <InfoLeft artist={artist} title={title} />
        <InfoRight photo={photo} posted={posted} genre={genre} />
        <NavMusic>
          <Audio link={link} began={began} progress={progress} duration={duration} handleProgression={this.handleProgression} />
          <Waveform posPeaks={posPeaks} negPeaks={negPeaks} />
          <Comments comments={comments} duration={duration} handleCommentClick={this.handleCommentClick} handleCommentHoverIn={this.handleCommentHoverIn} handleCommentHoverOut={this.handleCommentHoverOut} />
        </NavMusic>
      </Nav>
    );
  }
}

export default App;
