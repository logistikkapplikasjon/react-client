import React from 'react';
import { Container, FormGroup, Button, Form, Label, Input } from 'reactstrap';
import Alert from '../Alert';
import BackButton from '../BackButton';

/**
 * Component for generating a form for registering items
 * @component
 * @param {props} props props passed from container
 */
const RegisterItem = (props) => {
  const { name, amount } = props.inputs || {};
  const { onSubmit, handleChange, result, typename } = props;

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Navn</Label>
          <Input
            placeholder='Navn'
            required
            name='name'
            type='text'
            defaultValue={name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Antall</Label>
          <Input
            placeholder='12345'
            required
            name='amount'
            type='number'
            min='1'
            defaultValue={amount}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='item_type_id'>Varetype</Label>
          <Input
            type='select'
            name='item_type_id'
            // defaultValue={typename.item_type_name}
            onChange={handleChange}
          >
            <option>Velg her..</option>
            {typename &&
              typename.map((item) => (
                <option key={item.item_type_id} value={item.item_type_id}>
                  {item.item_type_name}
                </option>
              ))}
          </Input>
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

export default RegisterItem;
