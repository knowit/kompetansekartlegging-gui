import { makeStyles } from '@material-ui/core';
import React, { Fragment } from 'react'
import { KnowitColors } from '../styles'
import { CategoryProps } from '../types';



const categoryStyle = makeStyles({
    categoryText: {
        fontSize: 22,
        fontWeight: 'bold'
    }
});

export const Category = ({...props}: CategoryProps) => {
    const style = categoryStyle();

    return (
        <Fragment>
            <div className={style.categoryText}>
                {props.name}
            </div>
            {props.children}
        </Fragment>
    )
}
