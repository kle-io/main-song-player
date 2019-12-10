/* eslint-disable class-methods-use-this */

import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import $ from 'jquery';
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
    this.handlePhotoCoverClick = this.handlePhotoCoverClick.bind(this);
  }

  componentDidMount() {
    // this.getSongs();
    this.setState({
      artist: 'Angelita.OConnell',
      genre: 'Rock',
      title: 'secured line Secured Stream',
      photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/38.jpg',
      color1: '#051250',
      color2: '#6f6d50',
      duration: 229.704,
      link: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/songs/38.mp3',
      posted: '2019-11-24T12:36:53.519Z',
      peaks: [ -0.13, 0.14, -0.16, 0.15, -0.17, 0.16, -0.15, 0.15, -0.17, 0.15, -0.15, 0.16, -0.1, 0.09, -0.05, 0.05, -0.18, 0.19, -0.2, 0.19, -0.2, 0.24, -0.22, 0.17, -0.21, 0.22, -0.21, 0.22, -0.1, 0.12, -0.2, 0.2, -0.2, 0.2, -0.2, 0.18, -0.13, 0.13, -0.18, 0.19, -0.13, 0.14, -0.25, 0.22, -0.17, 0.19, -0.18, 0.19, -0.44, 0.56, -0.43, 0.55, -0.48, 0.46, -0.43, 0.67, -0.28, 0.24, -0.53, 0.43, -0.17, 0.19, -0.26, 0.27, -0.65, 0.63, -0.46, 0.46, -0.43, 0.46, -0.54, 0.48, -0.19, 0.22, -0.54, 0.44, -0.22, 0.24, -0.43, 0.37, -0.58, 0.57, -0.61, 0.54, -0.5, 0.44, -0.37, 0.47, -0.23, 0.3, -0.46, 0.44, -0.2, 0.24, -0.54, 0.5, -0.49, 0.5, -0.53, 0.57, -0.49, 0.41, -0.41, 0.51, -0.24, 0.24, -0.57, 0.45, -0.25, 0.22, -0.39, 0.36, -0.65, 0.61, -0.72, 0.58, -0.57, 0.61, -0.43, 0.6, -0.57, 0.49, -0.54, 0.54, -0.59, 0.49, -0.5, 0.38, -0.76, 0.82, -0.69, 0.68, -0.58, 0.72, -0.37, 0.5, -0.56, 0.57, -0.65, 0.74, -0.67, 0.9, -0.82, 0.83, -0.8, 0.88, -0.65, 0.58, -0.62, 0.4, -0.56, 0.53, -0.6, 0.54, -0.46, 0.46, -0.58, 0.46, -0.57, 0.7, -0.69, 0.47, -0.5, 0.66, -0.65, 0.47, -0.49, 0.52, -0.72, 0.7, -0.5, 0.49, -0.68, 0.83, -1, 1, -0.98, 0.94, -0.95, 0.96, -0.98, 0.99, -0.94, 0.94, -0.94, 0.98, -0.97, 0.95, -1, 0.94, -0.91, 0.97, -0.91, 0.95, -0.94, 1, -0.93, 0.98, -0.91, 0.97, -0.96, 0.97, -0.97, 1, -0.94, 0.99, -0.97, 0.97, -0.91, 0.98, -0.92, 0.94, -0.87, 0.99, -0.91, 0.91, -0.91, 0.93, -0.91, 0.86, -0.92, 0.83, -0.8, 0.94, -0.88, 0.94, -0.91, 0.93, -0.94, 0.91, -0.87, 0.93, -0.87, 0.91, -0.91, 0.92, -0.88, 0.91, -0.89, 0.86, -0.87, 0.91, -0.91, 0.92, -0.93, 0.9, -0.83, 0.91, -0.91, 0.87, -0.91, 0.8, -0.87, 0.91, -0.85, 0.87, -0.9, 0.9, -0.94, 0.91, -0.87, 0.88, -0.84, 0.83, -0.89, 0.94, -0.94, 0.92, -0.87, 0.86, -0.62, 0.73, -0.88, 0.5, -0.54, 0.43, -0.64, 0.66, -0.49, 0.47, -0.75, 0.6, -0.51, 0.61, -0.67, 0.63, -0.63, 0.65, -0.63, 0.59, -0.64, 0.62, -0.5, 0.63, -0.47, 0.54, -0.66, 0.72, -0.69, 0.71, -0.86, 0.91, -0.96, 0.98, -0.94, 0.96, -0.95, 0.95, -0.94, 0.94, -0.9, 0.92, -0.91, 0.97, -0.98, 0.95, -0.96, 0.91, -0.94, 1, -0.92, 0.98, -1, 0.91, -0.94, 0.91, -0.91, 0.95, -0.94, 0.98, -0.96, 0.97, -0.94, 0.92, -0.38, 0.57, -0.42, 0.44, -0.54, 0.63, -0.43, 0.54, -0.43, 0.5, -0.49, 0.46, -0.57, 0.55, -0.42, 0.61, -0.68, 0.57, -0.46, 0.58, -0.52, 0.54, -0.49, 0.55, -0.53, 0.53, -0.62, 0.47, -0.46, 0.38, -0.56, 0.65, -0.6, 0.65, -0.63, 0.76, -0.67, 0.79, -0.52, 0.58, -0.54, 0.65, -0.5, 0.68, -0.55, 0.56, -0.94, 0.92, -0.96, 0.95, -0.94, 0.94, -0.93, 0.94, -0.96, 0.92, -0.99, 0.95, -0.94, 0.93, -1, 0.94, -0.91, 0.91, -0.91, 0.91, -0.94, 0.94, -0.99, 0.96, -0.93, 0.94, -0.93, 0.95, -0.93, 0.95, -0.95, 0.96, -0.95, 0.97, -0.93, 0.9, -0.96, 0.94, -0.98, 0.94, -0.9, 0.93, -0.94, 0.93, -0.91, 0.94, -0.95, 0.94, -0.93, 0.94, -0.91, 0.91, -0.97, 0.93, -0.94, 0.94, -0.93, 0.93, -0.96, 0.97, -0.95, 0.94, -0.93, 0.95, -0.68, 0.65, -0.09, 0.09, -0.03, 0.04, -0.02, 0.02, -0.01, 0.01, 0, 0, 0, 0, 0, 0 ],
      comments: [
        {
          user: 'Torrey84',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/1.jpg',
          comment: 'Cum rem est qui ad.',
          time: 67,
        },
        {
          user: 'Lexie68',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/88.jpg',
          comment: 'Nesciunt sed hic reprehenderit ea.',
          time: 162,
        },
        {
          user: 'Novella.Bernhard',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/80.jpg',
          comment: 'Voluptates inventore ex iste quia est.',
          time: 78,
        },
        {
          user: 'Holden.Schaden',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/18.jpg',
          comment: 'Sapiente ad esse.',
          time: 166,
        },
        {
          user: 'Elvera.Wehner58',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/23.jpg',
          comment: 'Aut quia architecto laborum molestiae velit sapiente rem quasi eius.',
          time: 75,
        },
        {
          user: 'Herbert51',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/83.jpg',
          comment: 'Nobis doloremque voluptatibus.',
          time: 8,
        },
        {
          user: 'Vita_Gislason37',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/41.jpg',
          comment: 'Excepturi voluptas voluptate et voluptatem voluptatem.',
          time: 16,
        },
        {
          user: 'Devonte_Hamill',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/100.jpg',
          comment: 'Aut enim dolore et tempora.',
          time: 35,
        },
        {
          user: 'Rubie.Schneider',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/41.jpg',
          comment: 'Quia exercitationem omnis.',
          time: 158,
        },
        {
          user: 'Gladys66',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/31.jpg',
          comment: 'Id dolorem dolorem.',
          time: 60,
        },
        {
          user: 'Terry80',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/32.jpg',
          comment: 'Sit tenetur dolor id.',
          time: 12,
        },
        {
          user: 'Arvilla.Feeney',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/16.jpg',
          comment: 'Modi ea sit a soluta et.',
          time: 156,
        },
        {
          user: 'Jaunita34',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/97.jpg',
          comment: 'Itaque eum repudiandae dolores soluta et id quaerat explicabo.',
          time: 216,
        },
        {
          user: 'Taryn_Christiansen',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/77.jpg',
          comment: 'Soluta quia animi ipsa.',
          time: 178,
        },
        {
          user: 'Antonia_Stokes',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/27.jpg',
          comment: 'Ut quas hic accusantium consequatur.',
          time: 160,
        },
        {
          user: 'Skylar_Kovacek47',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/8.jpg',
          comment: 'Rerum ab nostrum.',
          time: 131,
        },
        {
          user: 'Yasmeen_Reichert79',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/95.jpg',
          comment: 'Qui consequatur neque accusantium incidunt quod non.',
          time: 93,
        },
        {
          user: 'Fabian_Buckridge',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/86.jpg',
          comment: 'Doloremque ratione neque sunt veritatis illum culpa.',
          time: 135,
        },
        {
          user: 'Queenie55',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/58.jpg',
          comment: 'Quis quisquam inventore inventore eos sequi ab.',
          time: 93,
        },
        {
          user: 'Bennett.Dooley',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/66.jpg',
          comment: 'Quisquam possimus nobis.',
          time: 155,
        },
        {
          user: 'Dell90',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/88.jpg',
          comment: 'Nulla omnis consequatur veniam reprehenderit aut quasi possimus expedita est.',
          time: 203,
        },
        {
          user: 'Rodolfo.Hagenes',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/86.jpg',
          comment: 'Rerum incidunt perferendis rerum voluptatem et totam quo.',
          time: 21,
        },
        {
          user: 'Jett_Deckow',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/60.jpg',
          comment: 'Nihil reprehenderit rerum porro consequatur ex eum corporis et.',
          time: 11,
        },
        {
          user: 'Prince46',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/67.jpg',
          comment: 'Voluptatem voluptatibus soluta ut voluptas.',
          time: 154,
        },
        {
          user: 'Ericka_Halvorson90',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/89.jpg',
          comment: 'Quia vitae aperiam voluptatibus.',
          time: 208,
        },
        {
          user: 'Margarita.Franecki',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/61.jpg',
          comment: 'Dicta aut placeat nisi vel illum dolorem.',
          time: 142,
        },
        {
          user: 'Kara_Lueilwitz',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/18.jpg',
          comment: 'Hic autem ex.',
          time: 181,
        },
        {
          user: 'Terrell.Erdman',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/82.jpg',
          comment: 'Quia dicta aut corporis cupiditate suscipit totam sit dolorem debitis.',
          time: 30,
        },
        {
          user: 'Camden22',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/24.jpg',
          comment: 'Nam et quibusdam.',
          time: 42,
        },
        {
          user: 'Kayla_Gerhold',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/2.jpg',
          comment: 'Aut architecto et.',
          time: 5,
        },
        {
          user: 'Brittany_Deckow',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/7.jpg',
          comment: 'Quae voluptas deserunt mollitia commodi sint id quasi praesentium ullam.',
          time: 82,
        },
        {
          user: 'Willy56',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/52.jpg',
          comment: 'Nisi nobis repudiandae in.',
          time: 108,
        },
        {
          user: 'Marcelina_Kub',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/72.jpg',
          comment: 'Ea iure quidem.',
          time: 54,
        },
        {
          user: 'Alva96',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/41.jpg',
          comment: 'Sit qui sunt consectetur.',
          time: 146,
        },
        {
          user: 'Sophie.Hoeger',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/68.jpg',
          comment: 'Numquam minus id.',
          time: 205,
        },
        {
          user: 'Misael.Aufderhar',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/98.jpg',
          comment: 'Quos sint modi.',
          time: 216,
        },
        {
          user: 'Domenico40',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/55.jpg',
          comment: 'Reprehenderit quo perspiciatis aut molestiae iusto sunt omnis explicabo blanditiis.',
          time: 7,
        },
        {
          user: 'Gunnar14',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/42.jpg',
          comment: 'Earum voluptas sequi laboriosam.',
          time: 144,
        },
        {
          user: 'Bridgette54',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/91.jpg',
          comment: 'Temporibus repellendus quidem ut tempore.',
          time: 120,
        },
        {
          user: 'Odie.Thompson',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/44.jpg',
          comment: 'Ipsam incidunt enim praesentium autem aut harum saepe.',
          time: 53,
        },
        {
          user: 'Alanna99',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/49.jpg',
          comment: 'Corporis ut vitae quis fugit a deserunt qui aut.',
          time: 40,
        },
        {
          user: 'Ora.Kulas',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/33.jpg',
          comment: 'Quos ut autem veniam exercitationem eos sapiente natus molestiae unde.',
          time: 165,
        },
        {
          user: 'Haleigh_Weimann99',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/88.jpg',
          comment: 'Iusto expedita omnis eos reiciendis labore et.',
          time: 220,
        },
        {
          user: 'Clinton.Bahringer14',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/26.jpg',
          comment: 'Est voluptate unde id qui tenetur nulla voluptate.',
          time: 105,
        },
        {
          user: 'Aurelio18',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/71.jpg',
          comment: 'Rerum dolore inventore maxime similique soluta aut molestiae ut eveniet.',
          time: 7,
        },
        {
          user: 'Javier1',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/41.jpg',
          comment: 'Consequatur fugiat illo numquam et aut ea minus.',
          time: 68,
        },
        {
          user: 'Chelsey25',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/92.jpg',
          comment: 'Voluptate enim enim temporibus quae.',
          time: 104,
        },
        {
          user: 'Marco_Casper5',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/50.jpg',
          comment: 'Esse illum aut harum nobis consequatur iste dolores dolor.',
          time: 199,
        },
        {
          user: 'Eloisa46',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/17.jpg',
          comment: 'Rerum animi voluptatibus magni non cumque sunt alias eveniet.',
          time: 149,
        },
        {
          user: 'Janae20',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/12.jpg',
          comment: 'Nisi quas quas nobis odit dolorem.',
          time: 11,
        },
        {
          user: 'Keon72',
          photo: 'https://kleiomainplayer.s3.us-west-1.amazonaws.com/covers/20.jpg',
          comment: 'Officia sapiente nulla est nesciunt.',
          time: 226,
        },
      ],
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
    let { click, current, posPeaks, duration } = this.state;
    const progressionPerQuarterSec = posPeaks.length/duration/4;
    const newCurrent = current + progressionPerQuarterSec;
    let progressPos = document.getElementsByClassName('progressPos')[Math.floor(current)];
    let progressNeg = document.getElementsByClassName('progressNeg')[Math.floor(current)];
    if (!click && Math.floor(current)) {
      progressPos.style.backgroundImage = 'linear-gradient(#e87422db, #ff4c00db)';
      progressNeg.style.backgroundImage = 'linear-gradient(#ff4c00db, #e87422db)';
    } else if (click) {
      progressPos.style.backgroundImage = 'linear-gradient(#e87422db, #ff4c00db)';
      progressNeg.style.backgroundImage = 'linear-gradient(#e87422db, #746153c9)'
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
      })
    }
  }

  handlePhotoCoverClick(event) {
    event.preventDefault();

  }

  render() {
    const { artist, genre, title, photo, duration, link, posted, comments, progress, began, peaks, posPeaks, negPeaks } = this.state;
    return (
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
    );
  }
}

export default App;
