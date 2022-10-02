let express = require('express');
let router = express.Router();
const axios = require('axios');
const passport = require('passport');
const config = require('../config');

router.get('/login',passport.authenticate('github'));
router.get('/auth',passport.authenticate('github',{
    successRedirect:'/',
    failureRedirect:'/error'
}));

//save image url
router.use((req, res, next) => {
    res.locals.imageBaseUrl = config.imageBasedUrl;
    next();
});

//home page
router.get('/', async function (req, res, next) {
    const [err, movies] = await catchErrors(axios.get(config.nowPlayingUrl));
    if (err || !movies?.data?.results) {
        res.send(err || 'No data');
    } else {
        res.render('index', {parsedData: movies.data.results});
    }
});

//single movie
router.get('/movie/:id', async (req, res, next) => {
    const movieUrl = `${config.apiBaseUrl}/movie/${req.params.id}?api_key=${config.apiKey}`;
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
    const movieUrl = `${config.apiBaseUrl}/search/${req.body.category}?query=${searchTerm}&api_key=${config.apiKey}`;
    const [err, moviesOrActors] = await catchErrors(axios.get(movieUrl));
    if (err || (!moviesOrActors?.results?.[0]?.known_for && !moviesOrActors?.data?.results?.[0])) {
        res.send(err || 'No data');
    } else if (category === 'person') {
        res.render('index', {parsedData: moviesOrActors.data.results[0].known_for});
    } else {
        res.render('index', {parsedData: moviesOrActors.data.results});
    }
});

const catchErrors = (promise) => {
    return promise.then(data => [null, data])
        .catch(err => [err]);
}
module.exports = router;
