import React from 'react';

import '../App.css';
import InsertLink from '../components/insertLink';
import { RenderVotes } from '../components/Vote';
const JoinVote = ({ children }) => (
  <div>
    <div className="children">
      {children}
      <InsertLink />
      <RenderVotes />
    </div>
  </div>
);
export default JoinVote;
