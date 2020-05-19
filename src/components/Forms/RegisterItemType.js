import React from 'react';
import { Container, FormGroup, Button, Form, Label, Input } from 'reactstrap';
import Alert from '../Alert';
import BackButton from '../BackButton';

/**
 * Component for generating a form for registering item types.
 * @component
 * @param {props} props props passed from container
 */
const RegisterItemType = (props) => {
  const { item_type_name, description } = props.inputs || {};
  const { onSubmit, handleChange, result } = props;
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Navn</Label>
          <Input
            placeholder='Navn'
            required
            name='item_type_name'
            type='text'
            defaultValue={item_type_name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Beskrivelse</Label>
          <Input
            placeholder='Beskrivelse'
            required
            name='description'
            type='textarea'
            defaultValue={description}
            onChange={handleChange}
          />
        </FormGroup>
        <Button size='sm' type='submit' color='primary'>
          Registrer
        </Button>{' '}
        <BackButton />
      </Form>
      <br />
      <Alert result={result} />
    </Container>
  );
};
export default RegisterItemType;
