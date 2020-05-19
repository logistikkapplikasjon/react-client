import React from 'react';
import { UncontrolledAlert } from 'reactstrap';

const Alert = (props) => {
  const { result } = props;
  return (
    <div>
      {result && result.result ? (
        <UncontrolledAlert color='success'>{result.message}</UncontrolledAlert>
      ) : undefined}
      {result && result.error ? (
        <UncontrolledAlert color='danger'>
          {result.message}
          <br />
          {result.error.detail}
        </UncontrolledAlert>
      ) : undefined}
    </div>
  );
};
export default Alert;
