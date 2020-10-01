import React from 'react'
import Router from './Router'

type Props = {
    createUserForm: () => void,
    updateAnswer: (key: string, rating: number) => void,
    formDefinition: any
}

const Content = ({...props}: Props) => {





    return(
        <div>
            <Router />
        </div>
    );

};

export default Content;