import React, { useEffect } from 'react';

type EnvironmentalData = {
    timestamps: Array<number>;
    temperatures: Array<number>;
    humidities: Array<number>; 
};

function Graph({data}: {data: EnvironmentalData}) {
    useEffect(() => {
        console.log(data);
    }, []);

    return (<div>
        {data.humidities}
    </div>);
}

export {Graph};