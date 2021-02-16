import React from 'react';
import { AnswerDiagramProps, ChartData} from '../types';
import { CombinedChart } from './CombinedChart';
import { CombinedChartMobile } from './CombinedChartMobile';

export default function AnswerDiagram({ ...props }: AnswerDiagramProps) {
    
    let knowledgeStart = props.isMobile ? 7 : 0;
    let motivationStart = props.isMobile ? 0 : 7;
    let chartData: ChartData[] = props.questionAnswers.get(props.activeCategory)
        ?.map(quAns => {
            return {
                name: quAns.topic,
                valueKnowledge: [knowledgeStart, knowledgeStart + ((quAns.knowledge === -1) ? 0 : quAns.knowledge)],
                valueMotivation: [motivationStart, motivationStart + ((quAns.motivation === -1) ? 0 : quAns.motivation)],
            }
        }) || [];

    // let chartData: ChartData[] = helper.sortArray(props.data)
    //     .filter(answer => answer.category === props.activeCategory)
    //     .map(
    //         (answer) => ({
    //             name: answer.topic,
    //             valueKnowledge: [0, (answer.knowledge === -1) ? 0 : answer.knowledge],
    //             valueMotivation: [7, 7 + ((answer.motivation === -1) ? 0 : answer.motivation)],
    //         })
    //     );

    return (
        props.isMobile ? <CombinedChartMobile chartData={chartData}/>
        : <CombinedChart chartData={chartData}/>
    );
};