const express = require('express');
const memoize = require('fast-memoize');

require('es6-promise').polyfill();
require('isomorphic-fetch');

const app = express();
const port = 3000;
const gnomeMap = new Map();
const BASE_URL =
  'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json';

let jsonData;
const fetchGnomes = memoize(async () => {
  const rawData = await fetch(BASE_URL);
  jsonData = await rawData.json();
  return jsonData.Brastlewark;
});

app.get('/gnome', (req, res) => {
  const gnome = gnomeMap.get(`${req.query.id}`);
  res.set('Content-Type', 'application/json');
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', true);
  const friends = gnome.friends.map(friend =>
    jsonData.Brastlewark.find(o => o.name === friend),
  );
  res.end(JSON.stringify(Object.assign(gnome, { friends })));
});

const filterGnomesProfession = prof => {
  const gnomes = jsonData.Brastlewark.filter(o => {
    return o.professions.includes(prof);
  });
  return { Brastlewark: gnomes };
};

app.get('/gnomes', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', true);
  const response = req.query.profession
    ? filterGnomesProfession(req.query.profession)
    : jsonData;
  res.end(JSON.stringify(response));
});

app.listen(port, async () => {
  const gnomes = await fetchGnomes();
  for (const gnome of gnomes) {
    if (!gnomeMap.has(gnome.id)) {
      gnomeMap.set(gnome.id.toString(), gnome); // set any value to Map
    }
  }
});

// export default class WebServer {
//   constructor() {
//     this.app = express();
//     this.app.use(express.static('dist/public'));
//   }

//   get() {
//     return new Promise((resolve, reject) => {
//       consolelog('resolve', resolve, reject);
//       try {
//         this.server = this.app.get('/', (_, res) => {
//           res.set('Content-Type', client.register.contentType);
//           res.end(client.register.metrics());
//         });
//       } catch (e) {
//         console.error(e);
//         reject(e);
//       }
//     });
//   }
//   start() {
//     return new Promise((resolve, reject) => {
//       try {
//         this.server = this.app.listen(1238, function() {
//           resolve();
//         });
//       } catch (e) {
//         console.error(e);
//         reject(e);
//       }
//     });
//   }
//   stop() {
//     return new Promise((resolve, reject) => {
//       try {
//         this.server.close(() => {
//           resolve();
//         });
//       } catch (e) {
//         console.error(e.message);
//         reject(e);
//       }
//     });
//   }
// }
