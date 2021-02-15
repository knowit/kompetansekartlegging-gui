import React, { useEffect, useState } from 'react';
import { roundDecimals } from '../helperFunctions';
import { ChartData, ResultData, ResultDiagramProps } from '../types';
import { makeStyles } from '@material-ui/core/styles';
import { CombinedChart } from './CombinedChart';
import { CombinedChartMobile } from './CombinedChartMobile';
import Button from '@material-ui/core/Button';
import { KnowitColors } from '../styles';

const graphStyle = makeStyles({
    resultDiagramContainer: {
        width: '100%',
        paddingTop: 30
    },
    resultDiagramContainerMobile: {
        width: '90%',
    },
    chartButton: {
        position: 'absolute',
        zIndex: 5,
        top: '40px',
        left: '100px',
        width: '80px',
        backgroundColor: KnowitColors.beige,
        color: KnowitColors.darkBrown,
        fontWeight: 'bold',
        fontSize: '12px'
    }
});

enum OverviewType {
    AVERAGE = 'Snitt',
    MEDIAN = 'Median',
    HIGHEST = 'Topp'
}

export default function TypedOverviewChart({...props}: ResultDiagramProps) {
    const style = graphStyle();

    const [answerData, setAnswerData] = useState<ResultData[]>([]);
    const [currentType, setOverviewType] = useState<OverviewType>(OverviewType.HIGHEST);
    
    useEffect(() => {
        recalculate();
    }, [props.questionAnswers]);

    useEffect(() => {
        recalculate();
    }, [currentType]);

    const recalculate = () => {
        switch(currentType) {
            case OverviewType.AVERAGE:
                setAnswerData(createAverageData());
                break;
            case OverviewType.MEDIAN:
                setAnswerData(createMedianData());
                break;
            case OverviewType.HIGHEST:
                setAnswerData(createHighestData());
        }
    }

    type ReduceValue = {
        konwledgeCount: number,
        knowledgeAverage: number,
        knowledgeTotal: number,
        motivationCount: number,
        motivationAverage: number,
        motivationTotal: number
    }
    
    const createAverageData = (): ResultData[] => { //data: ResultData[]
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
                aggKnowledge: roundDecimals(reduced.knowledgeAverage, 1),
                aggMotivation: roundDecimals(reduced.motivationAverage, 1)
            });
        });
        return ansData;
    };

    const createMedianData = (): ResultData[] => {
        let ansData: ResultData[] = [];
        props.questionAnswers.forEach((questionAnswers, category) => {
            if (questionAnswers.length > 0) {
                let mid = Math.floor(questionAnswers.length / 2);
                let medianKnowledge, medianMotivation;
                let sortK = questionAnswers.sort((qa1, qa2) => qa1.knowledge - qa2.motivation);
                medianKnowledge = (sortK.length % 2 === 1)
                    ? sortK[mid].knowledge
                    : (sortK[mid - 1].knowledge + sortK[mid].knowledge) / 2;
                let sortM = questionAnswers.sort((qa1, qa2) => qa1.motivation - qa2.motivation);
                medianMotivation = (sortM.length % 2 === 1)
                    ? sortM[mid].motivation
                    : (sortM[mid - 1].motivation + sortM[mid].motivation) / 2;
                ansData.push({
                    category: category,
                    aggKnowledge: medianKnowledge,
                    aggMotivation: medianMotivation
                });
            } else {
                ansData.push({
                    category: category,
                    aggKnowledge: 0,
                    aggMotivation: 0
                });
            }
        });
        return ansData;
    };

    const createHighestData = (): ResultData[] => {
        let ansData: ResultData[] = [];
        props.questionAnswers.forEach((questionAnswers, category) => {
            let reduced = questionAnswers
                .reduce<{maxKnowledge: number, maxMotivation: number}>((acc, cur): {maxKnowledge: number, maxMotivation: number} => {
                    acc.maxKnowledge = Math.max(acc.maxKnowledge, cur.knowledge);
                    acc.maxMotivation = Math.max(acc.maxMotivation, cur.motivation);
                    return acc;
                }, {
                    maxKnowledge: 0,
                    maxMotivation: 0
                })
            ;
            ansData.push({
                category: category,
                aggKnowledge: reduced.maxKnowledge,
                aggMotivation: reduced.maxMotivation
            });
        });
        return ansData;
    };

    let knowledgeStart = props.isMobile ? 7 : 0;
    let motivationStart = props.isMobile ? 0 : 7;
    let chartData: ChartData[] = answerData.map(
        (answer) => ({
            name: answer.category,
            valueKnowledge: [knowledgeStart, knowledgeStart + ((answer.aggKnowledge === -1) ? 0 : answer.aggKnowledge)],
            valueMotivation: [motivationStart, motivationStart + ((answer.aggMotivation === -1) ? 0 : answer.aggMotivation)],
        })
    );


    const [view, setView] = React.useState(OverviewType.AVERAGE);
    const handleChange = (event: React.UIEvent<HTMLElement>, nextType: OverviewType) => {
      setView(nextType);
    };
  
    const cycleChartType = () => {
        switch(currentType) {
            case OverviewType.AVERAGE:
                setOverviewType(OverviewType.HIGHEST);
                break;
            case OverviewType.HIGHEST:
                setOverviewType(OverviewType.MEDIAN);
                break;
            case OverviewType.MEDIAN:
                setOverviewType(OverviewType.AVERAGE);
        }
    }

    return (
        props.isMobile ?
            <div className={style.resultDiagramContainerMobile}>
                <CombinedChartMobile chartData={chartData}/>
            </div> 
        :
            <div className={style.resultDiagramContainer}>
                <Button
                    className={style.chartButton}
                    variant='outlined'
                    onClick={() => { cycleChartType() }}
                >
                    {currentType}
                </Button>
                <CombinedChart chartData={chartData}/>
            </div>
    );
};