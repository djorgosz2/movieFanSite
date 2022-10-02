const request = require('supertest');
const app = require('../app');
const {expect} = require('chai');
const {JSDOM} = require('jsdom');

describe('GET /', function () {
    it('contains image', async function () {
        const response = await request(app).get('/').expect(200);
        const dom = new JSDOM(response.text);
        expect(dom.window.document.querySelector("img")
            .getAttribute("src")).to.contain(".jpg");
    });
});

describe('POST /search', function () {
    it('for movie contains image', async function () {
        const response = await request(app).post('/search').type("form").send({
            category: "movie",
            movieSearch: "snowden"
        }).expect(200);
        const dom = new JSDOM(response.text);
        expect(dom.window.document.querySelector("img")
            .getAttribute("src")).to.contain(".jpg");
    });
    it('for person contains image', async function () {
        const response = await request(app).post('/search').type("form").send({
            category: "person",
            movieSearch: "snowden"
        }).expect(200);
        const dom = new JSDOM(response.text);
        expect(dom.window.document.querySelector("img")
            .getAttribute("src")).to.contain(".jpg")
    });
});