import React, { useEffect } from 'react'
import { QuestionBlock } from '../styles'

type CategoryProps = {
    name: string,
    children: JSX.Element[],
    activeCategory: string
}

export const Category = ({...props}: CategoryProps) => {
    const style = QuestionBlock();

    return (
        props.activeCategory === props.name ? 
            <div>
                <div className={style.categoryText}>
                    {props.name}
                </div>
                {props.children}
            </div>
        : <div></div>
    )
}
