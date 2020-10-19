import { ResponsiveRadar } from '@nivo/radar'
import React, { useEffect, useState } from 'react'
import { roundDecimals } from '../helperFunctions';
import { AnswerData, CalculationData, ResultData } from '../types'

export default function ResultDiagram(props: { data: AnswerData[] }) {

    const [answerData, setAnswerData] = useState<ResultData[]>([]);

    let calcData: CalculationData[] = [];
    let result: ResultData[] = [];

    // useEffect(() => {
    //     if(answerData.length === 0){
    //         let newAnswerData: ResultData[] = [];
    //         props.data.forEach(dat => {
    //             let cat = newAnswerData.find(ans => ans.category === dat.category);
    //             if(!cat){
    //                 cat = {
    //                     category: dat.category,
    //                     knowledgeCount: 0,
    //                     knowledgeTotal: 0,
    //                     motivationCount: 0,
    //                     motivationTotal: 0,
    //                     questionIds: []
    //                 }
    //             }
    //         }
    //     }
    // }), [];

    useEffect(() => {
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
        console.log(calcData);
        calcData.forEach(dat => {
            let resIndex = result.findIndex(res => res.category === dat.category);
            if(resIndex === -1){
                resIndex = result.length;
                result.push({
                    category: dat.category,
                    averageKnowledge: 0,
                    averageMotivation: 0
                });
            }
            result[resIndex].averageKnowledge = roundDecimals(dat.knowledgeTotal / dat.knowledgeCount || 0, 2);
            result[resIndex].averageMotivation = roundDecimals(dat.motivationTotal / dat.motivationCount || 0, 2);
        });
        // setAnswerData(result);
        console.log(result);
    }, [props.data]);

    return (
        <ResponsiveRadar
            data={answerData}
            keys={['averageKnowledge', 'averageMotivation']}
            indexBy="category"
            maxValue={5}
            margin={{top: 70, right: 80, bottom: 40, left: 200}}
            curve="linearClosed"
            gridShape="linear"
            dotSize={10}
            enableDotLabel={true}
            colors={{scheme: 'nivo'}}
            blendMode="multiply"
            legends={[
                {
                    anchor: 'top-left',
                    direction: 'column',
                    translateX: -50,
                    translateY: -40,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#999',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    );
};
