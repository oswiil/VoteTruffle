import React from 'react';
import '../App.css';
import RadioButtonChoice from '../components/delegateVote';
const VotePage = ({ children }) => (
  <article id="About">
    <div className="children">{children}</div>
    <RadioButtonChoice />
  </article>
);

export default VotePage;
