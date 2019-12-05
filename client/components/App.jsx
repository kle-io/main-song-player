/* eslint-disable class-methods-use-this */

import React from 'react';
import Axios from 'axios';
import Moment from 'moment';
import Comments from './Comments.jsx';

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
      progress: '00:00',
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
      const gradient = document.getElementsByClassName('mainPlayer')[0];
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
    });
  }

  handleProgression(event) {
    event.preventDefault();
    const audio = document.getElementsByTagName('audio')[0];
    const progression = document.getElementsByClassName('songProgression')[0];
    progression.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    let sec = parseInt(audio.currentTime % 60, 0);
    let min = parseInt((audio.currentTime / 60) % 60, 0);
    if (sec.toString().length === 1) {
      sec = `0${sec}`;
    }
    if (min.toString().length === 1) {
      min = `0${min}`;
    }
    this.setState({
      progress: `${min} : ${sec}`,
    });
  }

  render() {
    const { artist, title, photo, posted, genre, link, duration, progress, comments } = this.state;
    return (
      <div className="mainContainer">
        <div className="mainPlayer">
          <button className="playButton" type="button" onClick={this.handlePlay}> </button>
          <div className="songTitle">
            <button className="artist" type="button">{artist}</button>
            <span className="title">{title}</span>
          </div>
          <div className="rightContainer">
            <img src={photo} className="cover" alt="song-cover" />
            <div className="songInfo">
              <span className="posted">{Moment(posted).fromNow()}</span>
              <button className="genre" type="button">{`# ${genre}`}</button>
            </div>
          </div>
          <div className="music">
            <audio src={link} onTimeUpdate={this.handleProgression}>
              our browser does not support the audio element.
            </audio>
            <div className="songStart">{progress}</div>
            <div className="songEnd">
              {`0${Math.floor(duration / 60)} : ${(60 * ((duration / 60) - Math.floor(duration / 60))).toString().substring(0, 2)}`}
            </div>
            <div className="songProgression" />
            <Comments comments={comments} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
