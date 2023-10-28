import React from 'react';

const Tab = ({ title, content: Content }) => (
  <div>
    <h2>{title}</h2>
    <Content />
  </div>
);

export default Tab;