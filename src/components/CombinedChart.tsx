import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer, ReferenceLine } from 'recharts';
import { GetIcon } from '../icons/iconController';
import { KnowitColors } from '../styles';
import { ChartData, CombinedChartProps } from '../types';

const numTicks = 5;
const chartSplitAt = numTicks + 2;

const useStyles = makeStyles({
    root: {
        backgroundColor: KnowitColors.white,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        opacity: 0.9,
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: KnowitColors.darkBrown
    },
    label: {
        color: KnowitColors.darkBrown,
        fontWeight: "bold",
    },
    knowledge: {
        color: KnowitColors.greyGreen
    },
    motivation: {
        color: KnowitColors.darkGreen
    }
  });

export const CombinedChart = ( {...props}: CombinedChartProps ) => {

    let classes = useStyles();

    return (
        <ResponsiveContainer width='100%' height="100%">     
            <BarChart barGap={-15} barSize={15} maxBarSize={15} layout="vertical" data={props.chartData} margin={{top: 24, right: 0, bottom: 6, left: 0}}>
            <CartesianGrid horizontal={true} strokeDasharray="2 5"/>
                <XAxis dataKey="value" type="number" padding={{ left: 0, right: 20 }} domain={[0, chartSplitAt + numTicks]} tickCount={chartSplitAt + numTicks + 1} tick={renderCustomAxisTicks()}/>
                <YAxis width={200} dataKey="name" type="category" interval={0}/>
                <Tooltip content={RenderCustomTooltip(classes)}/>
                <Bar radius={[0, 10, 10, 0]} dataKey="valueKnowledge" fill={KnowitColors.lightGreen} label={renderCustomBarLabel} />
                <Bar radius={[0, 10, 10, 0]} dataKey="valueMotivation" fill={KnowitColors.greyGreen} label={renderCustomBarLabel} />
                <ReferenceLine x={0} stroke="green">
                    <Label position="top" >Kunnskap</Label>
                </ReferenceLine>
                <ReferenceLine x={chartSplitAt} stroke="green">
                    <Label position="top" >Motivasjon</Label>
                </ReferenceLine>
            </BarChart>
        </ResponsiveContainer>
    );
};

const renderCustomBarLabel = ({...props}: BarLabelProps) => {
    let displayValue = Number(props.value);
    if (displayValue >= chartSplitAt) {
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
            <svg x={props.x-12} y={props.y} width={24} height={24} fill={KnowitColors.darkGreen}>
                {GetIcon(isKnowledge, Math.round(iconNumber))};
            </svg>
            
        );
    };
}

const RenderCustomTooltip = (classes: any) => {
    return ({...props}: ToolTipProps) => {
        if (props.active && props.payload) {
            let knowledgeValue = props.payload[0]?.payload.valueKnowledge[1].toFixed(1);
            let motivationValue = (props.payload[1]?.payload.valueMotivation[1] - chartSplitAt).toFixed(1);
            return (
                <div className={classes.root}>
                    <p className={classes.label}>{props.label}</p>
                    <p className={classes.knowledge}>
                        {`Kunnskap: ${knowledgeValue}`}
                    </p>
                    <p className={classes.motivation}>
                        {`Motivasjon: ${motivationValue}`}
                    </p>
            </div>
        );
    }
    return null;
    }
};

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

type ToolTipProps = {
    className: string,
    active: boolean,
    payload: any,
    label: any
}