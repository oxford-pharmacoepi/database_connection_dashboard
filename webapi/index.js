const express = require('express');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        application_name: process.env.APP_NAME,
    },
});

const app = express();

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: process.env.MAX_CONNECTION || 10,
});
// Apply rate limiter to all requests
app.use(limiter);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// CORS implemented so that we don't get errors when trying to access the server from a different server location
app.use(cors());

// GET: Fetch all active connections from the database
app.get('/connection', (req, res) => {

    db.select('*')
        .from('pg_stat_activity')
        //.where('state', '=', 'active')
        .whereNotNull('datname')
        .andWhere('application_name', '!=', process.env.APP_NAME)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        })
    //db.destroy();
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}, http://localhost:${port}`);
});