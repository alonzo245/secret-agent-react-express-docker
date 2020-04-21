// require('dotenv').config()
const missions = require('./missions')
const Mission = require('../models/mission.model')

exports.insertData = () => Mission.find({})
    .then((missionResult) => {
        // console.log(missionResult)
        if (missionResult.length === 0) {
            console.log('IMPORTING DATA!!!!!!!!!!!!!!!!')
            return Mission.insertMany(missions)
        }
        console.log('DATA ALREADY EXIST!!!!!!!!!!!!!!!!')
        return Promise.resolve()
    })
    .then(result => {
        console.log('DATA IMPORTED!!!!!!!!!!!!!!!!')
        return Promise.resolve()
    })
    .catch(err => {
        console.log('ERORRRRRRRRRRRRRRRRRRRR',err)
    })