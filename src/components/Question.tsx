import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { QuestionProps } from '../types';
import Slider from './Slider';
import { makeStyles } from '@material-ui/core';
import { KnowitColors } from '../styles';

const QuestionBlock = makeStyles({
    root: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        backgroundColor: KnowitColors.ecaluptus
    },
    topic: {
        fontSize: 18,
        fontWeight: "bold"
    },
    sliderGroup: {
        display: 'flex',
        flexWrap: "nowrap",
        justifyContent: 'flex-start',
        alignItems: 'center'
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

    const sliderChanged = (newValue: number, motivation: boolean) => {
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
            <div className={style.topic}>{props.topic}</div>
            <div>{props.text}</div>
            <div> {/*className={style.sliderGroup}>*/}
                <div className={clsx(style.largeBold)}>KOMPETANSE</div>
                {/* <div className={clsx(style.smallBold)}>Kjenner ikke til området</div> */}
                <Slider
                        value={knowledgeValue}
                        motivation={false}
                        sliderChanged={sliderChanged}
                    />
                {/* <div className={clsx(style.smallBold)}>Ekspert</div> */}
            </div>
            <div>
                <div className={style.largeBold}>Motivasjon</div>
                {/* <div className={style.smallBold}>Ikke motivert i det heletatt</div> */}
                <div>
                    <Slider
                        value={motivationValue}
                        motivation={true}
                        sliderChanged={sliderChanged}
                    />
                </div>
                {/* <div className={style.smallBold}>Ekstremt motivert</div> */}
            </div>
        </div>
    );
    
};

export default Question;