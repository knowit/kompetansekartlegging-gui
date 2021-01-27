import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer, ReferenceLine, Brush } from 'recharts';
import { GetIcon } from '../icons/iconController';
import { KnowitColors } from '../styles';
import { ChartData, CombinedChartProps } from '../types';
import { wrapString } from '../helperFunctions';
import { useSwipeable } from "react-swipeable";

const numTicks = 5;
const chartSplitAt = numTicks + 2;
const iconSize = 18;

const pageEntryLimit = 6;

const useStyles = makeStyles({
    tooltip: {
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
    },
    chartContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bulletRoot: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pageBullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 4,
        marginRight: 4,
        backgroundColor: KnowitColors.lightGreen 
    },
    pageBulletCurrent: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 4,
        marginRight: 4,
        backgroundColor: KnowitColors.darkGreen 
    },
    // Removes svg lines framing the chart to more closely correspond with desired design.
    '@global': {
        'g.recharts-cartesian-grid-vertical > line:last-child': {
            display: "none"
        },
        'g.recharts-cartesian-grid-vertical > line:nth-last-child(2)': {
            display: "none"
        },
        'g.recharts-cartesian-grid-horizontal > line:last-child': {
            display: "none"
        },
        'g.recharts-cartesian-grid-horizontal > line:nth-last-child(2)': {
            display: "none"
        }
    }
  });

export const CombinedChartMobile = ( {...props}: CombinedChartProps ) => {

    const [chartPages, setChartPages] = useState<ChartData[][]>([]);
    const [currentPage, setCurrentPage] = useState(0);

    let classes = useStyles();

    useEffect(() => {
        setChartPages(createPagedData());
    }, [props.chartData]);

    const createPagedData = (): ChartData[][] => {
        let pagedData: ChartData[][] = [];
        let items = props.chartData.length;
        let i = 0;
        while(items > 0) {
            pagedData.push(props.chartData.slice(i, i + pageEntryLimit))
            i += pageEntryLimit;
            items -= pageEntryLimit;
        }
        return pagedData;
    }

    const createPager = (): JSX.Element => {
        return (
            <div className={classes.bulletRoot}>
                {chartPages
                    .map((_, index) => 
                        (index === currentPage ?
                            <div key={index} className={classes.pageBulletCurrent}/>
                            :
                            <div key={index} className={classes.pageBullet}/>
                        )
                    )
                }
            </div>
        )
    }

    const handleChangePageClick = () => {
        changePageRight();
    };

    const changePageLeft = () => {
        if (currentPage === 0) {
            setCurrentPage(chartPages.length - 1);
        } else {
            setCurrentPage(currentPage - 1);
        }
    }

    const changePageRight = () => {
        if (currentPage === chartPages.length - 1) {
            setCurrentPage(0);
        } else {
            setCurrentPage(currentPage + 1);
        }
    }

    const swipeConfig = {
        delta: 10,
        preventDefaultTouchmoveEvent: false,
        trackTouch: true, 
        trackMouse: false,
        rotationAngle: 0,
      }

      const swipeHandlers = useSwipeable({
        onSwipedLeft: (eventData) => changePageLeft(),
        onSwipedRight: (eventData) => changePageRight(),
        ...swipeConfig,
    });

    return (
        <div className={classes.chartContainer} {...swipeHandlers} >
            <ResponsiveContainer>     
                <BarChart
                    barGap={-10}
                    barSize={10}
                    maxBarSize={10}
                    layout="horizontal"
                    data={chartPages[currentPage]}
                    margin={{top: 50, right: 20, bottom: 10, left: -30}}>
                <CartesianGrid horizontal={true} strokeDasharray="2 5"/>
                    <YAxis
                        axisLine={false}
                        dataKey="value"
                        type="number"
                        padding={{ top: 20, bottom: 20 }}
                        domain={[0, chartSplitAt + numTicks]}
                        ticks={[0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12]}
                        tickLine={false}
                        tick={renderCustomAxisTicks()} 
                        minTickGap={-5}
                    />
                    <XAxis
                        orientation="top"
                        axisLine={false}
                        dataKey="name"
                        type="category"
                        interval={0}
                        tickLine={false}
                        tick={renderLabelTick}
                    />
                    {/* <Tooltip content={renderCustomTooltip(classes)}/> */}
                    <Bar radius={[10, 10, 0, 0]} dataKey="valueKnowledge" fill={KnowitColors.lightGreen}/>
                    <Bar radius={[10, 10, 0, 0]} dataKey="valueMotivation" fill={KnowitColors.greyGreen}/>
                    <ReferenceLine y={0} stroke="green" >
                        <Label position="insideTopRight" fontSize={12} fontWeight="bold" fill={KnowitColors.darkBrown}>KOMPETANSE</Label>
                    </ReferenceLine>
                    <ReferenceLine y={0.1} stroke={KnowitColors.darkGreen} strokeWidth={1}></ReferenceLine>
                    <ReferenceLine y={0} stroke={KnowitColors.creme} strokeWidth={3}></ReferenceLine>
                    <ReferenceLine y={chartSplitAt} stroke="green" >
                        <Label position="insideTopRight" fontSize={12} fontWeight="bold" fill={KnowitColors.darkBrown}>MOTIVASJON</Label>
                    </ReferenceLine>
                    <ReferenceLine y={chartSplitAt-0.1} stroke={KnowitColors.creme} strokeWidth={3}></ReferenceLine>
                </BarChart>
            </ResponsiveContainer>
            {(pageEntryLimit < props.chartData.length) ? <div onClick={handleChangePageClick} >{createPager()}</div> : ""}
        </div>
    );
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
            <svg x={props.x-iconSize} y={props.y-(iconSize/2)} width={iconSize} height={iconSize} fill="black">
                {GetIcon(isKnowledge, Math.round(iconNumber))};
            </svg>
            
        );
    };
}

const renderLabelTick = ({...props}: TickLabelProps) => {
    let dy = (props.index % 2) ? "-1em" : "-6em";
    return (
        <g transform={`translate(${props.x},${props.y})`}>
            <text
                x={0}
                y={dy}
                textAnchor="middle"
                fontSize={10}
                fontWeight="bold"
                fill={KnowitColors.darkGreen}
            >
                {wrapString(props.payload.value, 15).map( (s: string, index: number) =>
                    <tspan key={index} x="0" dy="1em">{s}</tspan> 
                )}
            </text>
        </g>
    );
}

const renderCustomTooltip = (classes: any) => {
    return ({...props}: ToolTipProps) => {
        if (props.active && props.payload) {
            let knowledgeValue = props.payload[0]?.payload.valueKnowledge[1].toFixed(1);
            let motivationValue = (props.payload[1]?.payload.valueMotivation[1] - chartSplitAt).toFixed(1);
            return (
                <div className={classes.tooltip}>
                    <p className={classes.label}>{props.label}</p>
                    <p className={classes.knowledge}>
                        {`Kompetanse: ${knowledgeValue}`}
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

type TickProps = {
    knowledge: boolean,
    x: number,
    y: number,
    payload: {
        value: any
    }
}

type TickLabelProps = {
    x: number,
    y: number,
    index: number,
    visibleTicksCount: number,
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