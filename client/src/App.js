import React from 'react';

import Layout from './components/Layout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NewVotePage from './pages/NewVotePage';
import Home from './pages/Home';
import JoinVote from './pages/JoinVotePage';
// import './styles.css';
import MarkEmailReadIcon from '@material-ui/icons/MarkunreadMailbox';
import VotePage from './pages/VotePage';
const Title = 'Ethereum Web Polls';
// @tailwind base;
// @tailwind components;
// @tailwind utilities;
export default (theme) => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <figure class="md:flex bg-gray-100 rounded-xl p-8 md:p-0">
                <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
                  <Layout>
                    <Home SetTitle />

                    <figcaption>
                      <h1>
                        {Title} <MarkEmailReadIcon></MarkEmailReadIcon>
                      </h1>
                    </figcaption>
                    <p>
                      In order to use the service you have to make sure{' '}
                      <a href="">Metamamask Extension</a> is installed in your
                      browser.
                    </p>
                  </Layout>
                </div>
              </figure>
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
          <Route
            path="/votar"
            render={() => (
              <Layout>
                <VotePage />
              </Layout>
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
