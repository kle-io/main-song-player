const AWS = require('aws-sdk');
const Config = require('../../config.js');
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfprobePath(ffprobePath);


const s3 = new AWS.S3({
  accessKeyId: Config.accessKey,
  secretAccessKey: Config.secretKey,
  Bucket: Config.bucket,
  region: 'us-west-1'
})

const paramSongs = [];
const paramCovers = [];

for (let i = 1; i <= 100; i++) {
  var song = {
    Bucket: Config.bucket,
    Key: 'songs/' + i + '.mp3'
  }
  var cover = {
    Bucket: Config.bucket,
    Key: 'covers/' + i + '.jpg'
  }
  paramSongs.push(song);
  paramCovers.push(cover);
}

const urlSongs = paramSongs.map((song) => {
  return s3.getSignedUrl('getObject', song);
});

const urlCovers = paramCovers.map((cover) => {
  return s3.getSignedUrl('getObject', cover);
})

// for song durations ** NEED TO FIX **

// const durations = urlSongs.map((url) => {
//   return new Promise((resolve, reject) => {
//     ffmpeg.ffprobe(url, (err, metadata) => {
//       if (err) {
//         console.log('error')
//         reject(err)
//       } else {
//         resolve(metadata.format.duration)
//       }
//     })
//   })
// })


// module.exports.duration = Promise.all(durations)
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err, 'error')
//   });

module.exports.urlSongs = urlSongs;
module.exports.urlCovers = urlCovers;

