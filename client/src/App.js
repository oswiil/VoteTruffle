import React from 'react';

import Layout from './components/Layout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NewVotePage from './pages/NewVotePage';
import Home from './pages/Home';
import JoinVote from './pages/JoinVotePage';

const Title = 'Bienvenido';

export default () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <h1>{Title}</h1>
                <Layout>
                  <Home SetTitle />
                </Layout>
              </div>
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
            path="/entrarVotacion"
            render={() => (
              <Layout>
                <JoinVote />
              </Layout>
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
