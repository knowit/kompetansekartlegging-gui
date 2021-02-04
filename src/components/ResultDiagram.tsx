import React, { useEffect, useState } from 'react';
import { roundDecimals } from '../helperFunctions';
import { ChartData, ResultData, ResultDiagramProps } from '../types';
import { makeStyles } from '@material-ui/core/styles';
import { CombinedChart } from './CombinedChart';
import { CombinedChartMobile } from './CombinedChartMobile';
import Highlights from './Highlights';

const graphStyle = makeStyles({
    resultDiagramContainer: {
        width: '90%',
        height: '60%',
        paddingTop: 30
    },
    resultDiagramContainerMobile: {
        height: '60%',
        width: '90%',
    }
});

export default function ResultDiagram({...props}: ResultDiagramProps) {
    const style = graphStyle();

    const [answerData, setAnswerData] = useState<ResultData[]>([]);
    
    useEffect(() => {
        setAnswerData(createData());
    }, [props.questionAnswers]);
    
    type ReduceValue = {
        konwledgeCount: number,
        knowledgeAverage: number,
        knowledgeTotal: number,
        motivationCount: number,
        motivationAverage: number,
        motivationTotal: number
    }
    
    const createData = (): ResultData[] => { //data: ResultData[]
        let ansData: ResultData[] = [];
        props.questionAnswers.forEach((questionAnswers, category) => {
            let reduced = questionAnswers
                .reduce<ReduceValue>((acc, cur): ReduceValue => {
                    if (cur.knowledge >= 0) {
                        acc.konwledgeCount = acc.konwledgeCount + 1;
                        acc.knowledgeTotal = acc.knowledgeTotal + cur.knowledge;
                        acc.knowledgeAverage = acc.knowledgeTotal / acc.konwledgeCount;
                    }
                    if (cur.motivation >= 0) {
                        acc.motivationCount = acc.motivationCount + 1;
                        acc.motivationTotal = acc.motivationTotal + cur.motivation;
                        acc.motivationAverage = acc.motivationTotal / acc.motivationCount;
                    }
                    return acc;
                }, {
                    konwledgeCount: 0,
                    knowledgeAverage: 0,
                    knowledgeTotal: 0,
                    motivationCount: 0,
                    motivationAverage: 0,
                    motivationTotal: 0
                })
            ;
            ansData.push({
                category: category,
                averageKnowledge: roundDecimals(reduced.knowledgeAverage, 1),
                averageMotivation: roundDecimals(reduced.motivationAverage, 1)
            });
        });
        // let result = props.categories.map(category => {
        //     let reduced = props.answers.filter(answer => answer.category === category)
        //         .reduce<ReduceValue>((acc, cur): ReduceValue => {
        //             if(cur.knowledge >= 0) {
        //                 acc.konwledgeCount = acc.konwledgeCount + 1;
        //                 acc.knowledgeTotal = acc.knowledgeTotal + cur.knowledge;
        //                 acc.knowledgeAverage = acc.knowledgeTotal / acc.konwledgeCount;
        //             }
        //             if(cur.motivation >= 0) {
        //                 acc.motivationCount = acc.motivationCount + 1;
        //                 acc.motivationTotal = acc.motivationTotal + cur.motivation;
        //                 acc.motivationAverage = acc.motivationTotal / acc.motivationCount;
        //             }
        //             return acc;
        //         }, {
        //             konwledgeCount: 0,
        //             knowledgeAverage: 0,
        //             knowledgeTotal: 0,
        //             motivationCount: 0,
        //             motivationAverage: 0,
        //             motivationTotal: 0
        //         })
        //     ;
        //     return {
        //         category: category,
        //         averageKnowledge: roundDecimals(reduced.knowledgeAverage, 1),
        //         averageMotivation: roundDecimals(reduced.motivationAverage, 1)
        //     } as ResultData;
        // });
        //console.log("overview AnswerData:", ansData);
        return ansData;
    };
    
    let chartData: ChartData[] = answerData.map(
        (answer) => ({
            name: answer.category,
            valueKnowledge: [0, answer.averageKnowledge],
            valueMotivation: [7, 7 + answer.averageMotivation],
        })
    )

    return (
        props.isMobile ?
            <div className={style.resultDiagramContainerMobile}>
                <CombinedChartMobile chartData={chartData}/>
            </div> 
        :
            <div className={style.resultDiagramContainer}>
                <CombinedChart chartData={chartData}/>
            </div>
    );
};