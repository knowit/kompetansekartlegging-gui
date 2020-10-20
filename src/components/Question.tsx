import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { QuestionProps } from '../types';
import { QuestionBlock } from '../styles';
import Slider from './Slider';



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
        <div>

            <div className={style.topic}>{props.topic}</div>
            <div className={style.text}>{props.text}</div>
            <div className={style.sliderGroup}>
                <div className={clsx(style.largeBold, style.sliderComponent)}>KOMPETANSE</div>
                <div className={clsx(style.smallBold, style.sliderComponent)}>Kjenner ikke til området</div>
                <Slider
                        value={knowledgeValue}
                        motivation={false}
                        sliderChanged={sliderChanged}
                    />
                {/* <div className={style.sliderComponent}>
                    
                </div> */}
                <div className={clsx(style.smallBold, style.sliderComponent)}>Ekspert</div>
            </div>
            <div>
                <div className={style.largeBold}>Motivasjon</div>
                <div className={style.smallBold}>Ikke motivert i det heletatt</div>
                <div>
                    <Slider
                        value={motivationValue}
                        motivation={true}
                        sliderChanged={sliderChanged}
                    />
                </div>
                <div className={style.smallBold}>Ekstremt motivert</div>
            </div>
        </div>
    );
    
};

export default Question;