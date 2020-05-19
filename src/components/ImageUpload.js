import React from 'react';
import { Button } from 'reactstrap';
import { Container, Row, Col, Input } from 'reactstrap';

/**
 * Component for uploading an image to the object detector.
 * @component
 * @param {props} props props passed from container
 */
const ImageUpload = (props) => {
  /**
   * Destructuring of functions passed from the container as props.
   */
  const { submitPicture, onChangePictureInput, disabled } = props;
  return (
    <Container>
      <Row>
        <Col>
          <h3 className='h3 mb-3 font-weight-normal'>Last opp bilde</h3>
          <Input
            type='file'
            accept='image/jpeg, image/png'
            className='form-control'
            name='imageData'
            onChange={onChangePictureInput}
            disabled={disabled}
          />
          <Button
            onClick={submitPicture}
            color='primary'
            size='sm'
            disabled={disabled}
          >
            Last opp
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default ImageUpload;
