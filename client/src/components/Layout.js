import React from 'react';

import Menu from './Menu.js';

const Layout = ({ children }) => (
  <div>
    <Menu />
    {children}
  </div>
);

export default Layout;
