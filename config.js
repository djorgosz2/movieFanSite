const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL,
    apiKey: process.env.API_KEY,
    apiBaseUrl: process.env.API_BASE_URL,
    nowPlayingUrl: `${process.env.API_BASE_URL}/movie/now_playing?api_key=${process.env.API_KEY}`,
    imageBasedUrl: process.env.IMAGE_BASE_URL,
    sessionSecret: process.env.SESSION_SECRET
}