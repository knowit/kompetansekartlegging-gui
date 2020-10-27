import React, { Fragment, useEffect, useState } from 'react'
import { HorizontalBar } from 'react-chartjs-2';
import { roundDecimals } from '../helperFunctions';
import { KnowitColors } from '../styles';
import { AnswerData, CalculationData, ResultData } from '../types'
import { makeStyles } from '@material-ui/core/styles'

const style = makeStyles((theme) => ({
    knowledgeChart: {
        width: '58%',

    },
    motivationChart: {
        width: '42%'
    }
}));

export default function ResultDiagram(props: { data: AnswerData[], boolDraw: boolean }) {
    const classes = style();

    const [answerData, setAnswerData] = useState<ResultData[]>([]);
    
    useEffect(() => {
        if(answerData.length === 0){
            let result: ResultData[] = [];
            props.data.forEach(dat => {
                let cat = result.find(res => res.category === dat.category);
                if(!cat){
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
            if(dat.knowledge < 0 && dat.motivation < 0) return;
            let catIndex = calcData.findIndex(calc => calc.category === dat.category);
            if(catIndex === -1){
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
            if(dat.knowledge >= 0){
                calcData[catIndex].knowledgeCount += 1;
                calcData[catIndex].knowledgeTotal += dat.knowledge;
            }
            if(dat.motivation >= 0){
                calcData[catIndex].motivationCount += 1;
                calcData[catIndex].motivationTotal += dat.motivation;
            }
        });
        calcData.forEach(dat => {
            let answers = [...answerData];
            let resIndex = answers.findIndex(ans => ans.category === dat.category);
            if(resIndex === -1) return;
            answers[resIndex].averageKnowledge = roundDecimals(dat.knowledgeTotal / dat.knowledgeCount || 0, 1);
            answers[resIndex].averageMotivation = roundDecimals(dat.motivationTotal / dat.motivationCount || 0, 1);
            setAnswerData(answers);
        });
    };

    // useEffect(() => {
    //     console.log(props.boolDraw);
    // }, [props.boolDraw]);

    // TODO: del opp i to horizontalbar. drop labels i motivation. Splitt opp knowledge og motivation i to forskjellige
    return (
        <Fragment>
            <div className={classes.knowledgeChart}>
            <HorizontalBar 
                redraw={props.boolDraw}
                data={{
                    labels: answerData.map(value => value.category),
                    datasets: [
                        {
                            label: 'Knowledge',
                            backgroundColor: KnowitColors.lightGreen, //'rgba(255,99,132,0.2)',
                            //borderColor: 'red', //'rgba(255,99,132,1)',
                            borderWidth: 1,
                            // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            // hoverBorderColor: 'rgba(255,99,132,1)',
                            data: answerData.map(value => value.averageKnowledge)
                        }
                    ]
                }}
                options={{
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
                                max: 5
                            }
                        }]
                    }
                }}
    
            />
            </div>
            <div className={classes.motivationChart}>

            <HorizontalBar 
                redraw={props.boolDraw}
                data={{
                    labels: answerData.map(value => ""),
                    datasets: [
                        {
                            label: 'Motivation',
                            backgroundColor: KnowitColors.greyGreen,  //'rgba(99,255,132,0.2)',
                            //borderColor: 'green', //'rgba(99,255,132,1)',
                            borderWidth: 1,
                            // hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            // hoverBorderColor: 'rgba(255,99,132,1)',
                            data: answerData.map(value => value.averageMotivation)
                        }
                    ]
                }}
                options={{
                    maintainAspectRatio: false,
                    // legend: {
                    //     labels: {
                    //         fontColor: 'black'
                    //     }
                    // },
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
                                max: 5
                            }
                        }]
                    }
                }}
    
            />
            </div>
        </Fragment>
    );
};
