import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";

// type EnvironmentalData = {
//     timestamps: Array<number>;
//     temperatures: Array<number>;
//     humidities: Array<number>; 
// };

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000

// function Graph({data}: {data: EnvironmentalData}) {
function Graph({data}) {
    useEffect(() => {
        console.log("data", data);

        // Milliseconds since epoch
        const timeNow = new Date().getTime();


        const svg = d3.select('svg');
        svg.selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', d => (timeNow - d['timestamp']) / MILLISECONDS_PER_DAY * 10)
        .attr('cy', d => d['temperature'])
        .attr('r', 5);
    }, [data]);

    return (<div>
        <svg width={300} height={400} />
    </div>);
}

export {Graph};