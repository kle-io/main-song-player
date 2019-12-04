/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
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
      artist: 'Ethan_Kohler',
      genre: 'Dubstep',
      title: 'Berkshire Cheese',
      photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/2.jpg',
      color1: '#165a3a',
      color2: '#7f360b',
      duration: 203.832,
      link: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/songs/2.mp3',
      posted: '2019-01-01T08:34:11.784Z',
      comments: [
        {
          user: 'Minnie.Orn',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/61.jpg',
          comment: 'Atque hic vero.',
          time: 95,
        },
        {
          user: 'Jaylen87',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/29.jpg',
          comment: 'Ut eum cumque sequi repudiandae.',
          time: 161,
        },
        {
          user: 'Ivah_Kuhic8',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/32.jpg',
          comment: 'Illum illum qui et rerum sed quis optio quasi.',
          time: 137,
        },
      ],
    }, () => {
      const gradient = document.getElementsByClassName('mainPlayer')[0];
      gradient.style.backgroundImage = `linear-gradient(to right, ${this.state.color1}, ${this.state.color2})`;
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
    return (
      <div className="mainContainer">
        <div className="mainPlayer">
          <button className="playButton" type="button" onClick={this.handlePlay}> </button>
          <div className="songTitle">
            <button className="artist" type="button">{this.state.artist}</button>
            <span className="title">{this.state.title}</span>
          </div>
          <div className="rightContainer">
            <img className="cover" src={this.state.photo} alt="song-cover" />
            <div className="songInfo">
              <span className="posted">{Moment(this.state.posted).fromNow()}</span>
              <button className="genre" type="button">{`${this.state.genre} #`}</button>
            </div>
          </div>
          <div className="music">
            <audio src={this.state.link} onTimeUpdate={this.handleProgression}>
              our browser does not support the audio element.
            </audio>
            <div className="songStart">{this.state.progress}</div>
            <div className="songEnd">
              {`0${Math.floor(this.state.duration / 60)} : ${(60 * ((this.state.duration / 60) - Math.floor(this.state.duration / 60))).toString().substring(0, 2)}`}
            </div>
            <div className="songProgression" />
            <Comments comments={this.state.comments} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
