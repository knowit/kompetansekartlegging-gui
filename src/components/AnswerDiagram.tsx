import React, { Fragment } from 'react'
import { HorizontalBar } from 'react-chartjs-2';
import { addLeftPaddingToStringArray, limitStringLength } from '../helperFunctions';
import { KnowitColors } from '../styles';
import { AnswerData} from '../types'
import { makeStyles } from '@material-ui/core/styles'
import { GetIcons } from '../icons/iconController'
import clsx from 'clsx'


const graphStyle = makeStyles({
    chartK: {
        width: '40vw',
        maxHeight: '80%',
        marginRight: 20,
        display: 'flex',
        flexDirection: 'column',
    },
    chartM: {
        width: '50%',
        maxHeight: '80%',
        marginRight: 20
    },
    iconBar: {
        height: 24,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconBarK: {
        width: '78%',
        alignSelf: 'flex-end'
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
        display: false
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
                    return addLeftPaddingToStringArray(limitStringLength(value, 25, true), 30, " ");
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
                                label: 'Kompetanse',
                                backgroundColor: KnowitColors.lightGreen,
                                borderWidth: 1,
                                data: props.data.filter(answer => answer.category === props.activeCategory)
                                    .map(answer => answer.knowledge === -1 ? 0 : answer.knowledge)
                            }
                        ]
                    }}
                    options={{
                        title: {
                            display: true,
                            text: 'KOMPETANSE',
                            fontColor: KnowitColors.black,
                            fontStyle: 'normal',
                            fontSize: 15
                        },
                        ...graphOptions}}
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
                    options={{
                        title: {
                            display: true,
                            text: 'MOTIVASJON',
                            fontColor: KnowitColors.black,
                            fontStyle: 'normal',
                            fontSize: 15
                        },
                        ...graphOptions}}
                />
                <div className={style.iconBar}>
                    {GetIcons(false, style.icon)}
                </div>
            </div>
            </Fragment>
        </div>
    );
};
