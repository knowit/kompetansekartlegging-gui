import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { FromAppProps } from '../types';
import * as Page from './pages/Pages'; //Directory file for all pages


const Router = ({...props}: FromAppProps) => {

    return (
        <div>
            <Switch>
                <Route path="/admin">
                    <Page.AdminPage />
                </Route>
                <Route path="/user">
                    <Page.UserPage />
                </Route>
                <Route path="/answer">
                    <Page.AnswerPage {...props.answerProps} />
                </Route>
                <Route path="/stats">
                    <Page.StatsPage {...props.statsProps} />
                </Route>
                <Route path="/">
                    <Page.HomePage />
                </Route>
            </Switch>
        </div>
    );

};

export default Router;