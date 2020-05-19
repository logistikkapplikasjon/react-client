import React from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';

/**
 * Component for back button taking the user back to the previous page
 * @component
 */
const BackButton = () => {
  const history = useHistory();
  return (
    <Button
      outline
      color='primary'
      onClick={() => history.goBack()}
      value='Angre'
      size='sm'
    >
      Tilbake
    </Button>
  );
};

export default BackButton;
