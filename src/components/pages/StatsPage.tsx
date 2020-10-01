import React from 'react'
import { StatsProps } from '../../types';
import RadarPlot from '../RadarPlot';



const StatsPage = ({...props}: StatsProps) => {





    return(
        <div>
            <div style={{ height: '500px', width: '500px' }}><RadarPlot data={props.data} /></div>
        </div>
    );

};

export default StatsPage;