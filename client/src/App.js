import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Distance from './components/Distance/Distance'

const App = () => {
  const [missions, setMissions] = useState([])
  const [distanceResult, setDistanceResult] = useState(null)
  const [isolatedCountry, setIsolatedCountry] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api-v1/mission/countries-by-isolation')
      setMissions(response.data.missions)
      setIsolatedCountry(response.data.isolatedCountry.country)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchClosestMission = async (geo = null) => {
    try {
      if (!geo) return Promise.reject()

      setDistanceResult(null)
      const response = await axios.post(
        'http://localhost:3001/api-v1/mission/find-closest', { targetLocation: geo })

      setDistanceResult(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchData()
  }, [])


  if (missions.length === 0) return 'loading...'

  return (
    <section>
      <table>
        <tbody>
          <tr>
            <th>Agent ID</th>
            <th>Country</th>
            <th>Address</th>
            <th>Date</th>
            <th>Distance</th>
          </tr>
          {missions.map((mission, i) => {
            return (
              <tr key={i} className={isolatedCountry === mission.country ? 'most-isolated' : null}>
                <td>{mission.agent}</td>
                <td>{mission.country}</td>
                <td>{mission.address}</td>
                <td>{mission.date}</td>
                <td>
                  <button onClick={() => fetchClosestMission(mission.geo)}>Calculate</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Distance distanceResult={distanceResult} />
    </section>
  )
}


export default App;
