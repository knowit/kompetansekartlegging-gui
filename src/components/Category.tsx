import React, { useEffect } from 'react'
import { QuestionBlock } from '../styles'

type CategoryProps = {
    name: string,
    children: JSX.Element[],
    activeCategory: string
}

export const Category = ({...props}: CategoryProps) => {
    const style = QuestionBlock();

    useEffect(() => {console.log(props.activeCategory)}, []);

    useEffect(() => {
        console.log(props.activeCategory);
    }, [props.activeCategory]);

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
