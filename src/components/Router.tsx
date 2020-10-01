import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import * as Page from './pages/Pages'; //Directory file for all pages

const Router = () => {





    return (
        <div>
            <BrowserRouter>
                <div>
                    <nav>
                        <ul>
                            <li> <Link to="/">Home</Link> </li>
                            <li> <Link to="/stat">Stats</Link> </li>
                            <li> <Link to="/answer">Answer</Link> </li>
                            <li> <Link to="/user">User</Link> </li>
                            <li> <Link to="/admin">Admin</Link> </li>
                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
                        renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/admin">
                            <Page.AdminPage />
                        </Route>
                        <Route path="/user">
                            <Page.UserPage />
                        </Route>
                        <Route path="/answer">
                            <Page.AnswerPage />
                        </Route>
                        <Route path="/stat">
                            <Page.StatPage />
                        </Route>
                        <Route path="/">
                            <Page.HomePage />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );

};

export default Router;