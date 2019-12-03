/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const AWS = require('aws-sdk');
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpeg = require('fluent-ffmpeg');
const Config = require('../../config.js');

ffmpeg.setFfprobePath(ffprobePath);

const s3 = new AWS.S3({
  accessKeyId: Config.accessKey,
  secretAccessKey: Config.secretKey,
  Bucket: Config.bucket,
  region: 'us-west-1',
});

const paramSongs = [];
const paramCovers = [];

let song = {};
let cover = {};

for (let i = 1; i <= 100; i++) {
  song = {
    Bucket: Config.bucket,
    Key: `songs/${i}.mp3`,
  };
  cover = {
    Bucket: Config.bucket,
    Key: `covers/${i}.jpg`,
  };
  paramSongs.push(song);
  paramCovers.push(cover);
}

const urlSongs = paramSongs.map((url) => {
  const songObj = s3.getObject(url);
  const { protocol } = songObj.httpRequest.endpoint;
  const { host } = songObj.httpRequest.endpoint;
  return `${protocol}//${song.Bucket}.${host}/${url.Key}`;
});

const urlCovers = paramCovers.map((url) => {
  const coverObj = s3.getObject(url);
  const { protocol } = coverObj.httpRequest.endpoint;
  const { host } = coverObj.httpRequest.endpoint;
  return `${protocol}//${cover.Bucket}.${host}/${url.Key}`;
});

// for song durations
const timeLengths = () => {
  const durations = urlSongs.map((url) => {
    const promise = new Promise((resolve, reject) => {
      ffmpeg.ffprobe(url, (err, metadata) => {
        if (err) {
          console.log('error in durations');
          reject(err);
        } else {
          resolve(metadata.format.duration);
        }
      });
    });
    return promise.then((data) => data);
  });
  return Promise.all(durations);
};

module.exports.timeLengths = timeLengths;
module.exports.urlSongs = urlSongs;
module.exports.urlCovers = urlCovers;
