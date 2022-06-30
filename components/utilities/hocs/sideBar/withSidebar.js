import React from 'react';
import Sidebar from '../../components/sidebar';
export default (WrappedComponent, pages) => {
  console.log(pages);
  const hocComponent = ({ ...props }) => (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <WrappedComponent {...props} />
    </div>
  );

  return hocComponent;
};
