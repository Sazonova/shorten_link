import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LinksPage } from './pages/LinksPage';
import { CreatePage } from './pages/CreatePage';
import { DetailPage } from './pages/DetailPage';
import { Auth } from './pages/Auth';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
              <Route exact path="/link">
                  <LinksPage />
              </Route>
              <Route exact path="/create">
                  <CreatePage />
              </Route>
              <Route path="/details/:id">
                  <DetailPage />
              </Route>
              <Redirect to="/create" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route exact path="/">
                <Auth />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}