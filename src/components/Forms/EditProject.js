import React from 'react';

import { Container, FormGroup, Input, Button, Form, Label } from 'reactstrap';
import Alert from '../Alert';
import BackButton from '../BackButton';

/**
 * Component for showing a form for editing projects.
 * @component
 * @param {props} props props passed from container
 */
const EditProject = (props) => {
  const { project_number, project_name, project_description } =
    props.inputs || {};
  const { handleChange, onSubmit, result } = props;
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Prosjektnummer</Label>
          <Input
            placeholder='Prosjektnummer'
            required
            name='project_number'
            type='number'
            defaultValue={project_number}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Prosjektnavn</Label>
          <Input
            placeholder='Prosjektnavn'
            required
            name='project_name'
            type='text'
            defaultValue={project_name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Beskrivelse</Label>
          <Input
            placeholder='Beskrivelse'
            required
            name='project_description'
            type='textarea'
            defaultValue={project_description}
            onChange={handleChange}
          />
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
export default EditProject;
