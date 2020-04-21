const moment = require('moment')
const Mission = require('../models/mission.model');
const geodist = require('geodist')

// @desc get the most isolated country 
// @route GET /api/v1/get-default-locations
// @access Public
exports.countriesByIsolation = async (req, res) => {
    try {
        // get missions
        const missions = await Mission.find({})
        let countriesWithAgents = []
        let countries = [...new Set(missions.map(mission => mission.country))]

        // check how many mission each agent has
        let agentsRank = missions.reduce((obj, v) => {
            obj[v.agent] = (obj[v.agent] || 0) + 1;
            return obj;
        }, {})


        // loop over countries
        countries.forEach(country => {
            // count agent in each country
            let agents = []
            missions.forEach(mission => {
                if (mission.country === country) {
                    agents.push({
                        agentId: mission.agent,
                        missionsCount: agentsRank[mission.agent]
                    })
                }
            })
            // count how many agents with one operation
            let isolatedAgents = agents.filter(agent => agent.missionsCount === 1).length
            countriesWithAgents.push({ country, isolatedAgents, agents })
        })

        // calc the highest ranked country
        const isolatedCountry = () => {
            return countriesWithAgents
                .sort((a, b) => b.isolatedAgents - a.isolatedAgents)[0]
        }

        const formattedMissions = missions.map(mission => ({
            agent: mission.agent,
            country: mission.country,
            address: mission.address,
            date: moment(mission.date).format('MMM Qo,YYYY, HH:mm:ss A'),
            geo: mission.geo
        }));

        return res.status(200).json({
            missions: formattedMissions,
            isolatedCountry: isolatedCountry()
        })

    } catch (err) {
        return res.status(500).json({
            err
        })
    }
}

// @desc POST  
// @route GET 
// @access Public
exports.findClosest = async (req, res) => {
    try {
        const missions = await Mission.find({})
        if (!missions) res.status(400).json({ status: 'failed' })

        const targetLocation = req.body.targetLocation || null
        console.log(req.body)

        if (!targetLocation) res.status(400).json({ status: 'failed2' })

        const distances = missions.map(mission => {
            return {
                country: mission.country,
                address: mission.address,
                distance: geodist(
                    targetLocation,
                    mission.geo,
                    { exact: true, unit: 'km' }
                )
            }
        })
            .sort((a, b) => a.distance - b.distance)

        //closest and farthest 
        const [closest, farthest] = distances.splice(1, distances.length - 2)

        return res.status(200).json({
            closest,
            farthest
        })
    } catch (error) {
        console.log(error)
    }
}

