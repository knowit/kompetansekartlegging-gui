import React, { useEffect, useState } from 'react';
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
            <div>
                <div className={style.largeBold}>KOMPETANSE</div>
                <div className={style.smallBold}>Kjenner ikke til området</div>
                <div>
                    <Slider
                        value={knowledgeValue}
                        motivation={false}
                        sliderChanged={sliderChanged}
                    />
                </div>
                <div className={style.smallBold}>Ekspert</div>
            </div>

            {/* <div>
                <div className={styles.topic}>{props.topic}</div>
                <div className={styles.text}>{props.text}</div>
                <div className={styles.slider}>
                    <Slider
                        value={knowledgeValue}
                        motivation={false}
                        sliderChanged={sliderChanged}
                    />
                </div>
            </div>
            <div>
                <div className={styles.topic}>{props.topic} motivasjon</div>
                <div className={styles.slider}>
                    <Slider
                        value={motivationValue}
                        motivation={true}
                        sliderChanged={sliderChanged}
                    />
                </div>
            </div> */}
        </div>
    );
    
};

export default Question;