import React, { Fragment, useEffect, useState } from 'react'
import { HorizontalBar } from 'react-chartjs-2';
import { roundDecimals } from '../helperFunctions';
import { KnowitColors } from '../styles';
import { AnswerData, CalculationData, ResultData } from '../types'
import { makeStyles } from '@material-ui/core/styles'
import { GetIcons } from '../icons/iconController'
import { isWidthDown } from '@material-ui/core';

const graphStyle = makeStyles({
    chart: {
        width: '40%',
        maxHeight: '80%',
        marginRight: 20
    },
    iconBar: {
        height: 30 ,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        <div className={style.container}>
            <Fragment>
            <div className={style.categoryList}>
                {answerData.map((value, index) => <div key={index} className={style.category}>{value.category}</div>)}
            </div>
            <div className={style.chart}>
                <HorizontalBar
                    redraw={props.boolDraw}
                    data={{
                        labels: answerData.map(value => " "),
                        datasets: [
                            {
                                label: 'Kompetanse',
                                backgroundColor: KnowitColors.lightGreen,
                                borderWidth: 1,
                                data: answerData.map(value => value.averageKnowledge)
                            }
                        ]
                    }}
                    options={{
                        title: {
                            display: true,
                            text: 'KOMPETANSE',
                            fontColor: KnowitColors.black,
                            fontStyle: 'normal',
                            fontSize: 15
                        },
                        ...graphOptions}}
                />
                <div className={style.iconBar}>
                    {GetIcons(true, style.icon)}
                </div>
            </div>
            <div className={style.chart}>
                <HorizontalBar
                    redraw={props.boolDraw}
                    data={{
                        labels: answerData.map(value => " "),
                        datasets: [
                            {
                                label: 'Motivasjon',
                                backgroundColor: KnowitColors.greyGreen,
                                borderWidth: 1,
                                data: answerData.map(value => value.averageMotivation)
                            }
                        ]
                    }}
                    options={{
                        title: {
                            display: true,
                            text: 'MOTIVASJON',
                            fontColor: KnowitColors.black,
                            fontStyle: 'normal',
                            fontSize: 15
                        },
                        ...graphOptions}}
                />
                <div className={style.iconBar}>
                    {GetIcons(false, style.icon)}
                </div>
            </div>
            </Fragment>
        </div>
    );
};
