import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import { Graph } from './Graph';

function App() {
  const [deviceName, setDeviceName] = useState('esp32-thermostat');
  const [history, setHistory] = useState(1);
  const [environmentalData, setEnvironmentalData] = useState({
    "timestamps": [],
    "temperatures": [],
    "humidities": []
  });

  const getEnvironmentalData = useCallback(() => {
    fetch(`http://127.0.0.1:5000/environmental_data?device_name=${deviceName}&history=${history}`)
    .then(data=>{return data.json()})
    .then(res=>{
      setEnvironmentalData({
        "timestamps": res["timestamps"],
        "temperatures": res["temperatures"],
        "humidities": res["humidities"]
      });
    });
  }, [deviceName, history]);

  useEffect(() => {
    getEnvironmentalData();
  }, [])

  const onDeviceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceName(event.currentTarget.value);
  };

  const onHistoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value == '') {
      setHistory(0);
    } else {
      setHistory(parseFloat(event.currentTarget.value));
    };
  };

  const handleSubmit = (event:  React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getEnvironmentalData();
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label>
            Device Name
            <input value={deviceName} onChange={onDeviceNameChange} />
          </label>
          <label>
            History
            <input value={history} onChange={onHistoryChange} type="number"/>days
          </label>
          <input type="submit" value="Retrieve Data"/>
        </form>
        <Graph data={environmentalData} />
      </header>
    </div>
  );
}

export default App;
