import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, UncontrolledTooltip } from 'reactstrap';
import ModalComponent from '../Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

/**
 * Component for showing a list of users.
 * @component
 * @param {props} props props passed from container
 */
const UserList = (props) => {
  /**
   * Destructuring of props from container
   */
  const {
    setUserToDelete,
    userList,
    handleClose,
    handleShow,
    modal,
    setModal,
    id,
    setId,
    user_id,
  } = props;

  return (
    <>
      <hr />
      {userList &&
        userList
          .filter((user) => user.user_id !== user_id)
          .map((user) => (
            <div key={user.user_id}>
              <Row>
                <Col>
                  <h3>
                    {user.first_name} {user.last_name}
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col>Telefon: {user.phone_number}</Col>
              </Row>
              <Row>
                <Col>
                  <a href='mailto:{user.email}'>{user.email}</a>
                </Col>
              </Row>

              <Row>
                <Col>
                  <strong>{user.user_level}</strong>
                </Col>
                <br />
              </Row>
              <Row>
                <Col xs='auto'>
                  <Link
                    to={{
                      pathname: '/Edit/user/' + user.user_id,
                    }}
                  >
                    <UncontrolledTooltip placement='left' target='Endre'>
                      Endre
                    </UncontrolledTooltip>
                    <Button id='Endre' color='info' size='sm'>
                      <FontAwesomeIcon icon={faPencilAlt} /> Endre
                    </Button>
                  </Link>{' '}
                  <UncontrolledTooltip placement='right' target='Slette'>
                    Slette
                  </UncontrolledTooltip>
                  <Button
                    id='Slette'
                    onClick={() => {
                      setId(user.user_id);
                      handleShow();
                    }}
                    outline
                    color='info'
                    size='sm'
                  >
                    <FontAwesomeIcon icon={faTrashAlt} /> Slette
                  </Button>
                </Col>
              </Row>

              <ModalComponent
                modal={modal}
                handleClose={handleClose}
                deleteFunction={setUserToDelete}
                setModal={setModal}
                id={id}
              />
              <hr />
            </div>
          ))}
    </>
  );
};
export default UserList;
