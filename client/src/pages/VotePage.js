import React from 'react';
import Steps from '../components/Stepper';
import '../App.css';
import Vote from '../components/Vote';
const VotePage = ({ candidatos }) => (
  <article id="About">
    <div className="children">{children}</div>
    <Vote />
  </article>
);

export default VotePage;
