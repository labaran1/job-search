import React from 'react';
import Sidebar from '../../components/sidebar';
export default (WrappedComponent, pages) => {
  const hocComponent = ({ ...props }) => (
    <div className="flex h-[92vh] ">
      <Sidebar />
      <WrappedComponent {...props} />
    </div>
  );

  return hocComponent;
};
