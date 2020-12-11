import React from 'react'
import { AnswerData, ChartData} from '../types'
import { makeStyles } from '@material-ui/core/styles'
import { CombinedChart } from './CombinedChart';
import { CombinedChartMobile } from './CombinedChartMobile';


const graphStyle = makeStyles({
    root: {
        width: '100%',
        maxHeight: '100%',
        paddingBottom: 10
    }
});


export default function AnswerDiagram(props: { data: AnswerData[], activeCategory: string , isMobile: boolean}) {
    const style = graphStyle();

    let chartData: ChartData[] = props.data
        .filter(answer => answer.category === props.activeCategory)
        .map(
            (answer) => ({
                name: answer.topic,
                valueKnowledge: [0, (answer.knowledge === -1) ? 0 : answer.knowledge],
                valueMotivation: [7, 7 + ((answer.motivation === -1) ? 0 : answer.motivation)],
            })
        );

    return (
        props.isMobile ? <CombinedChartMobile chartData={chartData}/>
        : <CombinedChart chartData={chartData}/>
    );
};