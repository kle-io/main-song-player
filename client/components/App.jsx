/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */

import React from 'react';
import Axios from 'axios';
import InfoLeft from './InfoLeft.jsx';
import InfoRight from './InfoRight.jsx';
import Audio from './Audio.jsx';
import Comments from './Comments.jsx';
import Waveform from './Waveform.jsx';
import CoverModal from './CoverModal.jsx';
import { GlobalStyle, Nav, PlayButton, NavMusic } from './styles/AppStyles.jsx';
import { orange, lightOrange, taupe, lightTaupe } from './styles/Colors.jsx';

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
      modal: false,
    };
    this.getSong = this.getSong.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePeaks = this.handlePeaks.bind(this);
    this.handleProgression = this.handleProgression.bind(this);
    this.handleCommentsDuringProgression = this.handleCommentsDuringProgression.bind(this);
    this.handleWaveformDuringProgression = this.handleWaveformDuringProgression.bind(this);
    this.handleCommentHover = this.handleCommentHover.bind(this);
    this.handleCommentClick = this.handleCommentClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handlePhotoCoverClick = this.handlePhotoCoverClick.bind(this);
  }

  componentDidMount() {
    // check song id and get song data
    const pathNum = location.pathname.split("/")[1];
    this.getSong(pathNum);
  }

  getSong(songNum) {
    // if no song id, choose a random song
    if (typeof (songNum) !== 'number') {
      songNum = Math.floor(Math.random() * 100);
    }
    Axios.get(`/api/mainplayer/songs/${songNum}`)
      .then((data) => {
        const { artist, genre, title, photo, color1,
          color2, duration, link, posted, peaks } = data.data;
        const comments = data.data.comments.map((comment) => {
          comment.click = false;
          comment.hover = false;
          return comment;
        });
        this.setState({
          artist,
          genre,
          title,
          photo,
          color1,
          color2,
          duration,
          link,
          posted,
          comments,
          peaks,
        });
      }).then(() => {
        const { color1, color2 } = this.state;
        // set background gradient
        const gradient = document.getElementsByClassName('main')[0];
        if (gradient) {
          gradient.style.backgroundImage = `linear-gradient(to right, ${color1}, ${color2})`;
        }
        // Set positive and negative peaks for current song
        this.handlePeaks();
      }).catch((err) => {
        console.log(`error getting songs: ${err}`);
      });
  }

  handlePeaks() {
    const { peaks } = this.state;
    const posPeaks = [];
    const negPeaks = [];
    // separate postive and negative peaks
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
  }

  handlePlay(event) {
    event.preventDefault();
    const playButton = document.getElementsByClassName('playButton')[0];
    const audio = document.getElementsByTagName('audio')[0];
    const { play, click, color1, color2 } = this.state;
    const progressPos = document.getElementsByClassName('progressPos')[0];
    const progressNeg = document.getElementsByClassName('progressNeg')[0];
    if (!click) {
      // change first pos and neg peak to fill color on play
      progressPos.style.backgroundImage = `linear-gradient(${color1}, ${lightOrange})`;
      progressNeg.style.backgroundImage = `linear-gradient(${lightOrange}, ${color2})`;
    } else {
      // if comment is clicked, change first neg peak to fill color on play to lighter color
      progressNeg.style.backgroundImage = `linear-gradient(${lightTaupe}, ${taupe})`;
    }
    if (play) {
      // on play click, start song and change button to pause img
      audio.play();
      playButton.style.backgroundImage = 'url(https://kleiomainplayer.s3-us-west-1.amazonaws.com/pause.png)';
    } else {
      // on pause click, pause song and change button to play img
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
    // track duration time of song
    let sec = parseInt(audio.currentTime % 60, 0);
    const min = parseInt((audio.currentTime / 60) % 60, 0);
    if (sec.toString().length === 1) {
      sec = `0${sec}`;
    }
    // track waveform progression
    const { newCurrent } = this.handleWaveformDuringProgression(audio);
    // track comment progression
    const { updateComments } = this.handleCommentsDuringProgression(audio);
    // set current song duration time, waveform progression, and comment progression
    this.setState({
      progress: `${min}:${sec}`,
      comments: updateComments,
      current: newCurrent,
    });
  }

  handleWaveformDuringProgression() {
    const { click, current, posPeaks, duration, color1, color2 } = this.state;
    // audio tag current time event handler is triggered every quarter sec
    // find number of peaks that need to be changed per quarter sec in relation to duration of song
    const progressionPerQuarterSec = posPeaks.length / duration / 4;
    // track current progress by adding new progress to the old current
    const newCurrent = current + progressionPerQuarterSec;
    // track currrent peaks based on current progress
    const progressPos = document.getElementsByClassName('progressPos')[Math.floor(current)];
    const progressNeg = document.getElementsByClassName('progressNeg')[Math.floor(current)];
    if (!click && Math.floor(current)) {
      // when comments are not clicked and current progress is not 0, color in current peaks
      progressPos.style.backgroundImage = `linear-gradient(${color1}, ${lightOrange})`;
      progressNeg.style.backgroundImage = `linear-gradient(${lightOrange}, ${color2})`;
    } else if (click) {
      // when comments are clicked, color in current peaks with negative peaks being lighter
      progressPos.style.backgroundImage = `linear-gradient(${color1}, ${lightOrange})`;
      progressNeg.style.backgroundImage = `linear-gradient(${lightTaupe}, ${taupe})`;
    }
    return { newCurrent };
  }

  handleCommentsDuringProgression(audio) {
    const { comments } = this.state;
    // on progression of song, track comment time
    const updateComments = comments.map((comment) => {
      // if comment time has passed, hide comment
      if ((Math.floor(audio.currentTime) > comment.time)) {
        comment.hover = false;
        return comment;
      }
      // When comment time is same as song progression, show comment
      if (Math.floor(audio.currentTime) === comment.time) {
        comment.hover = true;
        return comment;
      }
      return comment;
    });
    return { updateComments };
  }

  handleCommentHover(event) {
    event.preventDefault();
    event.stopPropagation();
    // track user on hover
    const user = event.target.id;
    const { comments, click } = this.state;
    const updateComments = comments.map((comment) => {
      // find user comment that matches on hover user and show comment
      if (comment.user === user) {
        comment.hover = !comment.hover;
        if (comment.hover === true) {
          // change user image from sqaure to circle on hover in
          event.target.style.borderRadius = '20px';
        } else if (!click) {
          // change user image from circle to square on hover out if user was not clicked
          event.target.style.borderRadius = '0';
        }
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
    // track user on click
    const user = event.target.id;
    // track all users photos
    const users = document.getElementsByClassName('userPhoto');
    const { comments, current } = this.state;
    let target;
    const updateComments = comments.map((comment, index) => {
      // find user comment that matches on click, track index, change user image to circle, and show comment
      if (comment.user === user) {
        comment.click = true;
        event.target.style.borderRadius = '20px';
        target = index;
        return comment;
      }
      return comment;
    });
    for (let i = 0; i < users.length; i++) {
      // for every user that is not clicked, lower photo opacity and turn off hover
      if (target !== i) {
        users[i].style.opacity = '0.3';
        users[i].style.pointerEvents = 'none';
      }
    }
    // change all negative peaks up to the current peak to be lighter
    for (let i = 0; i < Math.floor(current); i++) {
      const progressNeg = document.getElementsByClassName('progressNeg')[i];
      progressNeg.style.backgroundImage = `linear-gradient(${lightTaupe}, ${taupe})`;
    }
    this.setState({
      comments: updateComments,
      click: true,
    });
  }

  handleClickOutside(event) {
    event.preventDefault();
    const { click, current, comments, modal, color2 } = this.state;
    // if comment has been clicked
    if (click) {
      const users = document.getElementsByClassName('userPhoto');
      // change all users back to regular opacity, with user photos back to squares, and hoverablity available
      for (let i = 0; i < users.length; i++) {
        users[i].style.opacity = '1';
        users[i].style.borderRadius = '0';
        users[i].style.pointerEvents = 'auto';
      }
      // change all negative peaks to be regular color
      for (let i = 0; i < Math.floor(current); i++) {
        const progressNeg = document.getElementsByClassName('progressNeg')[i];
        progressNeg.style.backgroundImage = `linear-gradient(${lightOrange}, ${color2})`;
      }
      // restore all comments to be unclicked
      const updateComments = comments.map((comment, index) => {
        comment.click = false;
        return comment;
      });
      this.setState({
        click: false,
        comments: updateComments,
      });
    // if modal had been clicked, restore main song player and turn off modal
    } else if (modal) {
      const main = document.getElementsByClassName('main')[0];
      main.style.opacity = '1';
      main.style.filter = 'grayscale(0%)';
      main.style.pointerEvents = 'auto';
      this.setState({
        modal: false
      })
    }
  }

  handlePhotoCoverClick(event) {
    event.preventDefault();
    // show modal of song cover and grey out main song player
    const main = document.getElementsByClassName('main')[0];
    main.style.opacity = '0.1';
    main.style.filter = 'grayscale(75%)';
    main.style.pointerEvents = 'none';
    this.setState({
      modal: true
    })
  }

  render() {
    const { artist, genre, title, photo, duration, link, posted,
      comments, progress, began, posPeaks, negPeaks, modal } = this.state;
    return (
      <div onClick={this.handleClickOutside}>
        <GlobalStyle />
        <Nav className="main">
          <PlayButton className="playButton" onClick={this.handlePlay} />
          <InfoLeft artist={artist} title={title} />
          <InfoRight
            photo={photo}
            posted={posted}
            genre={genre}
            handlePhotoCoverClick={this.handlePhotoCoverClick} />
          <NavMusic>
            <Audio
              link={link}
              began={began}
              progress={progress}
              duration={duration}
              handleProgression={this.handleProgression} />
            <Waveform posPeaks={posPeaks} negPeaks={negPeaks} />
            <Comments
              comments={comments}
              duration={duration}
              handleCommentClick={this.handleCommentClick}
              handleCommentHover={this.handleCommentHover} />
          </NavMusic>
        </Nav>
        {modal ? <CoverModal photo={photo} title={title} handleClickOutside={this.handleClickOutside}/> : ''}
      </div>
    );
  }
}

export default App;
