import { makeStyles } from '@material-ui/core';
import React, { Fragment } from 'react';
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
            {
                props.isMobile ? ""
                : 
                    <div className={style.categoryText}>
                        {props.name}
                    </div>
            }
            
            {props.children}
        </Fragment>
    )
}
