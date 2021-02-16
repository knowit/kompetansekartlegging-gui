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
        paddingTop: 20
    },
    resultDiagramContainerMobile: {
        width: '90%',
    },
    chartButtonMobile: {
        position: 'fixed',
        zIndex: 101, //Navbar has very high z-index
        height: '30px',
        borderRadius: '15px',
        top: '15px',
        right: '30px',
        padding: '10px',
        backgroundColor: KnowitColors.white,
        color: KnowitColors.darkBrown,
        fontWeight: 'bold',
        fontSize: '14px',
        '&:hover': {
            backgroundColor: KnowitColors.white, 
        }
    },
    chartButton: {
        margin: '0px 20px 0px 20px',
        width: '90px',
        height: '30px',
        borderRadius: '15px',
        backgroundColor: KnowitColors.white,
        color: KnowitColors.darkBrown,
        fontWeight: 'normal',
        fontSize: '14px',
        border: 2,
        borderStyle: 'solid',
        borderColor: KnowitColors.lightGreen
    },
    chartButtonActive: {
        margin: '0px 20px 0px 20px',
        width: '90px',
        height: '30px',
        borderRadius: '15px',
        backgroundColor: KnowitColors.lightGreen,
        color: KnowitColors.darkBrown,
        fontWeight: 'bold',
        fontSize: '14px',
        '&:hover': {
            backgroundColor: KnowitColors.lightGreen, 
        }
    },
    header: {
        padding: '0px 0px 20px 30px',
        display: 'flex',
        alignItems: 'center',
        maxWidth: 1200,
        fontFamily: 'Arial',
        fontSize: '22px',
        fontWeight: 'bold'
    },
    buttonGroup: {
        display: 'flex',
        flexGrow: 1,
        maxWidth: 900,
        justifyContent: 'center'
    }
});

export enum OverviewType {
    AVERAGE = 'SNITT',
    MEDIAN = 'MEDIAN',
    HIGHEST = 'TOPP'
}

export default function TypedOverviewChart({...props}: ResultDiagramProps) {
    const style = graphStyle();

    const [answerData, setAnswerData] = useState<ResultData[]>([]);
    const [currentType, setOverviewType] = useState<OverviewType>(OverviewType.HIGHEST);
    const [topSubjects, setTopSubjects] = useState<Map<string, {kTop: string, mTop: string}>>(new Map());
    
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
            let kTop: string = "";
            let mTop: string = "";
            let reduced = questionAnswers
                .reduce<{maxKnowledge: number, maxMotivation: number}>((acc, cur): {maxKnowledge: number, maxMotivation: number} => {
                    if (acc.maxKnowledge < cur.knowledge) {
                        acc.maxKnowledge = cur.knowledge;
                        kTop = cur.topic;
                    }
                    if (acc.maxMotivation < cur.motivation) {
                        acc.maxMotivation = cur.motivation;
                        mTop = cur.topic;
                    }
                    return acc;
                }, {
                    maxKnowledge: -1,
                    maxMotivation: -1
                })
            ;
            ansData.push({
                category: category,
                aggKnowledge: reduced.maxKnowledge,
                aggMotivation: reduced.maxMotivation
            });
            topSubjects.set(category, {kTop: kTop, mTop: mTop});
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


    // const [view, setView] = React.useState(OverviewType.AVERAGE);
    // const handleChange = (event: React.UIEvent<HTMLElement>, nextType: OverviewType) => {
    //   setView(nextType);
    // };
  
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

    const selectChartType = (type: OverviewType) => {
        setOverviewType(type);
    }

    const getButton = (type: OverviewType): JSX.Element => {
        return (
            <Button
                className={(currentType === type) ? style.chartButtonActive : style.chartButton}
                onClick={() => { selectChartType(type) }}
            >
                {type}
            </Button>
        )
    }

    return (
        props.isMobile ?
            <div className={style.resultDiagramContainerMobile}>
                <Button
                    className={style.chartButtonMobile}
                    onClick={() => { cycleChartType() }}
                >
                    {currentType}
                </Button>
                <CombinedChartMobile chartData={chartData} type={currentType} topSubjects={topSubjects}/>
            </div> 
        :
            <div className={style.resultDiagramContainer}>
                <div className={style.header}>
                    OVERSIKT
                    <div className={style.buttonGroup}>
                        {getButton(OverviewType.HIGHEST)}
                        {getButton(OverviewType.AVERAGE)}
                        {getButton(OverviewType.MEDIAN)}
                    </div>
                </div>
                <CombinedChart chartData={chartData} type={currentType} topSubjects={topSubjects}/>
            </div>
    );
};