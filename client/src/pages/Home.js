import React from 'react';
import '../App.css';

import CargarWeb3Entrada from '../components/CargarWeb3Entrada';
const Home = ({ children }) => (
  <>
    {' '}
    <div className="children">{children}</div> {CargarWeb3Entrada}
  </>
);
export default Home;
