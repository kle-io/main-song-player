/* eslint-disable no-undef */
import React from 'react';
import { mount, shallow } from 'enzyme';
import Renderer from 'react-test-renderer';
import Comments from '../components/Comments';

describe('Comments', () => {
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

  it('should render all usernames, comments, photos', () => {
    const output = Renderer.create(<Comments comments={song.comments} />);
    expect(output).toMatchSnapshot();
  });
});
