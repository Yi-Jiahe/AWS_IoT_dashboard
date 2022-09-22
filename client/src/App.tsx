import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Graph } from './Graph';

function App() {
  const [environmentalData, setEnvironmentalData] = useState({
    "timestamps": [],
    "temperatures": [],
    "humidities": []
  });

  useEffect(() => {
    fetch('http://127.0.0.1:5000/environmental_data')
    .then(data=>{return data.json()})
    .then(res=>{
      setEnvironmentalData({
        "timestamps": res["timestamps"],
        "temperatures": res["temperatures"],
        "humidities": res["humidities"]
      });
    });
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <Graph data={environmentalData} />
      </header>
    </div>
  );
}

export default App;
