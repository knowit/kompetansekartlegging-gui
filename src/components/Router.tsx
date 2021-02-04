import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { FromAppProps } from '../types';
import * as Page from './pages/Pages'; //Directory file for all pages


const Router = ({...props}: FromAppProps) => {

    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route path="/admin">
                    <Page.WIPPage />
                </Route>
                <Route path="/user">
                    <Page.UserPage {...props.userProps} />
                </Route>
                <Route path="/answer">
                    {/* <Page.AnswerPage {...props.answerProps} /> */}
                </Route>
                <Route path="/stats">
                    <Page.StatsPage {...props.statsProps} />
                </Route>
                <Route path="/home">
                    <Page.HomePage />
                </Route>
                <Route path="/*">
                    <Page.Page404 />
                </Route>
                
                
            </Switch>
        </div>
    );

};

export default Router;