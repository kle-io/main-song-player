/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */
import React from 'react';
import { mount, shallow } from 'enzyme';
import Renderer from 'react-test-renderer';
import App from '../components/App';

describe('App', () => {
  const song = {
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
  };
  it('should display song information correctly', () => {
    const wrapper = shallow(<App />);
    const { artist, genre, title } = song;
    wrapper.setState({ artist, genre, title });
    expect(wrapper.contains(song.artist)).toBe(true);
    expect(wrapper.contains(`# ${song.genre}`)).toBe(true);
    expect(wrapper.contains(song.title)).toBe(true);
  });

  // it('should change play state when playButton is clicked', () => {
  //   const wrapper = shallow(<App />);
  //   const button = wrapper.find('playButton');
  //   button.simulate('click', { preventDefault: () => {} });
  //   // when clicked should show play as false because pause is displayed
  //   expect(wrapper.state('play')).toBe('false');
  //   // when clicked again should be true to show play on display
  //   button.simulate('click', { preventDefault: () => {} });
  //   expect(wrapper.state('play')).toBe('true');
  // });
});
