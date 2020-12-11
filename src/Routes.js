const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const AuthRoutes = require('./routes/AuthRoutes')
const UserRoutes = require('./routes/UserRoutes')
const SectorRoutes = require('./routes/SectorRoutes')
const IndustryRoutes = require('./routes/IndustryRoutes')
const ModuleRoutes = require('./routes/ModuleRoutes')
const StateRoutes = require('./routes/StateRoutes')
const CityRoutes = require('./routes/CityRoutes')
const ToolRoutes = require('./routes/ToolRoutes')
const SupportRoutes = require('./routes/SupportRoutes')
const ReasonRoutes = require('./routes/ReasonRoutes')
const ClientsRoutes = require('./routes/ClientsRoutes')
const AttendenceIndexRoutes = require('./routes/AttendenceIndexRoutes')
const AttendenceUpdateRoutes = require('./routes/AttendenceUpdateRoutes')
const InternalActivitiesRoutes = require('./routes/InternalActivitiesRoutes')
const DashboardRoutes = require('./routes/DashboardRoutes')

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST", "GET", "PUT", "DELETE");
        return res.status(200).send({});
    }

    next();
});

app.use('/auth', AuthRoutes)
app.use('/users', UserRoutes)
app.use('/sectors', SectorRoutes)
app.use('/industry', IndustryRoutes)
app.use('/activity', InternalActivitiesRoutes)
app.use('/module', ModuleRoutes)
app.use('/states', StateRoutes)
app.use('/cities', CityRoutes)
app.use('/tools', ToolRoutes)
app.use('/support', SupportRoutes)
app.use('/reasons', ReasonRoutes)
app.use('/clients', ClientsRoutes)
app.use('/attendence/index', AttendenceIndexRoutes)
app.use('/attendence/update', AttendenceUpdateRoutes)
app.use('/dashboard', DashboardRoutes)

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
  