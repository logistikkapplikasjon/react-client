import React from 'react';
/**
 * Component that shows a dynamic illustration of a spinning wheel
 * @component
 */
const Loading = () => {
  return (
    <div className='lds-ring'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
