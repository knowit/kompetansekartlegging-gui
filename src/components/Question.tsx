import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { QuestionProps } from '../types';
import Slider from './Slider';
import { makeStyles } from '@material-ui/core';
import { KnowitColors } from '../styles';
import * as Icon from '../icons/iconController';
import { AlertNotification, AlertType } from './AlertNotification';

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
        display: 'flex',
        alignItems: 'center',
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
        height: 30,
        paddingBottom: 10
    },
    icon: {
        height: '100%',
        fill: KnowitColors.darkBrown
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
        fontWeight: "bold",
        display: 'flex',
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
        width: '100%'
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
        props.setIsCategorySubmitted(false);
        // console.log("Slider changed");
        if(motivation){
            setMotivationValue(newValue);
            props.updateAnswer(props.questionId, knowledgeValue, newValue);
        } else {
            setKnowledgeValue(newValue);
            props.updateAnswer(props.questionId, newValue, motivationValue);
        }
    };

    useEffect(() => {
        setKnowledgeValue(props.knowledgeDefaultValue);
        setMotivationValue(props.motivationDefaultValue);
    }, [props.knowledgeDefaultValue, props.motivationDefaultValue]);

    return (
        <div className={style.root}>
            <div className={style.topic}>
                {props.topic}
                {props.alerts?.qidMap.has(props.questionId) ?
                        <AlertNotification
                            type={props.alerts?.qidMap.get(props.questionId)!.type}
                            message={props.alerts?.qidMap.get(props.questionId)!.message}
                        />
                    : ""}
            </div>
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
                            isMobile={props.isMobile}
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
                            isMobile={props.isMobile}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default Question;