import React from 'react';

import MiniDrawer from './Appbar';

const Layout = ({ children }) => (
  <div>
    <MiniDrawer />

    {children}
  </div>
);

export default Layout;
