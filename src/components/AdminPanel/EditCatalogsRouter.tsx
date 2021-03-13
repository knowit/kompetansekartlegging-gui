import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Route, Switch } from "react-router";

import Root from "./EditCatalogs/Root";
import AddCatalog from "./EditCatalogs/AddCatalog";
import EditCatalog from "./EditCatalogs/EditCatalog";

const EditCatalogsRouter = () => {
    return (
        <MemoryRouter>
            <Switch>
                <Route exact path="/">
                    <Root />
                </Route>
                <Route path="/add">
                    <AddCatalog />
                </Route>
                <Route path="/edit/:id">
                    <EditCatalog />
                </Route>
            </Switch>
        </MemoryRouter>
    );
};

export default EditCatalogsRouter;
