import React, { Fragment, useEffect, useState } from 'react'
import { HighlightsProps, TopicScoreWithIcon } from '../types'
import { GetIcon } from '../icons/iconController'
import { makeStyles } from '@material-ui/core';
import { KnowitColors } from '../styles';
import { wrapString } from '../helperFunctions';
import clsx from 'clsx';

const barIconSize = 24;
const barIconSizeMobile = 20;
const maxTopicStringLength = 20;

const highlightsStyle = makeStyles({
    root: {
        display: 'flex',
        height: '40%',
        width: '80%',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    rootMobile: {
        display: 'flex',
        height: '40%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    title: {    
        textAlign: 'left',
        fontWeight: 'bold',
        paddingBottom: 20,
        paddingLeft: 30,
        fontFamily: "Arial",
        color: KnowitColors.darkBrown,
        fontSize: "18px"
    },
    container: { 
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between'
    },
    containerMobile: { 
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '80%',
        justifyContent: 'center'
    },
    block: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
    },
    heading: {
        textAlign: 'left',
        fontWeight: 'bold',
        paddingBottom: 10,
        paddingLeft: 30,
        fontFamily: 'Arial',
        fontSize: 16,
        color: KnowitColors.darkBrown,
    },
    headingMobile: {
        textAlign: 'left',
        fontWeight: 'bold',
        paddingBottom: 10,
        paddingLeft: 30,
        fontFamily: 'Arial',
        fontSize: 14
    },
    list: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        height: '100%',
        width: '80%'
    },
    listMobile: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        height: '100%',
        width: '100%'
    },
    listitem: {
        zIndex: 0,
        display: 'flex',
        width: '25%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 5
    },
    iconKnowledge: {
        fill: KnowitColors.white
    },
    iconMotivation: {
        fill: KnowitColors.darkBrown
    },
    iconSize: {
        width: barIconSize
    },
    iconSizeMobile: {
        width: barIconSizeMobile
    },
    topic: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'Arial',
        fontSize: 12,
        whiteSpace: 'pre-wrap'
    },
    bullet: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bulletSize: {
        width: barIconSize * 2,
        height: barIconSize * 2,
        borderRadius: barIconSize,
    },
    bulletSizeMobile: {
        width: barIconSizeMobile * 2,
        height: barIconSizeMobile * 2,
        borderRadius: barIconSizeMobile,
    },
    bulletColorKnowledge: {
        backgroundColor: KnowitColors.darkGreen
    },
    bulletColorMotivation: {
        backgroundColor: KnowitColors.lightGreen
    },
    bar: {
        position: 'absolute',
        zIndex: 0,
        backgroundColor: KnowitColors.beige,
        color: KnowitColors.darkBrown,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12
    },
    barSize: {
        width: '80%',
        height: barIconSize,
        borderRadius: barIconSize / 2,
        marginTop: barIconSize / 2,
    },
    barSizeMobile: {
        width: '100%',
        height: barIconSizeMobile,
        borderRadius: barIconSizeMobile / 2,
        marginTop: barIconSizeMobile / 2,
    },
    barWrapper: {
        height: '100%',
        width: '100%',
        position: 'relative'
    },
    hidden: {
        display: "none"
    }
});



