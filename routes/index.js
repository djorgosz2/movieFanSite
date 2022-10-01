let express = require('express');
let router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process?.env?.API_KEY;
const apiBaseUrl = process?.env?.API_BASE_URL;
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBasedUrl = process?.env?.IMAGE_BASE_URL;

/* GET home page. */

router.use((req, res, next) => {
    res.locals.imageBaseUrl = imageBasedUrl;
    next()
})
router.get('/', async function (req, res, next) {
    try {
        const movies = await axios.get(nowPlayingUrl);
        res.render('index', {parsedData: movies.data.results});
    } catch (e) {
    }
});

router.get('/movie/:id',async (req,res,next)=>{
    const movieUrl=`${apiBaseUrl}/movie/${req.params.id}?api_key=${apiKey}`;
    console.log(movieUrl)
    const movies = await axios.get(movieUrl);
    //res.json(raw.data);
    console.log(movies)
    res.render('single-movie', {parsedData: movies?.data});
});
module.exports = router;
