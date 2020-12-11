import React, { Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';
import { QuestionProps } from '../types';
import Slider from './Slider';
import { makeStyles, SvgIcon } from '@material-ui/core';
import { KnowitColors, IconPaths } from '../styles';
import * as Icon from '../icons/iconController';

const questionStyleDesktop = makeStyles({
    root: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        backgroundColor: KnowitColors.white,
        borderRadius: 10,
        width: '90%'
    },
    topic: {
        fontSize: 15,
        fontWeight: "bold"
    },
    text: {
        fontSize: 12,
        paddingTop: 5,
        paddingBottom: 10
    },
    answerArea: {
        display: 'flex',
        flexWrap: "nowrap",
        justifyContent: 'center',
        alignItems: 'center'
    },
    sliderArea: {
        marginLeft: 30,
        marginRight: 20,
        padding: 20,
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
        height: '100%',
        fill: KnowitColors.darkGreen
    },
    smallBold: {
        fontSize: 14,
        fontWeight: "bold"
    },
    largeBold: {
        fontSize: 15,
        fontWeight: "bold"
    }
});

const questionStyleMobile = makeStyles({
    root: {
        marginTop: 10,
        // marginLeft: 10,
        marginRight: 10,
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        // paddingRight: 5,
        backgroundColor: KnowitColors.white,
        borderRadius: 10,
        width: '95%',
        // position: 'absolute'
        // zIndex: 10000

    },
    topic: {
        fontSize: 15,
        fontWeight: "bold"
    },
    text: {
        fontSize: 12,
        paddingTop: 5,
        paddingBottom: 10
    },
    answerArea: {
        // display: 'flex',
        // flexWrap: "nowrap",
        justifyContent: 'center',
        alignItems: 'center'
    },
    sliderArea: {
        marginTop: 20,
        // marginLeft: 30,
        // marginRight: 20,
        // padding: 20,
        width: '90%'
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
        height: '100%',
        fill: KnowitColors.darkGreen
    },
    smallBold: {
        fontSize: 14,
        fontWeight: "bold"
    },
    largeBold: {
        fontSize: 15,
        fontWeight: "bold"
    }
});


const Question = ({...props}: QuestionProps) => {
    
    const [knowledgeValue, setKnowledgeValue] = useState<number>(props.knowledgeDefaultValue);
    const [motivationValue, setMotivationValue] = useState<number>(props.motivationDefaultValue);

    const style = props.isMobile ? questionStyleMobile() : questionStyleDesktop();


    const sliderChanged = (newValue: number, motivation: boolean) => {
        if(motivation){
            setMotivationValue(newValue);
            props.updateAnswer(props.questionId, knowledgeValue, newValue);
        } else {
            setKnowledgeValue(newValue);
            props.updateAnswer(props.questionId, newValue, motivationValue);
        }
        props.setIsCategorySubmitted(false)
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
                            motivation={false}
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
                            motivation={true}
                            sliderChanged={sliderChanged}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default Question;