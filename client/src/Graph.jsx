import React, { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';

// type EnvironmentalData = {
//     timestamps: Array<number>;
//     temperatures: Array<number>;
//     humidities: Array<number>; 
// };

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000

// function Graph({data}: {data: EnvironmentalData}) {
function Graph({environmentData}) {
    const [plotData, setPlotData] = useState([]);

    useEffect(() => {
        console.log("data-in", environmentData);

        const timestamps = [];
        const temperatures = [];
        const humidities = [];

        let data = environmentData.filter((d) => {return d['temperature'] !== null;});

        data = environmentData.sort((a,b) => parseInt(a['timestamp']) < parseInt(b['timestamp']));

        environmentData.forEach((d) => {
            timestamps.push(parseInt(d['timestamp']));
            temperatures.push(d['temperature']);
            humidities.push(d['humidity']);
        });

        data = [{
            x: timestamps,
            y: temperatures
        }];

        console.log("data-out", data);

        setPlotData(data);
    }, [environmentData]);

    return (<div>
        <Plot data={plotData}/>
    </div>);
}

export {Graph};