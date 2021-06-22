import React from 'react';

//import './PageWrapper.css';

const PageWrapper = (props) => (
  <div id={`wrapper_${props.id}`}>{props.children}</div>
);

export default PageWrapper;
