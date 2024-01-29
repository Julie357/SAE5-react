
import React from 'react';
import Dashboard from '../composants/Dashboard';
import Stock from '../composants/Stock';


const Dash = () => {
  return (
    <div>
    <div>
      <h1>Le dashboard en question</h1>
      <Dashboard/>
      </div>

      <div>
      <h1>La version en graph</h1>
      <Stock width={400} height={300}/>
      </div>
      </div>
  );
};

export default Dash;