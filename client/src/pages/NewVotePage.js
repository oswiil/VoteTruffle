import React from 'react';
import Steps from '../components/Stepper';
import '../App.css';

const NewPoll = ({ children }) => (
  <article id="About">
    <div className="children">{children}</div>
    <Steps />
  </article>
);

export default NewPoll;
