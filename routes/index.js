let express = require('express');
let router = express.Router();
const axios = require('axios');

const apiKey='';
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
//const imageBaseUrl = 'http://image.tmdb.org/t/p/w300'

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const response = await axios.get(nowPlayingUrl);
  } catch (e) {
    console.log(e)
  }
  res.render('index', );
});

module.exports = router;
