import React from 'react'
import { FromAppProps } from '../types'
import Router from './Router'


const Content = ({...props}: FromAppProps) => {

    return(
        <div>
            <Router {...props} />
        </div>
    );

};

export default Content;