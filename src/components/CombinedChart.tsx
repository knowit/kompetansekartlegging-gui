import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer, ReferenceLine } from 'recharts';
import { GetIcon } from '../icons/iconController';
import { KnowitColors } from '../styles';
import { CombinedChartProps } from '../types';

const numTicks = 5;
const chartSplitAt = numTicks + 2;
const heightPerColumn = 60;

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
        fontFamily: "Arial",
        fontSize: "20px",
        fontWeight: "bold",
        textAnchor: "start"
    },
    knowledge: {
        color: KnowitColors.greyGreen
    },
    motivation: {
        color: KnowitColors.darkGreen
    },
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
  });

export const CombinedChart = ( {...props}: CombinedChartProps ) => {

    let classes = useStyles();

    return (
        <div className={classes.container}>
        <ResponsiveContainer width='100%' height={heightPerColumn * props.chartData.length}>     
            <BarChart barGap={-15} barSize={15} maxBarSize={15} layout="vertical" data={props.chartData} margin={{top: 50, right: 0, bottom: 6, left: 0}}>
            <CartesianGrid horizontal={true} vertical={false} strokeDasharray="2 5"/>
                <XAxis
                    tickLine={false}
                    axisLine={false}
                    orientation="top"
                    dataKey="value"
                    type="number"
                    padding={{ left: 0, right: 20 }}
                    domain={[0, chartSplitAt + numTicks]}
                    ticks={[0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12]}
                    tick={renderCustomAxisTicks()}
                />
                <YAxis width={200} dataKey="name" type="category" interval={0}/>
                <Tooltip content={RenderCustomTooltip(classes)}/>
                <Bar radius={[0, 10, 10, 0]} dataKey="valueKnowledge" fill={KnowitColors.darkGreen} />
                <Bar radius={[0, 10, 10, 0]} dataKey="valueMotivation" fill={KnowitColors.lightGreen} />
                <ReferenceLine x={0} stroke="green">
                    <Label className={classes.label} position="top" offset={50} >KOMPETANSE</Label>
                </ReferenceLine>
                <ReferenceLine x={chartSplitAt} stroke="green">
                    <Label className={classes.label} position="top" offset={50} >MOTIVASJON</Label>
                </ReferenceLine>
            </BarChart>
        </ResponsiveContainer>
        </div>
    );
};

// const renderCustomBarLabel = ({...props}: BarLabelProps) => {
//     let displayValue = Number(props.value);
//     if (displayValue >= chartSplitAt) {
//         displayValue -= chartSplitAt;
//     }
// if (props.width && (displayValue) > 0.5)
//     return <text x={props.x + props.width - 24} y={props.y + props.height} dy={-2} fill={KnowitColors.darkGreen} textAnchor="middle">{displayValue.toFixed(1)}</text>;
// };

const renderCustomAxisTicks = () => {
    return ( {...props}:TickProps ) => {
        let isKnowledge = true;
        let iconNumber = props.payload.value;
        if (props.payload.value >= chartSplitAt) {
            iconNumber -= chartSplitAt;
            isKnowledge = false;
        }
        return (
            <svg x={props.x-12} y={props.y-24} width={24} height={24} fill={KnowitColors.darkGreen}>
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