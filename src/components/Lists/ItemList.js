import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, UncontrolledTooltip } from 'reactstrap';
import ModalComponent from '../Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

/**
 * Component for showing a list of items.
 * @component
 * @param {props} props props passed from container
 */
const ItemList = (props) => {
  /**
   * Destructuring of props from container
   */
  const {
    setItemToDelete,
    itemList,
    handleClose,
    handleShow,
    modal,
    setModal,
    id,
    setId,
    typename,
  } = props;

  return (
    <>
      <hr />
      {itemList &&
        itemList.map(({ item_id, name, item_type_id, amount }) => (
          <div key={item_id}>
            <Row>
              <Col xs='6' sm='4'>
                <h3>{name}</h3>
              </Col>
            </Row>
            <Row>
              <Col xs='6' sm='4'>
                Varetype:{' '}
                {typename && item_type_id !== null
                  ? typename.find((type) => type.item_type_id === item_type_id)
                      .item_type_name
                  : undefined}
              </Col>
              <Col>Antall: {amount}</Col>
              <br />
              <Col xs='auto'>
                <Link
                  to={{
                    pathname: '/Edit/item/' + item_id,
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
                    setId(item_id);
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
            <hr />
          </div>
        ))}
      <ModalComponent
        modal={modal}
        handleClose={handleClose}
        deleteFunction={setItemToDelete}
        setModal={setModal}
        id={id}
      />
    </>
  );
};
export default ItemList;
