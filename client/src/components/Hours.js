import React from 'react';

export default ({hours}) => {
  hours = JSON.parse(hours);
  hours = hours.map((day) => day.split(': '));

  return (
    <table className="hours">
      <tbody>
        { hours.map((day) => (
          <tr>
            <td>{day[0]}</td>
            <td>{day[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
