import React, { useEffect, useState } from 'react';
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

        let data = environmentData;
        data = data.filter((d) => {return d['temperature'] !== null;});
        data = environmentData.sort((a,b) => parseInt(a['timestamp']) < parseInt(b['timestamp']));

        data.forEach((d) => {
            timestamps.push(new Date(parseInt(d['timestamp'])));
            temperatures.push(d['temperature']);
            humidities.push(d['humidity']);
        });

        const trace1 = {
            x: timestamps,
            y: temperatures,
            name: 'Temperature',
            type: 'scatter'
        };
        const trace2 = {
            x: timestamps,
            y: humidities,
            name: 'Humidity',
            yaxis: 'y2',
            type: 'scatter'
        }

        data = [trace1, trace2];

        console.log("data-out", data);

        setPlotData(data);
    }, [environmentData]);

    return (<div>
        <Plot 
            data={plotData}
            layout={{
                title: 'Environmental Data',
                xaxis: {title: 'Time'},
                yaxis: {
                    title: 'Temperature/°C',
                    range: [18, 35],
                    autorange: false
                },
                yaxis2: {
                  title: 'Humidity/%',
                  overlaying: 'y',
                  side: 'right',
                  range: [0, 100],
                  autorange: false
                }
            }}/>
    </div>);
}

export {Graph};