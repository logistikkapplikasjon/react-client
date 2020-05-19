import React, { useState } from 'react';
import ChangePassword from './ChangePassword';
import {
  Container,
  Row,
  Col,
  Button,
  Collapse,
  Card,
  CardBody,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

/**
 * Component for showing the users profile in the profile container.
 * @component
 * @param {props} props props passed from container
 */

const UserProfile = (props) => {
  /**
   * Destructuring of the user object from props
   */
  const {
    user_id,
    first_name,
    last_name,
    email,
    user_level,
    phone_number,
  } = props.user;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  /**
   * Destructuring of functions passed from props
   */
  const { handleChange, password, onSubmit } = props;

  return (
    <>
      <Container id="profile">
        <Row>
          <Col>
            ID
          </Col>
          <hr />
          <Col>
            {user_id}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            Fornavn
          </Col>
          <Col>
            {first_name}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            Etternavn
          </Col>
          <Col>
            {last_name}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            E-postadresse
          </Col>
          <Col>
            {email}
          </Col>
          <hr />
        </Row>
        <hr />
        <Row>
          <Col>
            Telefon
          </Col>
          <hr />
          <Col>
            {phone_number}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            Tilgangsnivå
          </Col>
          <Col>
            {user_level}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs='6' sm='4'>
            <Button
              color='primary'
              onClick={toggle}
              style={{ marginBottom: '1rem' }}
            >
              <FontAwesomeIcon icon={faPencilAlt} /> Endre
            </Button>
          </Col>
          <Col>
          </Col>
        </Row>
        <Row>
          <Col>
            <Collapse isOpen={isOpen}>
              <Card>
                <CardBody>
                  Endre profil
                  <ChangePassword
                    handleChange={handleChange}
                    password={password}
                    first_name={first_name}
                    last_name={last_name}
                    email={email}
                    phone_number={phone_number}
                    onSubmit={onSubmit}
                  />
                </CardBody>
              </Card>
            </Collapse>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default UserProfile;
