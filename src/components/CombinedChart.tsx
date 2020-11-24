import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer, ReferenceLine } from 'recharts';
import { GetIcon } from '../icons/iconController';
import { KnowitColors } from '../styles';
import { ChartData, CombinedChartProps } from '../types';


export const CombinedChart = ( {...props}: CombinedChartProps ) => {
    return (
        <ResponsiveContainer width='100%' height="100%">     
            <BarChart barGap={-15} barSize={15} maxBarSize={15} layout="vertical" data={props.chartData} margin={{top: 24, right: 0, bottom: 6, left: 0}}>
            <CartesianGrid horizontal={true} strokeDasharray="2 5"/>
                <XAxis dataKey="value" type="number" padding={{ left: 0, right: 20 }} domain={[0,12]} tickCount={13} tick={renderCustomAxisTicks()}/>
                <YAxis width={200} dataKey="name" type="category" interval={0}/>
                <Tooltip />
                <Bar radius={[0, 10, 10, 0]} dataKey="valueKnowledge" fill={KnowitColors.lightGreen} label={renderCustomBarLabel} />
                <Bar radius={[0, 10, 10, 0]} dataKey="valueMotivation" fill={KnowitColors.greyGreen} label={renderCustomBarLabel} />
                <ReferenceLine x={0} stroke="green">
                    <Label position="top" >Kunnskap</Label>
                </ReferenceLine>
                <ReferenceLine x={7} stroke="green">
                    <Label position="top" >Motivasjon</Label>
                </ReferenceLine>
            </BarChart>
        </ResponsiveContainer>
    );
};

const chartSplitAt = 7;

const renderCustomBarLabel = ({...props}: BarLabelProps) => {
    let displayValue = Number(props.value);
    if (displayValue >= 7) {
        displayValue -= chartSplitAt;
    }
if (props.width && (displayValue) > 0.5)
    return <text x={props.x + props.width - 24} y={props.y + props.height} dy={-2} fill={KnowitColors.darkGreen} textAnchor="middle">{displayValue.toFixed(1)}</text>;
};

const renderCustomAxisTicks = () => {
    return ( {...props}:TickProps ) => {
        let isKnowledge = true;
        let iconNumber = props.payload.value;
        if (props.payload.value >= chartSplitAt) {
            iconNumber -= chartSplitAt;
            isKnowledge = false;
        }
        return (
            <svg x={props.x-12} y={props.y} width={24} height={24} viewBox="0 0 1024 1024" fill="#666">
                {GetIcon(isKnowledge, Math.round(iconNumber))};
            </svg>
            
        );
    };
}

type BarLabelProps = {
x: number,
y: number,
width: number,
height: number,
value: string
}

type TickProps = {
knowledge: boolean,
x: number,
y: number,
payload: {
    value: any
}
}