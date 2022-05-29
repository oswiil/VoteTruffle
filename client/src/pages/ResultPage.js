import React from 'react';
import '../App.css';
import ResultComponent from '../components/resultPage';
const ResultPage = ({ children }) => (
  <article id="About">
    <div className="children">{children}</div>
    <ResultComponent />
  </article>
);

export default ResultPage;
