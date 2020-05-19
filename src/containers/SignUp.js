import React, { useState } from 'react';
import {
  Button,
  Container,
  Form,
  Input,
  Label,
  FormGroup,
  Row,
  Col,
} from 'reactstrap';
import apiCall from '../functions/apiCall';
import useInput from '../functions/useInput';
import Alert from '../components/Alert';

/**
 * Container for signing up a new company and admin user.
 * Uses an asynchronous function to submit the new company and user to the API as an object.
 * @component
 */
const SignUp = () => {
  const [inputs, handleChange] = useInput();
  const {
    first_name,
    last_name,
    email,
    phone_number,
    name,
    erp_system,
    password,
  } = inputs || {};
  const [result, setResult] = useState();

  /**
   * Asynchronous function for sending a POST-request containing an object with the company and user information to the API for registering.
   * @param {event} event event
   */
  const registerCompany = async (event) => {
    event.preventDefault();
    try {
      const response = await apiCall('signup', 'POST', inputs);
      setResult(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={registerCompany}>
            <h1 className='h3 mb-3 font-weight-normal'>Register</h1>
            <FormGroup>
              <Label htmlFor='first_name'>Fornavn</Label>
              <Input
                required
                type='text'
                className='form-control'
                name='first_name'
                placeholder='Skriv ditt fornavn'
                defaultValue={first_name}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='last_name'>Etternavn</Label>
              <Input
                required
                type='text'
                className='form-control'
                name='last_name'
                placeholder='Skriv ditt etternavn'
                defaultValue={last_name}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor='email'>E-post adresse</Label>
              <Input
                required
                type='email'
                className='form-control'
                name='email'
                placeholder='Skriv e-post her'
                defaultValue={email}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Telefon</Label>
              <Input
                placeholder='12 12 12 12'
                required
                pattern='[0-9]{8}'
                name='phone_number'
                type='tel'
                defaultValue={phone_number}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='name'>Bedrift navn</Label>
              <Input
                required
                type='text'
                className='form-control'
                name='name'
                placeholder='Bedrift navn'
                defaultValue={name}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='erp_system'>ERP system</Label>
              <Input
                required
                type='text'
                className='form-control'
                name='erp_system'
                placeholder='ERP system'
                defaultValue={erp_system}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor='password'>Password</Label>
              <Input
                pattern='.{5,}'
                required
                title='Må inneholde minst 5 tegn'
                type='password'
                className='form-control'
                name='password'
                placeholder='Passord'
                defaultValue={password}
                onChange={handleChange}
              />
            </FormGroup>
            <Alert result={result} />
            <FormGroup>
              <Button type='submit' color='primary'>
                Register
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
