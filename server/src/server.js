const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const server = require('http').createServer(app)

const bodyParser = require('body-parser')
const missionRoute = require('./routes/mission.route')
const MockData = require('./config/insertMockData')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Access-Token')
    next()
});

app
    .use(express.json())
    .use('/api-v1/mission', missionRoute)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')))
        .get('*', (req, res) => res.sendFile(path
            .resolve(__dirname, '..', 'client', 'build', 'index.html')))
}

module.exports = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false
})
    .then(() => {
        return MockData.insertData()
    })
    .then(() => {
        const PORT = process.env.PORT || 3001
        server.listen(PORT,
            () => console.log(`Example app listening on port ${PORT}!`)
        )

    })
    .catch(err => {
        console.log('err', err)
    })
