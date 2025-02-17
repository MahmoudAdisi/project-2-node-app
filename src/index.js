const express = require('express');
const mongoose = require("mongoose");
const mongoUrl = process.env.MONGO_URL || "mongodb://root:example@db:27017";
const redis = require('redis');

// init app
const PORT = 4000;
const app = express();

// connect to redis 
const REDIS_PORT = 6379; 
const REDIS_HOST = 'redis';
const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on('error', (err) => console.log('Redis Client Error', err))
redisClient.on('connect', () => console.log('Redis Client connected....'))
redisClient.connect();


// connect db
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017;
const DB_HOST = 'mongo';

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
 //.connect(URI)
 .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false })
 .then(() => console.log('Connected to MongoDB'))
 .catch((err) => console.log('Failed to connect to DB:', err));
app.get('/', (req, res) => {
    redisClient.set('products', 'products...');
    res.send('<h1> Hello Adisi Grop now edit from hot reload </h1><h2>now new edit for hot relod dododo update now v.18 i need to update bat not restart whooooo aya whith my now </h2>')
});

app.get('/data', async (req, res) => {
    const products = await redisClient.get('products');
    redisClient.set('products', 'products...');
    res.send(`<h1> Hello products </h1> <h2>${products}</h2>`)
});

app.listen(PORT, () => console.log(`app is up and running on port: ${PORT}`));

