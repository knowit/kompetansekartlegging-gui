import React from 'react';
import Selector from './Selector';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 10,
        backgroundColor: 'lightBlue'
    },
    motivation: {
        marginTop: 20
    },
    selector: {
        marginTop: 5
    }
}));

type Props = {
    updateAnswer: (listId: string, value: number, motivation: boolean) => void,
    topic: string,
    text: string,
    questionId: string,
    knowledgeChecked: number,
    motivationChecked: number
}

const Question = ({...props}: Props) => {

    const styles = useStyles();

    const radiobuttonClicked = (value: number, motivation: boolean) => {
        props.updateAnswer(props.questionId, value, motivation);
    }

    return (
        <div className={styles.root}>
            <div>
                <div>{props.topic}</div>
                <div>{props.text}</div>
                <div className={styles.selector}>
                    <Selector
                        radiobuttonChanged={radiobuttonClicked} 
                        motivation={false} 
                        questionId={props.questionId} 
                        checked={props.knowledgeChecked} 
                    />
                </div>
            </div>
            <div className={styles.motivation}>
                <div>{props.topic} motivasjon</div>
                <div className={styles.selector}>
                    <Selector 
                        radiobuttonChanged={radiobuttonClicked} 
                        motivation={true}
                        questionId={props.questionId} 
                        checked={props.motivationChecked} 
                    />
                </div>
            </div>
        </div>
    )
    
}

export default Question;