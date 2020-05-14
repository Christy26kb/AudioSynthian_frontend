import React from 'react';
import ReactStopwatch from 'react-stopwatch';

const Stopwatch = () => (
  <ReactStopwatch
    seconds={0}
    minutes={0}
    hours={0}
    limit="10:00:00"
    onChange={({ hours, minutes, seconds }) => {
      // do something
    }}
    onCallback={() => {}}
    render={({ formatted, hours, minutes, seconds }) => {
      return (
        <div>
          <p>
            Formatted: {formatted}
          </p>
          <p>
            Hours: {hours}
          </p>
          <p>
            Minutes: {minutes}
          </p>
          <p>
            Seconds: {seconds}
          </p>
        </div>
      );
    }}
   />
);

export default Stopwatch;
