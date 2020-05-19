import React from 'react';

import { Container, FormGroup, Input, Button, Form, Label } from 'reactstrap';
import Alert from '../Alert';
import BackButton from '../BackButton';

/**
 * Component for showing a form for editing items
 * @component
 * @param {props} props props passed from container
 */
const EditItem = (props) => {
  const { name, item_type_name } = props.inputs || {};
  const { handleChange, typename, onSubmit, result } = props;
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
          <Label for='item_type_id'>Varetype</Label>
          <Input
            type='select'
            name='item_type_id'
            required
            defaultValue={item_type_name}
            onChange={handleChange}
          >
            <option>Velg her..</option>
            {typename &&
              typename.map((items) => (
                <option key={items.item_type_id} value={items.item_type_id}>
                  {items.item_type_name}
                </option>
              ))}
          </Input>
        </FormGroup>
        <Button size='sm' type='submit' color='primary'>
          Register
        </Button>{' '}
        <BackButton />
      </Form>
      <br />
      <Alert result={result} />
    </Container>
  );
};
export default EditItem;
