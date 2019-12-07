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
border: 1px solid;
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
    };
    this.getSongs = this.getSongs.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleProgression = this.handleProgression.bind(this);
  }

  componentDidMount() {
    // this.getSongs();
    this.setState({
      artist: 'Harmony.Rippin10',
      genre: 'Country',
      title: 'Paraguay',
      photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/20.jpg',
      color1: '#3c0861',
      color2: '#7c282e',
      duration: 181.056,
      link: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/songs/20.mp3',
      posted: '2019-09-15T04:54:04.431Z',
      peaks: [ -0.26, 0.4, -0.6, 0.62, -0.41, 0.6, -0.57, 0.32, -0.44, 0.62, -0.52, 0.31, -0.51, 0.56, -0.3, 0.35, -0.5, 0.62, -0.42, 0.65, -0.6, 0.53, -0.44, 0.57, -0.57, 0.31, -0.4, 0.62, -0.57, 0.32, -0.61, 0.6, -0.28, 0.24, -0.58, 0.6, -0.47, 0.62, -0.57, 0.36, -0.43, 0.63, -0.54, 0.38, -0.51, 0.65, -0.35, 0.39, -0.58, 0.54, -0.27, 0.24, -0.56, 0.61, -0.2, 0.2, -0.56, 0.76, -0.96, 0.74, -0.51, 0.47, -0.62, 0.7, -0.78, 0.67, -0.72, 0.85, -0.85, 0.55, -0.73, 0.77, -0.71, 0.61, -0.82, 0.73, -0.82, 0.7, -0.75, 0.62, -0.78, 0.72, -0.27, 0.21, -0.65, 0.65, -0.76, 0.48, -0.69, 0.74, -0.72, 0.62, -0.91, 0.69, -0.57, 0.75, -0.79, 0.69, -0.88, 0.72, -0.74, 0.67, -0.75, 0.75, -0.69, 0.65, -0.91, 0.62, -0.83, 0.63, -0.25, 0.33, -0.24, 0.3, -0.97, 0.97, -0.98, 0.97, -0.93, 0.95, -0.98, 0.91, -0.98, 0.98, -0.95, 0.94, -0.98, 0.95, -0.99, 0.97, -0.99, 1, -1, 1, -0.95, 0.95, -0.98, 0.99, -0.98, 0.94, -0.94, 0.94, -0.98, 0.98, -0.97, 0.98, -0.94, 0.97, -0.98, 0.96, -1, 0.96, -0.98, 0.99, -0.96, 0.95, -0.99, 0.99, -1, 0.98, -0.98, 0.96, -0.96, 0.94, -0.97, 1, -0.99, 0.98, -0.9, 0.96, -0.97, 0.96, -0.98, 0.98, -0.98, 0.98, -0.95, 0.95, -0.99, 0.97, -0.98, 0.98, -0.96, 1, -1, 0.98, -0.99, 0.96, -1, 0.95, -0.95, 0.96, -0.98, 0.93, -1, 0.94, -0.94, 0.94, -0.98, 0.94, -1, 0.96, -0.99, 0.99, -0.95, 0.95, -0.94, 0.93, -0.98, 0.98, -1, 0.98, -0.98, 0.94, -0.98, 0.98, -1, 0.97, -0.99, 0.95, -1, 0.98, -0.97, 0.94, -0.46, 0.5, -0.32, 0.35, -0.98, 0.95, -1, 0.99, -0.98, 0.97, -0.96, 1, -1, 0.98, -1, 0.95, -1, 0.98, -0.98, 0.97, -0.97, 0.98, -0.97, 0.96, -0.94, 0.93, -0.99, 0.99, -1, 0.97, -0.87, 0.98, -0.98, 0.97, -0.99, 0.99, -0.97, 0.98, -0.96, 0.95, -0.98, 1, -0.97, 0.96, -0.98, 0.99, -0.98, 1, -0.97, 0.98, -1, 0.97, -0.98, 0.94, -0.98, 0.94, -0.98, 0.96, -0.94, 0.95, -0.95, 0.98, -0.96, 0.87, -0.86, 0.73, -0.54, 0.56, -0.93, 0.88, -0.93, 0.73, -0.68, 0.87, -0.81, 0.74, -0.98, 0.96, -0.98, 0.94, -0.86, 0.94, -0.97, 0.92, -0.98, 0.97, -1, 0.97, -0.49, 0.39, -0.96, 0.96, -0.98, 0.98, -1, 0.94, -0.98, 0.98, -0.98, 0.98, -0.99, 0.96, -0.96, 0.94, -0.97, 1, -1, 0.92, -0.93, 0.85, -1, 0.92, -0.79, 0.8, -0.83, 0.8, -0.85, 0.85, -0.65, 0.65, -0.16, 0.17, -0.06, 0.06, -0.02, 0.02, -0.02, 0.02, -0.01, 0.01, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      comments: [
        {
          user: 'Estefania_Lubowitz57',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/1.jpg',
          comment: 'Et cumque omnis dolorem.',
          time: 73,
        },
        {
          user: 'Dane22',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/75.jpg',
          comment: 'Excepturi pariatur nam atque ipsum et accusamus sed quibusdam.',
          time: 111,
        },
        {
          user: 'Arthur66',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/95.jpg',
          comment: 'Et eos quia dolores odit dolores.',
          time: 109,
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
    const { play } = this.state;

    this.setState({
      play: !play,
      began: true,
    }, () => {
      if (play) {
        audio.play();
        playButton.style.backgroundImage = 'url(pause.png)';
      } else {
        audio.pause();
        playButton.style.backgroundImage = 'url(play.png)';
      }
    });
  }

  handleProgression(event) {
    event.preventDefault();
    const audio = document.getElementsByTagName('audio')[0];
    const progression = document.getElementsByClassName('songProgression')[0];
    progression.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    let sec = parseInt(audio.currentTime % 60, 0);
    const min = parseInt((audio.currentTime / 60) % 60, 0);
    if (sec.toString().length === 1) {
      sec = `0${sec}`;
    }
    this.setState({
      progress: `${min}:${sec}`,
    });
  }

  render() {
    const { artist, genre, title, photo, duration, link, posted, comments, progress, began, peaks, posPeaks, negPeaks } = this.state;
    return (
      <Nav className="main">
        <PlayButton className="playButton" onClick={this.handlePlay} />
        <InfoLeft artist={artist} title={title} />
        <InfoRight photo={photo} posted={posted} genre={genre} />
        <NavMusic>
          <Audio link={link} began={began} progress={progress} duration={duration} handleProgression={this.handleProgression} />
          <Comments comments={comments} />
          <Waveform posPeaks={posPeaks} negPeaks={negPeaks} />
        </NavMusic>
      </Nav>
    );
  }
}

export default App;
