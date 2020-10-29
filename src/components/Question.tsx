import React, { Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';
import { QuestionProps } from '../types';
import Slider from './Slider';
import { makeStyles, SvgIcon } from '@material-ui/core';
import { KnowitColors, IconPaths } from '../styles';
import * as Icon from '../icons/iconController';

const QuestionBlock = makeStyles({
    root: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        backgroundColor: KnowitColors.ecaluptus,
        borderRadius: 10
    },
    topic: {
        fontSize: 18,
        fontWeight: "bold"
    },
    text: {
        fontSize: 15,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 10
    },
    answerArea: {
        display: 'flex',
        flexWrap: "nowrap",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    sliderArea: {
        marginLeft: 30,
        marginRight: 20,
        width: '75%'
    },
    slider: {
        marginRight: 15,
        marginLeft: 15
    },
    iconArea: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 30
    },
    icon: {
        height: '100%'
    },
    smallBold: {
        fontSize: 14,
        fontWeight: "bold"
    },
    largeBold: {
        fontSize: 18,
        fontWeight: "bold"
    }
});

const Question = ({...props}: QuestionProps) => {
    
    const [knowledgeValue, setKnowledgeValue] = useState<number>(props.knowledgeDefaultValue);
    const [motivationValue, setMotivationValue] = useState<number>(props.motivationDefaultValue);

    const style = QuestionBlock();

    const sliderChanged = (newValue: number, knowledge: boolean) => {
        if(knowledge){
            setKnowledgeValue(newValue);
            props.updateAnswer(props.questionId, knowledgeValue, newValue);
        } else {
            setMotivationValue(newValue);
            props.updateAnswer(props.questionId, newValue, motivationValue);
        }
    };

    useEffect(() => {
        setKnowledgeValue(props.knowledgeDefaultValue);
        setMotivationValue(props.motivationDefaultValue);
    }, [props.knowledgeDefaultValue, props.motivationDefaultValue]);

    return (
        <div className={style.root}>
            <div className={style.topic}>{props.topic}</div>
            <div className={style.text}>{props.text}</div>
            <div className={style.answerArea}>
                <div className={clsx(style.largeBold)}>KOMPETANSE</div>
                <div className={style.sliderArea}>
                    <div className={style.iconArea}>
                        {Icon.GetIcons(true, style.icon)}
                    </div>
                    <div className={style.slider}>
                        <Slider
                            value={knowledgeValue}
                            knowledge={true}
                            sliderChanged={sliderChanged}
                        />
                    </div>
                </div>
            </div>
            <div className={style.answerArea}>
                <div className={clsx(style.largeBold)}>MOTIVASJON</div>
                <div className={style.sliderArea}>
                    <div className={style.iconArea}>
                        {Icon.GetIcons(false, style.icon)}
                    </div>
                    <div className={style.slider}>
                        <Slider
                            value={motivationValue}
                            knowledge={false}
                            sliderChanged={sliderChanged}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default Question;