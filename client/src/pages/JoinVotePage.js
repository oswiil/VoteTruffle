import React from 'react';

import '../App.css';
import InsertLink from '../components/insertLink';
import Vote from '../components/Vote';
const JoinVote = ({ children }) => (
  <div>
    <div className="children">
      <InsertLink />

      <Vote />
      {children}
    </div>
  </div>
);
export default JoinVote;
