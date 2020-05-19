import React from 'react';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';

/**
 * Component for letting the user change password
 * @component
 * @param {props} props props passed from container
 */
const ChangePassword = (props) => {
  /**
   * Destructuring functions and password variable from props
   */
  const { handleChange, password, email, phone_number, first_name, last_name, onSubmit } = props;

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label>Fornavn</Label>
        <Input
          type='text'
          onChange={handleChange}
          name='first_name'
          defaultValue={first_name}
        />
      </FormGroup>
      <FormGroup>
        <Label>Etternavn</Label>
        <Input
          type='text'
          onChange={handleChange}
          name='last_name'
          defaultValue={last_name}
        />
      </FormGroup>
      <FormGroup>
        <Label>E-post</Label>
        <Input
          type='email'
          onChange={handleChange}
          name='email'
          defaultValue={email}
        />
      </FormGroup>
      <FormGroup>
        <Label>Telefon</Label>
        <Input
          name='phone_number'
          pattern='[0-9]{8}'
          type='tel'
          defaultValue={phone_number}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Passord</Label>
        <Input
          type='password'
          onChange={handleChange}
          name='password'
          defaultValue={password}
          pattern='.{5,}'
          title='Passord skal bestå av minst 5 tegn'
        />
      </FormGroup>
      <Button size='sm' type='submit' color='success'>
        Lagre endringer
      </Button>
    </Form>
  );
};
export default ChangePassword;
