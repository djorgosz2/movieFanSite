let express = require('express');
let router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process?.env?.API_KEY;
const apiBaseUrl = process?.env?.API_BASE_URL;
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBasedUrl = process?.env?.IMAGE_BASE_URL;

//save image url
router.use((req, res, next) => {
    res.locals.imageBaseUrl = imageBasedUrl;
    next();
})

//home page
router.get('/', async function (req, res, next) {
    const [err, movies] = await catchErrors(axios.get(nowPlayingUrl));
    if (err || !movies?.data?.results) {
        res.send(err || 'No data');
    } else {
        res.render('index', {parsedData: movies.data.results});
    }
});

//single movie
router.get('/movie/:id', async (req, res, next) => {
    const movieUrl = `${apiBaseUrl}/movie/${req.params.id}?api_key=${apiKey}`;
    const [err, movies] = await catchErrors(axios.get(movieUrl));
    if (err || !movies?.data) {
        res.send(err || 'No data');
    } else {
        res.render('single-movie', {parsedData: movies.data});
    }
});

//search redirects to index with results
router.post('/search', async (req, res, next) => {
    const searchTerm = encodeURI(req.body.movieSearch);
    const category = req.body.category;
    const movieUrl = `${apiBaseUrl}/search/${category}?query=${searchTerm}&api_key=${apiKey}`;
    const [err, movies] = await catchErrors(axios.get(movieUrl));
    if (err || !movies?.results[0]?.known_for || !movies?.data?.results) {
        res.send(err || 'No data');
    }
    if (category === 'person') {
        res.render('index', {parsedData: movies.results[0].known_for});

    } else {
        res.render('index', {parsedData: movies.data.results});
    }
});

const catchErrors = (promise) => {
    return promise.then(data => [null, data])
        .catch(err => [err]);
}
module.exports = router;
