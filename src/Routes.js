const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const UserRoutes = require('./routes/Users')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST", "GET", "PUT", "DELETE");
        return res.status(200).send({});
    }

    next();
});

app.use('/users', UserRoutes)

app.use((req, res, next) => {
    const error = new Error("Rota não encontrada");
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    return res
        .status(error.statusCode || 500)
        .send({ error: { message: error.statusMessage } });
});

module.exports = app;
  