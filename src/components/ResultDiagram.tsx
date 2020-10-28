import React, { Fragment, useEffect, useState } from 'react'
import { HorizontalBar } from 'react-chartjs-2';
import { roundDecimals } from '../helperFunctions';
import { KnowitColors } from '../styles';
import { AnswerData, CalculationData, ResultData } from '../types'
import { makeStyles } from '@material-ui/core/styles'

const graphStyle = makeStyles({
    chart: {
        width: '40%',
        maxHeight: '80%'
    },
    iconBar: {
        height: 30,
        background: 'red'
    }
});

// let temp = true;

// const plugins = [{
//     afterDraw: (chart: any) => {
//         let ctx = chart.chart.ctx;
//         // ctx.save();
//         let xAxis = chart.scales['x-axis-0'];
//         let yAxis = chart.scales['y-axis-0'];
//         if(temp) {
//             console.log("Axis");
//             console.log(xAxis);
//         }
//         yAxis.ticks.forEach((value: any, index: any) => {
//             let y = xAxis.getPixelForTick(index);
//             let image = new Image();
//             image.src = '../icons/K - ekspert.svg';
//             if(temp) console.log(image);
//             ctx.drawImage(image, y - 12, xAxis.bottom + 10);
//         });
//         if(temp) temp = false;
//         // ctx.restore();    
//     }
// }];

const graphOptions = {
    maintainAspectRatio: false,
    layout: {
        margin: {
            bottom: -50
        }
    },
    legend: {
        labels: {
            fontColor: 'black'
        }
    },
    scales: {
        yAxes: [{
            gridLines: {
                color: '#E4E0DC'
            },
            ticks: {
                fontColor: 'black',
                fontSize: 1
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

    return (
        <Fragment>
            <div className={style.chart}>
                <HorizontalBar
                    redraw={props.boolDraw}
                    data={{
                        labels: answerData.map(value => " "),
                        datasets: [
                            {
                                label: 'Knowledge',
                                backgroundColor: KnowitColors.lightGreen,
                                borderWidth: 1,
                                data: answerData.map(value => value.averageKnowledge)
                            }
                        ]
                    }}
                    options={graphOptions}
                    // plugins={plugins}
                />
                <div className={style.iconBar}>
                    0, 1, 2, 3, 4, 5
                </div>
            </div>
            <div className={style.chart}>
                <HorizontalBar
                    redraw={props.boolDraw}
                    data={{
                        labels: answerData.map(value => " "),
                        datasets: [
                            {
                                label: 'Motivation',
                                backgroundColor: KnowitColors.greyGreen,
                                borderWidth: 1,
                                data: answerData.map(value => value.averageMotivation)
                            }
                        ]
                    }}
                    options={graphOptions}
                />
            </div>
        </Fragment>
    );
};
