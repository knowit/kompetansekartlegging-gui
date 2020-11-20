import React, { Fragment, ReactSVGElement, useEffect, useState } from 'react'
import { HorizontalBar } from 'react-chartjs-2';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { limitStringLength, roundDecimals } from '../helperFunctions';
import { KnowitColors } from '../styles';
import { AnswerData, CalculationData, ResultData } from '../types'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { SvgIconComponent } from '@material-ui/icons';
import { GetIcon, GetIcons } from '../icons/iconController';
import { SvgIconTypeMap } from '@material-ui/core';

const graphStyle = makeStyles({
    leadingChart: {
        width: '60%',
        maxHeight: '100%',
        paddingBottom: 10
    },
    chart: {
        width: '40%',
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

    let knowledgeData: ChartData[] = answerData.map(
        (answer) => ({
            name: answer.category, value: answer.averageKnowledge
        })
    )

    let motivationData: ChartData[] = answerData.map(
        (answer) => ({
            name: answer.category, value: answer.averageMotivation
        })
    )

    return (
        <div className={style.container}>
            <Fragment>
            {/* <div className={style.categoryList}>
                {answerData.map((value, index) => <div key={index} className={style.category}>{value.category}</div>)}
            </div> */}
            <div className={style.leadingChart}>
            <ResponsiveContainer width='100%' height="100%">    
                    <BarChart maxBarSize={20} layout="vertical" data={knowledgeData}>
                    <CartesianGrid horizontal={false} strokeDasharray="2 5"/>
                        <XAxis dataKey="value" type="number" padding={{ left: 0, right: 20 }} domain={[0,5]} tickCount={6} tick={renderCustomAxisTicks(true)}/>
                        <YAxis width={200} dataKey="name" type="category"/>
                        <Tooltip />
                        <Bar radius={[0, 10, 10, 0]} dataKey="value" fill={KnowitColors.lightGreen} label={renderCustomBarLabel} />
                        <Legend layout="horizontal" verticalAlign="top" align="center" payload={[{ value: 'KOMPETANSE', type: 'line', id: 'ID01' }]}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className={style.chart}>
                <ResponsiveContainer width='100%' height="100%">    
                    <BarChart maxBarSize={20} layout="vertical" data={motivationData}>
                        <CartesianGrid horizontal={false} strokeDasharray="2 5"/>
                        <XAxis dataKey="value" type="number" padding={{ left: 0, right: 20 }} domain={[0,5]} tickCount={6} tick={renderCustomAxisTicks(false)}/>
                        <YAxis width={10} dataKey="name" type="category" tick={false}/>
                        <Tooltip />
                        <Bar radius={[0, 10, 10, 0]} dataKey="value" fill={KnowitColors.greyGreen} label={renderCustomBarLabel}/>
                        <Legend layout="horizontal" verticalAlign="top" align="left" payload={[{ value: 'MOTIVASJON', type: 'line', id: 'ID01' }]}/>
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

const renderCustomAxisTicks = ( isKnowledge: boolean) => {
    return ( {...props}:TickProps ) => {
        return (
            <svg x={props.x-12} y={props.y} width={24} height={24} viewBox="0 0 1024 1024" fill="#666">
                {GetIcon(isKnowledge, Math.round(props.payload.value))};
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
    value: number
}

const data = [
    {
      "name": "Skyteknologi",
      "value": 3
    }
  ]