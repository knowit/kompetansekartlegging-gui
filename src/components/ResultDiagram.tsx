import React, { Fragment, ReactSVGElement, useEffect, useState } from 'react'
import { HorizontalBar } from 'react-chartjs-2';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer, ReferenceLine } from 'recharts';
import { limitStringLength, roundDecimals } from '../helperFunctions';
import { KnowitColors } from '../styles';
import { AnswerData, CalculationData, ResultData } from '../types'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { GetIcon, GetIcons } from '../icons/iconController';
import { SvgIconTypeMap } from '@material-ui/core';

const graphStyle = makeStyles({
    chart: {
        width: '100%',
        maxHeight: '100%',
        paddingBottom: 10
    },
    iconBar: {
        height: 24 ,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconBarK: {
        marginLeft: '30%'
    },
    icon: {
        height: '100%'
    },
    categoryList: {
        marginTop: '2%',
        marginBottom: '4.5%',
        textAlign: 'right',
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    category: {
        fontSize: '0.95vw',
    },
    container: {
        display: 'flex',
        width: '60%'
    }
});

const graphOptions = {
    maintainAspectRatio: false,
    legend: {
        display: false
    },
    tooltips: {
        callbacks: {
            label: function(tooltipItem: any, data: any) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                // if (label) {
                //     label += ': ';
                // }
                // label += Math.round(tooltipItem.xLabel * 100) / 100;
                return label;
            },
            labelColor: function(tooltipItem: any, chart: any) {
                return "";
            },
        }
    },
    scales: {
        yAxes: [{
            gridLines: {
                color: '#E4E0DC'
            },
            ticks: {
                fontColor: 'black',
                callback: (value: string) => {
                    if(value === " ") return " ";
                    return limitStringLength(value, 30, true);
                }
            }
        }],
        xAxes: [{
            gridLines: {
                color: '#E4E0DC'
            },
            ticks: {
                fontColor: 'black',
                fontSize: 1,
                beginAtZero: true,
                max: 5,
                stepSize: 1,
                callback: (/*value, index, values*/) => {
                    return " ";
                }
            }
        }]
    }
};

export default function ResultDiagram(props: { data: AnswerData[], boolDraw: boolean }) {
    const style = graphStyle();

    const [answerData, setAnswerData] = useState<ResultData[]>([]);

    useEffect(() => {
        if (answerData.length === 0) {
            let result: ResultData[] = [];
            props.data.forEach(dat => {
                let cat = result.find(res => res.category === dat.category);
                if (!cat) {
                    result.push({
                        category: dat.category,
                        averageKnowledge: 0,
                        averageMotivation: 0
                    });
                }
            });
            setAnswerData(result);
        }
    }, [props.data]);

    useEffect(() => {
        createData();
    }, [props.data, props.boolDraw]);

    const createData = () => {
        let calcData: CalculationData[] = [];
        props.data.forEach(dat => {
            if (dat.knowledge < 0 && dat.motivation < 0) return;
            let catIndex = calcData.findIndex(calc => calc.category === dat.category);
            if (catIndex === -1) {
                catIndex = calcData.length;
                calcData.push({
                    category: dat.category,
                    knowledgeCount: 0,
                    knowledgeTotal: 0,
                    motivationCount: 0,
                    motivationTotal: 0,
                    questionIds: []
                });
            }
            if (dat.knowledge >= 0) {
                calcData[catIndex].knowledgeCount += 1;
                calcData[catIndex].knowledgeTotal += dat.knowledge;
            }
            if (dat.motivation >= 0) {
                calcData[catIndex].motivationCount += 1;
                calcData[catIndex].motivationTotal += dat.motivation;
            }
        });
        calcData.forEach(dat => {
            let answers = [...answerData];
            let resIndex = answers.findIndex(ans => ans.category === dat.category);
            if (resIndex === -1) return;
            answers[resIndex].averageKnowledge = roundDecimals(dat.knowledgeTotal / dat.knowledgeCount || 0, 1);
            answers[resIndex].averageMotivation = roundDecimals(dat.motivationTotal / dat.motivationCount || 0, 1);
            setAnswerData(answers);
        });
    };

    let chartData: ChartData[] = answerData.map(
        (answer) => ({
            name: answer.category,
            valueKnowledge: [0, answer.averageKnowledge],
            valueMotivation: [7, 7 + answer.averageMotivation],
        })
    )

    return (
        <div className={style.container}>
            <Fragment>
                <div className={style.chart}>
                <ResponsiveContainer width='100%' height="100%">    
                        <BarChart barGap={-24} barSize={24} maxBarSize={24} layout="vertical" data={chartData} margin={{top: 24, right: 0, bottom: 0, left: 0}}>
                        <CartesianGrid horizontal={true} strokeDasharray="2 5"/>
                            <XAxis dataKey="value" type="number" padding={{ left: 0, right: 20 }} domain={[0,12]} tickCount={13} tick={renderCustomAxisTicks()}/>
                            <YAxis width={200} dataKey="name" type="category"/>
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
                </div>
            </Fragment>
        </div>
    );
};

const renderCustomBarLabel = ({...props}: BarLabelProps) => {
    console.log(props)
    if (props.width && (Number(props.value) > 0.5))
    return <text x={props.x + props.width - 24} y={props.y + props.height} dy={-4} fill={KnowitColors.darkGreen} textAnchor="middle">{Number(props.value).toFixed(1)}</text>;
  };

const renderCustomAxisTicks = () => {
    return ( {...props}:TickProps ) => {
        let isKnowledge = true;
        let iconModifier = -7;
        let iconNumber = props.payload.value;
        if (props.payload.value >= 7) {
            iconNumber += iconModifier;
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

type ChartData = {
    name: string,
    valueKnowledge: number[]
    valueMotivation: number[]
}