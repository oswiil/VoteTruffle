import React from 'react';
import '../App.css';
import Vote from '../components/Vote';
const VotePage = () => (
  <article id="About">
    <div className="children">{children}</div>
    <Vote />
  </article>
);

export default VotePage;
