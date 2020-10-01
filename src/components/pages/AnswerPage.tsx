import React from 'react'
import { AnswerProps } from '../../types';
import Form from '../Form'


const AnswerPage = ({...props}: AnswerProps) => {
    
    return(
        <div>
            <Form {...props} />
        </div>
    );

};

export default AnswerPage;