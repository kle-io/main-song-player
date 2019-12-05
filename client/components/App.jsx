/* eslint-disable class-methods-use-this */

import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import InfoLeft from './InfoLeft.jsx';
import InfoRight from './InfoRight.jsx'
import Audio from './Audio.jsx';
import Comments from './Comments.jsx';

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
width: 75px;
height: 75px;
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
`

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
    };
    this.getSongs = this.getSongs.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleProgression = this.handleProgression.bind(this);
  }

  componentDidMount() {
    // this.getSongs();
    this.setState({
      artist: 'Hershel.Legros',
      genre: 'R&B & Soul',
      title: 'Handmade Frozen Soap monitor Oval',
      photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/4.jpg',
      color1: '#243d70',
      color2: '#117572',
      duration: 219.24,
      link: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/songs/4.mp3',
      posted: '2019-11-18T08:10:56.187Z',
      comments: [
        {
          user: 'Anibal99',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/70.jpg',
          comment: 'Ut reiciendis voluptas nisi ipsum.',
          time: 130,
        },
        {
          user: 'Colten46',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/82.jpg',
          comment: 'Magnam ducimus quo optio.',
          time: 24,
        },
        {
          user: 'Linda.Simonis86',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/27.jpg',
          comment: 'Aut nemo vel soluta est laborum dolore.',
          time: 114,
        }],
    }, () => {
      const gradient = document.getElementsByClassName('main')[0];
      if (gradient) {
        gradient.style.backgroundImage = `linear-gradient(to right, ${this.state.color1}, ${this.state.color2})`;
      }
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
    const { artist, genre, title, photo, duration, link, posted, comments, progress, began } = this.state;
    return (
      <Nav className="main">
        <PlayButton className="playButton" onClick={this.handlePlay} />
        <InfoLeft artist={artist} title={title} />
        <InfoRight photo={photo} posted={posted} genre={genre} />
        <NavMusic>
          <Audio link={link} began={began} progress={progress} duration={duration} handleProgression={this.handleProgression} />
          <Comments comments={comments} />
        </NavMusic>
      </Nav>
    );
  }
}

export default App;
