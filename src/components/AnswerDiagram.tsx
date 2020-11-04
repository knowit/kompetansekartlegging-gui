import React, { Fragment } from 'react'
import { HorizontalBar } from 'react-chartjs-2';
import { limitStringLength } from '../helperFunctions';
import { KnowitColors } from '../styles';
import { AnswerData} from '../types'
import { makeStyles } from '@material-ui/core/styles'
import { GetIcons } from '../icons/iconController'
import clsx from 'clsx'


const graphStyle = makeStyles({
    chartK: {
        width: '55%',
        maxHeight: '80%',
        marginRight: 20
    },
    chartM: {
        width: '45%',
        maxHeight: '80%',
        marginRight: 20
    },
    iconBar: {
        height: 30 ,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconBarK: {
        marginLeft: '18%'
    },
    icon: {
        height: '100%'
    },
    categoryList: {
        marginTop: '2.5%',
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
        width: '100%',
        height: '100%'
    }
});

const graphOptions = {
    maintainAspectRatio: false,
    legend: {
        labels: {
            fontColor: 'black'
        }
    },
    scales: {
        yAxes: [{
            gridLines: {
                color: '#E4E0DC'
            },
            ticks: {
                fontColor: 'black',
                callback: (value: string) => {
                    if(value === " ") return " ";
                    return limitStringLength(value, 25, false).padStart(30, " ");
                }
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

export default function AnswerDiagram(props: { data: AnswerData[], activeCategory: string }) {
    const style = graphStyle();

    // const [answerData, setAnswerData] = useState<AnswerGraphResultData[]>([]);

    // useEffect(() => {
    //     if (answerData.length === 0) {
    //         let result: AnswerGraphResultData[] = [];
    //         props.data.forEach(dat => {
    //             let cat = result.find(res => res.category === dat.category);
    //             if (!cat) {
    //                 result.push({
    //                     category: dat.category,
    //                     averageKnowledge: 0,
    //                     averageMotivation: 0
    //                 });
    //             }
    //         });
    //         setAnswerData(result);
    //     }
    // }, [props.data]);

    // useEffect(() => {
    //     createData();
    // }, [props.data]);

    // const createData = () => {
    //     let calcData: CalculationData[] = [];
    //     props.data.forEach(dat => {
    //         if (dat.knowledge < 0 && dat.motivation < 0) return;
    //         let catIndex = calcData.findIndex(calc => calc.category === dat.category);
    //         if (catIndex === -1) {
    //             catIndex = calcData.length;
    //             calcData.push({
    //                 category: dat.category,
    //                 knowledgeCount: 0,
    //                 knowledgeTotal: 0,
    //                 motivationCount: 0,
    //                 motivationTotal: 0,
    //                 questionIds: []
    //             });
    //         }
    //         if (dat.knowledge >= 0) {
    //             calcData[catIndex].knowledgeCount += 1;
    //             calcData[catIndex].knowledgeTotal += dat.knowledge;
    //         }
    //         if (dat.motivation >= 0) {
    //             calcData[catIndex].motivationCount += 1;
    //             calcData[catIndex].motivationTotal += dat.motivation;
    //         }
    //     });
    //     calcData.forEach(dat => {
    //         let answers = [...answerData];
    //         let resIndex = answers.findIndex(ans => ans.category === dat.category);
    //         if (resIndex === -1) return;
    //         answers[resIndex].averageKnowledge = roundDecimals(dat.knowledgeTotal / dat.knowledgeCount || 0, 1);
    //         answers[resIndex].averageMotivation = roundDecimals(dat.motivationTotal / dat.motivationCount || 0, 1);
    //         setAnswerData(answers);
    //     });
    // };

    return (
        <div className={style.container}>
            <Fragment>
            {/* <div className={style.categoryList}>
                {props.data.filter(answer => answer.category === props.activeCategory)
                    .map((answer, index) => <div key={index} className={style.category}>{answer.topic}</div>)
                }
            </div> */}
            <div className={style.chartK}>
                <HorizontalBar
                    redraw={true}
                    data={{
                        labels: props.data.filter(answer => answer.category === props.activeCategory)
                            .map(value => value.topic),
                        datasets: [
                            {
                                label: 'Kunnskap',
                                backgroundColor: KnowitColors.lightGreen,
                                borderWidth: 1,
                                data: props.data.filter(answer => answer.category === props.activeCategory)
                                    .map(answer => answer.knowledge === -1 ? 0 : answer.knowledge)
                            }
                        ]
                    }}
                    options={graphOptions}
                />
                <div className={clsx(style.iconBar, style.iconBarK)}>
                    {GetIcons(true, style.icon)}
                </div>
            </div>
            <div className={style.chartM}>
                <HorizontalBar
                    redraw={true}
                    data={{
                        labels: props.data.filter(answer => answer.category === props.activeCategory).map(value => " "),
                        datasets: [
                            {
                                label: 'Motivasjon',
                                backgroundColor: KnowitColors.greyGreen,
                                borderWidth: 1,
                                data: props.data.filter(answer => answer.category === props.activeCategory)
                                    .map(answer => answer.motivation === -1 ? 0 : answer.motivation)
                            }
                        ]
                    }}
                    options={graphOptions}
                />
                <div className={style.iconBar}>
                    {GetIcons(false, style.icon)}
                </div>
            </div>
            </Fragment>
        </div>
    );
};
