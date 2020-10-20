import React, { useEffect, useState } from 'react'
import { HorizontalBar } from 'react-chartjs-2';
import { roundDecimals } from '../helperFunctions';
import { AnswerData, CalculationData, ResultData } from '../types'

export default function ResultDiagram(props: { data: AnswerData[] }) {

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
            answers[resIndex].averageKnowledge = roundDecimals(dat.knowledgeTotal / dat.knowledgeCount || 0, 2);
            answers[resIndex].averageMotivation = roundDecimals(dat.motivationTotal / dat.motivationCount || 0, 2);
            setAnswerData(answers);
        });
    }, [props.data]);

    return (
        <HorizontalBar 
            data={{
                labels: answerData.map(value => value.category),
                datasets: [
                    {
                        label: 'Knowledge',
                        backgroundColor: 'rgba(255,99,132,0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: answerData.map(value => value.averageKnowledge)
                    },
                    {
                        label: 'Motivation',
                        backgroundColor: 'rgba(99,255,132,0.2)',
                        borderColor: 'rgba(99,255,132,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: answerData.map(value => value.averageMotivation)
                    }
                ]
            }}
            options={{
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                max: 5
                            }
                        }
                    ]
                }
            }}

        />
    );
};
