const mongoose = require('mongoose')
const Schema = mongoose.Schema

var mission = new Schema({
    agent: { type: String },
    country: { type: String },
    address: { type: String },
    date: { type: Date },
    geo: { 
        lat: {type: Number},
        long: {type: Number},
     },
}, {
    timestamps: true
})

module.exports = mongoose.model('Mission', mission)
