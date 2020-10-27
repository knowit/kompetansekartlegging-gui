import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { QuestionProps } from '../types';
import Slider from './Slider';
import { Icon, makeStyles, SvgIcon } from '@material-ui/core';
import { KnowitColors, IconPaths } from '../styles';
// import icons from './data'

/*
    Create image controller in data folder
    import all images there and export function to
    get a single image based om a string or something

*/

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
        width: '100%'
    },
    iconArea: {
        width: '100%',
        height: 30
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

    const createSliderIcons = (motivation: boolean): JSX.Element[] => {
        let icons: JSX.Element[] = [];
        if(motivation){
            IconPaths.slice(6).forEach(path => {
                icons.push(
                    <SvgIcon>
                        <path d={`../../data/${path}`} />
                    </SvgIcon>
                );
            });
        } else {
            IconPaths.slice(0, 6).forEach((path, index) => {
                // console.log(`../../data/${path}`);
                icons.push(
                    <Icon key={index} style={{textAlign: "center"}}>
                        <img style={{height: '100%'}} src={`./data/K_ingen.svg`} /> 
                        {/* `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTVJDpGrsSOmxRkcHECYt_goEIEgFcxjfNQYw&usqp=CAU`} /> */}
                        {/* <path d={`../../data/${path}`} /> */}
                    </Icon>
                );
            });
        }
        return icons;
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
                        {createSliderIcons(false)}
                    </div>
                    <div className={style.slider}>
                        <Slider
                            value={knowledgeValue}
                            motivation={false}
                            sliderChanged={sliderChanged}
                        />
                    </div>
                </div>
                {/* <div className={clsx(style.smallBold)}>Ekspert</div> */}
            </div>
            {/* <div>
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
            </div> */}
        </div>
    );
    
};

export default Question;