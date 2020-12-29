import React, { Fragment, ReactSVGElement, useEffect, useState } from 'react'
import { HorizontalBar } from 'react-chartjs-2';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Label, ResponsiveContainer, ReferenceLine } from 'recharts';
import { limitStringLength, roundDecimals } from '../helperFunctions';
import { KnowitColors } from '../styles';
import { AnswerData, CalculationData, ChartData, ResultData } from '../types'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { GetIcon, GetIcons } from '../icons/iconController';
import { SvgIconTypeMap } from '@material-ui/core';
import { CombinedChart } from './CombinedChart';
import { CombinedChartMobile } from './CombinedChartMobile';

const graphStyle = makeStyles({
    container: {
        width: '80%',
        height: '50%',
        padding: 30
    },
    mobile: {
        height: '70%',
        width: '90%'
    }
});

export default function ResultDiagram(props: { isMobile: boolean, data: AnswerData[] }) {
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
    }, [props.data]);

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

    let chartData: ChartData[] = answerData.map(
        (answer) => ({
            name: answer.category,
            valueKnowledge: [0, answer.averageKnowledge],
            valueMotivation: [7, 7 + answer.averageMotivation],
        })
    )

    return (
        props.isMobile ?
            <div className={style.mobile}>
                <CombinedChartMobile chartData={chartData}/>
            </div> 
        :
            <div className={style.container}>
                <CombinedChart chartData={chartData}/>
            </div>
    );
};