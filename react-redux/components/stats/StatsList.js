import React from 'react';
import StatRow from './StatRow';

const StatsList = ({ stats }) => {
  const statTypes = {
    ...
    ...
    ...
  };

  const getStatsTableHeading = () => {
    return Object.entries(stats).map(([key]) => {
      return <th key={key}>{key.toUpperCase()}</th>;
    });
  };

  return (
    <table className="stats w3-table-all w3-white w3-card">
      <tbody>
        <tr className="subheading w3-orange w3-text-white">
          <th>Stats</th>
          {getStatsTableHeading()}
        </tr>
        {stats &&
          Object.entries(statTypes).map(([type, title]) => {
            return (
              <StatRow key={type} type={type} title={title} data={stats} />
            );
          })}
      </tbody>
    </table>
  );
};

export default StatsList;
