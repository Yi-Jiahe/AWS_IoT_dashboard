import React, { useEffect, useRef } from 'react';
import * as d3 from "d3";

// type EnvironmentalData = {
//     timestamps: Array<number>;
//     temperatures: Array<number>;
//     humidities: Array<number>; 
// };

// function Graph({data}: {data: EnvironmentalData}) {
function Graph({data}) {
    useEffect(() => {
        const svg = d3.select('svg');
        svg.selectAll('circle')
        // .data(data)
        // .enter();
    }, []);

    return (<div>
        <svg/>
    </div>);
}

export {Graph};