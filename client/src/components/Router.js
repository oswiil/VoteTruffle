import React from 'react';
import { BrowserRouter, Switch, Route, useParams } from 'react-router-dom';
import Home from '../pages/Home.js';

import NewVotePage from '../pages/NewVotePage.js';
import VotePage from '../pages/VotePage.js';
import Layout from './Layout';
export default function Router() {
  const params = useParams();
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Layout>
              <Home />
            </Layout>
          )}
        />
        <Route
          path="/crearVotacion"
          render={() => (
            <Layout>
              <NewVotePage />
            </Layout>
          )}
        />

        <Route
          path="/votar/:idVotacion"
          render={() => (
            <Layout>
              <VotePage />
            </Layout>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
}
