import React from 'react';

type EnvironmentalData = {
    timestamps: Array<number>;
    temperatures: Array<number>;
    humidities: Array<number>; 
};

function Graph({data}: {data: EnvironmentalData}) {
    console.log(data);

    return (<div>

    </div>);
}

export {Graph};