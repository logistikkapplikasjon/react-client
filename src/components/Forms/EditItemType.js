import React from 'react';

import {
  Container,
  Col,
  Row,
  FormGroup,
  Button,
  Form,
  Label,
  Input,
} from 'reactstrap';
import Alert from '../Alert';
import BackButton from '../BackButton';

/**
 * Component for showing a form for editing itemtypes.
 * @component
 * @param {props} props props passed from container
 */
const EditItemType = (props) => {
  const { item_type_id, item_type_name, description } = props.inputs || {};
  const { onSubmit, handleChange, result } = props;

  return (
    <Container>
      <Row>
        <Col sm='12' md={{ size: 6, offset: 3 }}>
          <h3>Oppdater varetype med id: {item_type_id}</h3>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label>Navn: </Label>
              <Input
                required
                className='form-control'
                defaultValue={item_type_name}
                onChange={handleChange}
                name='item_type_name'
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor='description'>Beskrivelse</Label>
              <Input
                required
                type='text'
                className='form-control'
                name='description'
                defaultValue={description}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Button type='submit' size='sm' value='Lagre' color='primary'>
                Lagre
              </Button>{' '}
              <BackButton />
            </FormGroup>
          </Form>
          <br />
          <Alert result={result} />
        </Col>
      </Row>
    </Container>
  );
};
export default EditItemType;
