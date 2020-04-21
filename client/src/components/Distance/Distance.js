import React from 'react'

const Distance = ({distanceResult = null}) => {

  if (!distanceResult) return null

  return (
    <div className="distance">
      <h2>Distance Results</h2>
      <table>
        <tr>
          <th>proximity</th>
          <th>distance</th>
          <th>country</th>
          <th>address</th>
        </tr>
        <tr>
          <td style={{ color: 'green' }}>Closest</td>
          <td>{distanceResult.closest.distance} KM</td>
          <td>{distanceResult.closest.country}</td>
          <td>{distanceResult.closest.address}</td>
        </tr>
      </table>
      <br />
      <table>
        <tr>
          <th>proximity</th>
          <th>distance</th>
          <th>country</th>
          <th>address</th>
        </tr>
        <tr>
          <td style={{ color: 'red' }}>Farthest</td>
          <td>{distanceResult.farthest.distance} KM</td>
          <td>{distanceResult.farthest.country}</td>
          <td>{distanceResult.farthest.address}</td>
        </tr>
      </table>
    </div>
  )
}

export default Distance;
