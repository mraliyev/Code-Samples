import React from 'react';

const StatRow = ({ type, title, data }) => {
  return (
    <tr>
        <td>{ title }</td>
        {data ? Object.entries(data).map(([i, data]) => {
          return <td key={i}>{ data[type] }</td>
        }) : '-' }
    </tr>
  )
}

export default StatRow;
