import React from 'react'
import Form from '../Form'

type Props = {
    createUserForm: () => void,
    updateAnswer: (key: string, rating: number) => void,
    formDefinition: any
}

const AnswerPage = ({...props}: Props) => {





    return(
        <div>
            <Form {...props} />
        </div>
    );

};

export default AnswerPage;