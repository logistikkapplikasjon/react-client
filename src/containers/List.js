import React, { useState, useEffect } from 'react';
import UserList from '../components/Lists/UserList';
import ItemList from '../components/Lists/ItemList';
import ItemTypeList from '../components/Lists/ItemTypeList';
import ProjectList from '../components/Lists/ProjectList';
import chooseEntity from '../functions/chooseEntity';
import { Button, Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import apiCall from '../functions/apiCall';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Alert from '../components/Alert';
import getItemTypesName from '../functions/getItemTypesName';

/**
 * Container for viewing a list of entities
 * Fetching entity name from props.match.params and chooses which list to show.
 * Uses hooks to fetch data
 * @component
 */

const List = (props) => {
  const { type } = props.match.params;
  const [entity, setEntity] = useState('');
  const [objectList, setObjectList] = useState();
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState('');
  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);
  const [result, setResult] = useState();
  const [user_id, setUser_id] = useState();
  const [typename, setTypeName] = useState();

  useEffect(() => {
    /**
     * Stores the submitted entity in state.
     */
    setEntity(chooseEntity(type));
  }, [type]);

  useEffect(() => {
    /**
     * fetches the current users information and sets the user_id in state
     */
    const getId = async () => {
      try {
        const response = await apiCall('me', 'GET');
        setUser_id(response.result.user_id);
      } catch (error) {
        console.log(error);
      }
    };
    getId();
  }, []);

  useEffect(() => {
    /**
     * Asynchronous fetch function for getting the name of itemtypes when the container is loaded
     */
    const populateItemTypes = async () => {
      const types = await getItemTypesName();
      setTypeName(types.result);
    };
    populateItemTypes();
  }, []);

  useEffect(() => {
    /**
     * Asynchronous fetch function for sending a GET-request to fetch entities and storing them to the object list in state
     * Dependancy to the entity state and will run if this is changed.
     */
    const getContent = async () => {
      try {
        setLoading(true);
        const response = await apiCall(entity, 'GET');
        setObjectList(response.result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getContent();
  }, [entity]);

  /**
   * Asynchronous delete function that takes in an entity id and submits a DELETE-request to the API.
   * @param {number} entityToDelete id of entity
   */
  const deleteEntity = async (entityToDelete) => {
    try {
      const response = await apiCall(entity + '/' + entityToDelete, 'DELETE');
      if (response.result) {
        const newList = objectList.filter(
          (ent) => ent[type + '_id'] !== entityToDelete
        );
        setObjectList(newList);
      }
      setResult(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <br />
      <Row>
        <Alert result={result} />
      </Row>
      <br />
      {loading ? (
        <Loading />
      ) : (
        (entity === 'users' && (
          <>
            <Col>
              <Row>
                <Link to='/register/user'>
                  <Button color='primary' size='sm'>
                    <FontAwesomeIcon icon={faPlus} /> Ny bruker
                  </Button>
                </Link>
              </Row>
            </Col>
            <br />
            <h2>Oversikt over brukere</h2>
            <UserList
              setUserToDelete={deleteEntity}
              userList={objectList}
              user_id={user_id}
              setId={setId}
              id={id}
              handleClose={handleClose}
              handleShow={handleShow}
              modal={modal}
              setModal={setModal}
            />
          </>
        )) ||
        (entity === 'items' && (
          <>
            <Col>
              <Row>
                <Link to='/register/item'>
                  <Button color='primary' size='sm'>
                    <FontAwesomeIcon icon={faPlus} /> Ny vare
                  </Button>
                </Link>
              </Row>
            </Col>
            <br />
            <h2>Oversikt over varer</h2>

            <ItemList
              setItemToDelete={deleteEntity}
              itemList={objectList}
              setId={setId}
              id={id}
              handleClose={handleClose}
              handleShow={handleShow}
              modal={modal}
              setModal={setModal}
              typename={typename}
            />
          </>
        )) ||
        (entity === 'itemtypes' && (
          <>
            <Col>
              <Row>
                <Link to='/register/item_type'>
                  <Button color='primary' size='sm'>
                    <FontAwesomeIcon icon={faPlus} /> Ny varetype
                  </Button>
                </Link>
              </Row>
            </Col>
            <br />
            <h2> Oversikt over varetyper</h2>
            <ItemTypeList
              setItemTypeToDelete={deleteEntity}
              itemTypeList={objectList}
              setId={setId}
              id={id}
              handleClose={handleClose}
              handleShow={handleShow}
              modal={modal}
              setModal={setModal}
            />
          </>
        )) ||
        (entity === 'projects' && (
          <>
            <Col>
              <Row>
                <Link to='/register/project'>
                  <Button color='primary' size='sm'>
                    <FontAwesomeIcon icon={faPlus} /> Nytt prosjekt
                  </Button>
                </Link>
              </Row>
            </Col>
            <br />
            <h2>Oversikt over prosjekter</h2>
            <ProjectList
              setProjectToDelete={deleteEntity}
              projectList={objectList}
              setId={setId}
              id={id}
              handleClose={handleClose}
              handleShow={handleShow}
              modal={modal}
              setModal={setModal}
            />
          </>
        ))
      )}
    </Container>
  );
};

export default List;
