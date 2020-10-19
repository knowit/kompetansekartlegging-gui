import { ResponsiveRadar } from '@nivo/radar'
import React, { useEffect, useState } from 'react'
import { AnswerData, AnsweredQuestion, CalculatedAnswer, CalculationData, ResultData } from '../types'

export default function ResultDiagram(props: { data: AnswerData[] }) {

    const [answerData, setAnswerData] = useState<CalculationData[]>([]);
    const [resultData, setResultData] = useState<ResultData[]>([]);

    const mapData = (): CalculatedAnswer[] => {
        let calculatedAnswers: CalculatedAnswer[] = [];
        props.data.forEach(value => {
            
        });
        return calculatedAnswers;
    };

    useEffect(() => {
        let answers = [...answerData];
        if(answerData.length === 0){
            props.data.forEach(value => {
                if(!answers.find(ans => ans.category === value.category)){
                    answers.push({
                        questionIds: [],
                        category: value.category,
                        knowledgeCount: 0,
                        knowledgeTotal: 0,
                        motivationCount: 0,
                        motivationTotal: 0
                    });
                };
            });
        }

        props.data.forEach(value => {
            let calcData = answers.find(ans => ans.category === value.category);
            if(!calcData){
                console.error("No calcData found!");
                return;
            }


            if(!category.questionIds.includes(value.questionId)){
                category.questionIds.push(value.questionId);
            }
            if(value.knowledge !== -1){
                category.totalKnowledgeValue +=
            }
            //Edit value
            if(value.knowledge !== -1) {
                category.numberOfKnowledgeValues++;
                category.totalKnowledgeValue += value.knowledge;
                category.knowledgeAverage = category.totalKnowledgeValue / category.numberOfKnowledgeValues;
            }
            if(value.motivation !== -1) {
                category.numberOfMotivationValues++;
                category.totalMotivationValue += value.motivation;
                category.motivationAverage = category.totalMotivationValue / category.numberOfMotivationValues;
            }
        });






        props.data.map(value => {
            let category = answers.find(cat => cat.category === value.category);
            if(!category) {
                category = {
                    questionIds: [],
                    category: value.category,
                    totalKnowledgeValue: 0,
                    numberOfKnowledgeValues: 0,
                    knowledgeAverage: 0,
                    totalMotivationValue: 0,
                    numberOfMotivationValues: 0,
                    motivationAverage: 0
                }
                answers.push(category);
            }
            if(!category.questionIds.includes(value.questionId)){
                category.questionIds.push(value.questionId);
            }
            if(value.knowledge !== -1){
                category.totalKnowledgeValue +=
            }


            //Edit value
            if(value.knowledge !== -1) {
                category.numberOfKnowledgeValues++;
                category.totalKnowledgeValue += value.knowledge;
                category.knowledgeAverage = category.totalKnowledgeValue / category.numberOfKnowledgeValues;
            }
            if(value.motivation !== -1) {
                category.numberOfMotivationValues++;
                category.totalMotivationValue += value.motivation;
                category.motivationAverage = category.totalMotivationValue / category.numberOfMotivationValues;
            }
        });
        setAnswerData(answers);
    }, [props.data]);


    // let categoryAnswers: AggregatedAnswer[] = [];
    // useEffect(() => {
    //     props.data.map(value => {
    //         let category = categoryAnswers.find(cat => cat.category === value.question.category);
    //         if(!category) {
    //             category = {
    //                 category: value.question.category,
    //                 totalKnowledgeValue: 0,
    //                 numberOfKnowledgeValues: 0,
    //                 knowledgeAverage: 0,
    //                 totalMotivationValue: 0,
    //                 numberOfMotivationValues: 0,
    //                 motivationAverage: 0
    //             }
    //             categoryAnswers.push(category);
    //         }
    //         if(value.answer !== -1) {
    //             category.numberOfKnowledgeValues++;
    //             category.totalKnowledgeValue += value.answer;
    //             category.knowledgeAverage = category.totalKnowledgeValue / category.numberOfKnowledgeValues;
    //         }
    //         if(value.motivation !== -1) {
    //             category.numberOfMotivationValues++;
    //             category.totalMotivationValue += value.motivation;
    //             category.motivationAverage = category.totalMotivationValue / category.numberOfMotivationValues;
    //         }
    //     });
    // }, [props.data]);

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
