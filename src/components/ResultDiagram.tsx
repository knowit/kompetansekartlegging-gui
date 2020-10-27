import React, { Fragment, useEffect, useState } from 'react'
import { HorizontalBar } from 'react-chartjs-2';
import { roundDecimals } from '../helperFunctions';
import { KnowitColors } from '../styles';
import { AnswerData, CalculationData, ResultData } from '../types'
import { makeStyles } from '@material-ui/core/styles'
import { Icon } from '@material-ui/core';
import { K0 } from '../icons/iconController';
import { couldStartTrivia } from 'typescript';

const graphStyle = makeStyles((theme) => ({
    knowledgeChart: {
        width: '58.8%',

    },
    motivationChart: {
        width: '41.2%'
    }
}));

const plugins = [{
    afterDraw: (chart: any) => {
        console.log("After draw");
        let ctx = chart.chart.ctx;
        ctx.save();
        let xAxis = chart.scales['x-axis-0'];
        let yAxis = chart.scales['y-axis-0'];
        xAxis.ticks.forEach((value: any, index: any) => {
            let x = xAxis.getPixelForTick(index);
            let image = new Image();
            image.src = '../icons/K - ekspert.svg';
            ctx.drawImage(image, x - 12, yAxis.bottom + 10);
        });
        ctx.restore();    
    }
}];

const graphOptions = {
    
    plugins: {plugins},
    maintainAspectRatio: false,
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
                fontColor: 'black'
            }
        }],
        xAxes: [{
            gridLines: {
                color: '#E4E0DC'
            },
            ticks: {
                fontColor: 'black',
                beginAtZero: true,
                max: 5,
                // callback: (/*value, index, values*/) => {
                //     let img = new Image();
                //     img.src = '../icons/K - ekspert.svg'
                //     return img;
                // }
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
            <div className={style.knowledgeChart}>
                <HorizontalBar
                    redraw={props.boolDraw}
                    data={{
                        labels: answerData.map(value => value.category),
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
                />
            </div>
            <div className={style.motivationChart}>
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
