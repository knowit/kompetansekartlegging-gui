import React, { useEffect } from 'react'
import { QuestionBlock } from '../styles'

type CategoryProps = {
    name: string,
    children: JSX.Element[]
}

export const Category = ({...props}: CategoryProps) => {
    const style = QuestionBlock();

    return (
        <div>
            <div className={style.categoryText}>
                {props.name}
            </div>
            {props.children}
        </div>
    )
}
