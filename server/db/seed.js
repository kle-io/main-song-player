/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const db = require('./index.js');
const Song = require('./Song.js');
const sampleData = require('./sampleData.js');

const insertSampleSongs = () => {
  Song.create(sampleData)
    .then(() => db.disconnect());
};

insertSampleSongs();

// ************** WRITING FILE: ONLY USE IF 'sampleData.js' DOES NOT EXIST ********************

// const fs = require('fs');
// const path = require('path');
// const faker = require('faker');
// const s3 = require('./s3.js');

// const songs = s3.urlSongs;
// const covers = s3.urlCovers;

// // passing song durations into sample data
// const sample = (callback) => {
//   s3.timeLengths()
//     .then((durations) => {
//       callback(durations);
//     })
//     .catch((err) => {
//       callback(err);
//       console.log('error getting durations');
//     });
// };

// sample((durations) => {
//   const sampleSongs = [];
//   for (let i = 0; i < 100; i++) {
//     const genres = ['Alternative Rock', 'Ambient', 'Classical', 'Country', 'Dance & EDM', 'Deep House', 'Drum & Bass', 'Dubstep', 'Electronic', 'Folk & Singer-Songwriter', 'Hip-hop & Rap', 'House', 'Indie', 'Jazz & Blues', 'Metal', 'Piano', 'Pop', 'R&B & Soul', 'Reggae', 'Rock', 'Trance', 'Trap'];
//     const genreIndex = Math.floor(Math.random() * 22);
//     const genre = genres[genreIndex];
//     const artist = faker.internet.userName();
//     const title = faker.random.words();
//     const color1 = faker.internet.color();
//     const color2 = faker.internet.color();
//     const postTime = faker.date.between('2019-01-01', '2019-11-31');

//     // random comment generator (range from 1 - 60 comments per song)
//     const comments = [];
//     const commentIndex = Math.floor((Math.random() * 60) + 1);
//     for (let j = 0; j < commentIndex; j++) {
//       const randomPhotoIndex = Math.floor(Math.random() * 100);
//       const randomSongTime = Math.floor((Math.random() * (Math.floor(durations[i]))) + 1);
//       const comment = {
//         user: faker.internet.userName(),
//         photo: covers[randomPhotoIndex],
//         comment: faker.lorem.sentence(),
//         time: randomSongTime,
//       };
//       comments.push(comment);
//     }
//     // create each sample song
//     sampleSongs.push({
//       artist,
//       genre,
//       title,
//       photo: covers[i],
//       color1,
//       color2,
//       duration: durations[i],
//       link: songs[i],
//       posted: postTime,
//       comments,
//     });
//   }

//   fs.writeFile(path.join(__dirname, 'sampleData.json'), JSON.stringify(sampleSongs), (err) => {
//     if (err) {
//       console.log('error writing file');
//     }
//   });
// });

// ******************************* END OF WRITE FILE **************************************
