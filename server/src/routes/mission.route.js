const express = require('express')
const router = express.Router()
const { findClosest, countriesByIsolation } = require('../controllers/mission.controller')
    
router
    .route('/countries-by-isolation')
    .get(countriesByIsolation)

router
    .route('/find-closest')
    .post(findClosest)

module.exports = router