export default function Highlights({...props }: HighlightsProps) {

    const style = highlightsStyle();

    const [knowledgeAboveCutoff, setKnowledgeAboveCutoff] = useState<TopicScoreWithIcon[]>([]);
    const [motivationAboveCutoff, setMotivationAboveCutoff] = useState<TopicScoreWithIcon[]>([]);
    
    const shortlistCutoff: number = 2.0;
    const maxInList: number = 4;

    useEffect(() => {
        generateShortlist();
    }, [props.questionAnswers]);

    const generateShortlist = () => {
        let shortlistMotivation: TopicScoreWithIcon[] = [];
        let shortlistKnowledge: TopicScoreWithIcon[] = [];
        props.questionAnswers.forEach((quAns, cat) => {
            quAns.forEach(answer => {
                if (answer.knowledge > shortlistCutoff) {
                    shortlistKnowledge.push({
                        topic: answer.topic,
                        score: answer.knowledge,
                        icon: Math.floor(answer.knowledge)
                    });
                }
                if (answer.motivation > shortlistCutoff) {
                    shortlistMotivation.push({
                        topic: answer.topic,
                        score: answer.motivation,
                        icon: Math.floor(answer.motivation)
                    });
                }
            });
            
        });
        // props.answers.forEach(ans => {
        //     if (ans.knowledge > shortlistCutoff) {
        //         shortlistKnowledge.push({
        //             topic: ans.topic,
        //             score: ans.knowledge,
        //             icon: Math.floor(ans.knowledge)
        //         });
        //     }
        //     if (ans.motivation > shortlistCutoff) {
        //         shortlistMotivation.push({
        //             topic: ans.topic,
        //             score: ans.motivation,
        //             icon: Math.floor(ans.motivation)
        //         });
        //     }
        // });
        setKnowledgeAboveCutoff(shortlistKnowledge
                .sort((a, b) => b.score - a.score)
                .slice(0, maxInList)
            );
        setMotivationAboveCutoff(shortlistMotivation
                .sort((a, b) => b.score - a.score)
                .slice(0, maxInList)
            );
    };

    const createMotivationHighlights = (): JSX.Element => {
        if(motivationAboveCutoff.length === 0) {
            return (
                <div className={style.barWrapper}>
                    <div className={clsx(style.bar, props.isMobile ? style.barSizeMobile : style.barSize)}>Her kommer dine topp-ambisjoner</div>
                </div>
        )};
        return (
            <div className={style.barWrapper}>
                <div className={props.isMobile ? style.listMobile : style.list}>
                <div className={clsx(style.bar, props.isMobile ? style.barSizeMobile : style.barSize)}/>
                    {motivationAboveCutoff
                        .map((el, i) =>
                            <div key={i} className={style.listitem}>
                                <div className={clsx(style.bullet, style.bulletColorMotivation, props.isMobile ? style.bulletSizeMobile : style.bulletSize)}>
                                    <div className={clsx(style.iconMotivation, props.isMobile ? style.iconSizeMobile : style.iconSize)}>{GetIcon(false, el.icon)}</div>
                                </div>
                                <div className={style.topic}>{wrapString(el.topic, maxTopicStringLength).join('\n')}</div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    };

    const createKnowledgeHighlights = (): JSX.Element => {
        if(knowledgeAboveCutoff.length === 0) {
            return (
                <div className={style.barWrapper}>
                    <div className={clsx(style.bar, props.isMobile ? style.barSizeMobile : style.barSize)}>Her kommer dine topp-styrker</div>
                </div>
        )};
        return (
            <div className={style.barWrapper}>
                <div className={props.isMobile ? style.listMobile : style.list}>
                <div className={clsx(style.bar, props.isMobile ? style.barSizeMobile : style.barSize)}/>
                    {knowledgeAboveCutoff
                        .map((el, i) =>
                            <div key={i} className={style.listitem}>
                                <div className={clsx(style.bullet, style.bulletColorKnowledge, props.isMobile ? style.bulletSizeMobile : style.bulletSize)}>
                                    <div className={clsx(style.iconKnowledge, props.isMobile ? style.iconSizeMobile : style.iconSize)}>{GetIcon(true, el.icon)}</div>
                                </div>
                                <div className={style.topic}>{wrapString(el.topic, maxTopicStringLength).join('\n')}</div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    };

    if (props.questionAnswers.size === 0)
        return <Fragment/>
    else 
        return (
            <div className={props.isMobile ? style.rootMobile : style.root}>
                <div className={props.isMobile ? style.hidden : style.title}>FOKUSOMRÅDER</div>
                <div className={props.isMobile ? style.containerMobile : style.container}>
                    <div className={style.block}>
                        <div className={props.isMobile ? style.headingMobile : style.heading}>TOPP STYRKER</div>
                            {createKnowledgeHighlights()}
                    </div>
                    <div className={style.block}>
                        <div className={props.isMobile ? style.headingMobile : style.heading}>TOPP AMBISJONER</div>
                            {createMotivationHighlights()}
                    </div>
                </div>
            </div>
        );
};
