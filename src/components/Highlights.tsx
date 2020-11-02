import React, { Fragment, useEffect, useState } from 'react'
import { AnswerData, TopicScoreWithIcon } from '../types'
import { HighlightsStyle } from '../styles';
import { GetIcon } from '../icons/iconController'


export default function Highlights(props: { data: AnswerData[] }) {

    const style = HighlightsStyle();

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
        <div className={style.root}>
            <div className={style.title}>MINE EGENSKAPER</div>
        <div className={style.container}>
            <div className={style.col}>
                <div className={style.heading}>STYRKER</div>
                    {createKnowledgeHighlights()}
            </div>
            <div className={style.col}>
                <div className={style.heading}>ASPIRASJONER</div>
                    {createMotivationHighlights()}
            </div>
            </div>
        </div>
    );
};
