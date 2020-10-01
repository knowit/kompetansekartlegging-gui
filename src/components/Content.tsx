import React from 'react'

type Props = {
    createUserForm: () => void,
    updateAnswer: (key: string, rating: number) => void,
    formDefinition: any
}

const Content = ({...props}: Props) => {





    return(
        <div>
            Content
        </div>
    );

};

export default Content;