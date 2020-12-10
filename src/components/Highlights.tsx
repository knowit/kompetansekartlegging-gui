import React, { Fragment, useEffect, useState } from 'react'
import { AnswerData, TopicScoreWithIcon } from '../types'
import { GetIcon } from '../icons/iconController'
import { makeStyles } from '@material-ui/core';
import { KnowitColors } from '../styles';


const highlightsStyle = makeStyles({
    root: {
        display: 'flex',
        width: '30%',
        flexDirection: 'column'
    },
    rootMobile: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column'
    },
    title: {    
        textAlign: 'center',
        fontWeight: 'bold',
        paddingBottom: 20
    },
    container: { 
        display: 'flex',
        justifyContent: 'center'
    },
    col: {
        display: 'flex',
        width: '40%',
        flexDirection: 'column'
    },
    heading: {
        textAlign: 'left',
        paddingBottom: 10
    },
    list: {
        display: 'flex',
        flexDirection: 'column'
    },
    listitem: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: 5
    },
    icon: {
        width: '15%',
        fill: KnowitColors.darkBrown
    },
    topic: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontSize: 12
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
            <div className={style.list}>
                {motivationAboveCutoff
                    .map((el, i) =>
                        <div key={i} className={style.listitem}>
                            <div className={style.icon}>{GetIcon(false, el.icon)}</div>
                            <div className={style.topic}>{el.topic}</div>
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
            <div className={style.list}>
                {knowledgeAboveCutoff
                    .map((el, i) =>
                        <div key={i} className={style.listitem}>
                            <div className={style.icon}>{GetIcon(true, el.icon)}</div>
                            <div className={style.topic}>
                                <div>{el.topic}</div>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    };

    return (
        <div className={props.isMobile ? style.rootMobile : style.root}>
            <div className={style.title}>MINE EGENSKAPER</div>
        <div className={style.container}>
            <div className={style.col}>
                <div className={style.heading}>STYRKER</div>
                    {createKnowledgeHighlights()}
            </div>
            <div className={style.col}>
                <div className={style.heading}>AMBISJONER</div>
                    {createMotivationHighlights()}
            </div>
            </div>
        </div>
    );
};
