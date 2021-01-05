import React, { Fragment, useEffect, useState } from 'react'
import { AnswerData, TopicScoreWithIcon } from '../types'
import { GetIcon } from '../icons/iconController'
import { makeStyles } from '@material-ui/core';
import { KnowitColors } from '../styles';
import { limitStringLength, wrapString } from '../helperFunctions';

const barIconSize = 24;

const highlightsStyle = makeStyles({
    root: {
        display: 'flex',
        width: '80%',
        flexDirection: 'column'
    },
    title: {    
        textAlign: 'left',
        fontWeight: 'bold',
        paddingBottom: 20,
        paddingLeft: 30,
        fontFamily: "Arial",
        fontSize: "20px"
    },
    container: { 
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between'
    },
    containerMobile: { 
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between'
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
        fontSize: 16
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
        zIndex: 1,
        display: 'flex',
        width: '25%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 5
    },
    iconKnowledge: {
        width: barIconSize,
        fill: KnowitColors.white
    },
    iconMotivation: {
        width: barIconSize,
        fill: KnowitColors.darkBrown
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
    bulletKnowledge: {
        display: 'flex',
        width: barIconSize * 2,
        height: barIconSize * 2,
        borderRadius: barIconSize,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: KnowitColors.darkGreen
    },
    bulletMotivation: {
        display: 'flex',
        width: barIconSize * 2,
        height: barIconSize * 2,
        borderRadius: barIconSize,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: KnowitColors.lightGreen
    },
    bar: {
        position: 'absolute',
        zIndex: 0,
        width: '30%',
        height: barIconSize,
        borderRadius: barIconSize / 2,
        marginTop: barIconSize / 2,
        backgroundColor: KnowitColors.beige
    },
    barMobile: {
        position: 'absolute',
        zIndex: 0,
        width: '80%',
        height: barIconSize,
        borderRadius: barIconSize / 2,
        marginTop: barIconSize / 22,
        backgroundColor: KnowitColors.beige
    },
    hidden: {
        display: "none"
    }
});



export default function Highlights(props: { isMobile: boolean, data: AnswerData[] }) {

    const style = highlightsStyle();

    const [knowledgeAboveCutoff, setKnowledgeAboveCutoff] = useState<TopicScoreWithIcon[]>([]);
    const [motivationAboveCutoff, setMotivationAboveCutoff] = useState<TopicScoreWithIcon[]>([]);
    
    const shortlistCutoff: number = 2.0;
    const maxInList: number = 4;

    useEffect(() => {
        generateShortlist();
    }, [props.data]);

    const generateShortlist = () => {
        let shortlistMotivation: TopicScoreWithIcon[] = [];
        let shortlistKnowledge: TopicScoreWithIcon[] = [];
        props.data.forEach(dat => {
            if (dat.knowledge > shortlistCutoff) {
                shortlistKnowledge.push({
                    topic: dat.topic,
                    score: dat.knowledge,
                    icon: Math.floor(dat.knowledge)
                });
            }
            if (dat.motivation > shortlistCutoff) {
                shortlistMotivation.push({
                    topic: dat.topic,
                    score: dat.motivation,
                    icon: Math.floor(dat.motivation)
                });
            }
        });
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
        if(!motivationAboveCutoff) return <Fragment />;
        if(!motivationAboveCutoff[0]) return <Fragment />;
        return (
            <div className={props.isMobile ? style.listMobile : style.list}>
                <div className={props.isMobile ? style.barMobile : style.bar}/>
                {motivationAboveCutoff
                    .map((el, i) =>
                        <div key={i} className={style.listitem}>
                            <div className={style.bulletMotivation}>
                                <div className={style.iconMotivation}>{GetIcon(false, el.icon)}</div>
                            </div>
                            <div className={style.topic}>{wrapString(el.topic, 15).join('\n')}</div>
                        </div>
                    )
                }
            </div>
        );
    };

    const createKnowledgeHighlights = (): JSX.Element => {
        if(!knowledgeAboveCutoff) return <Fragment />;
        if(!knowledgeAboveCutoff[0]) return <Fragment />;
        return (
            <div className={props.isMobile ? style.listMobile : style.list}>
                <div className={props.isMobile ? style.barMobile : style.bar}/>
                {knowledgeAboveCutoff
                    .map((el, i) =>
                        <div key={i} className={style.listitem}>
                            <div className={style.bulletKnowledge}>
                                <div className={style.iconKnowledge}>{GetIcon(true, el.icon)}</div>
                            </div>
                            <div className={style.topic}>{wrapString(el.topic, 15).join('\n')}</div>
                        </div>
                    )
                }
            </div>
        );
    };

    // return (
    //     <div className={props.isMobile ? style.rootMobile : style.root}>
    //         <div className={style.title}>MINE EGENSKAPER</div>
    //     <div className={style.container}>
    //         <div className={style.col}>
    //             <div className={style.heading}>STYRKER</div>
    //                 {createKnowledgeHighlights()}
    //         </div>
    //         <div className={style.col}>
    //             <div className={style.heading}>AMBISJONER</div>
    //                 {createMotivationHighlights()}
    //         </div>
    //         </div>
    //     </div>
    // );

    return (
        <div className={style.root}>
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
