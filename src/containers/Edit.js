import React, { useState, useEffect } from 'react';
import useInput from '../functions/useInput';
import apiCall from '../functions/apiCall';
import EditUser from '../components/Forms/EditUser';
import EditItem from '../components/Forms/EditItem';
import EditItemType from '../components/Forms/EditItemType';
import EditProject from '../components/Forms/EditProject';
import Loading from '../components/Loading';
import chooseEntity from '../functions/chooseEntity';
import getItemTypesName from '../functions/getItemTypesName';

/**
 * Container for editing entities.
 * Uses props.match.params to show the correct form for different entities.
 * Uses Hooks to fetch data, and submits PUT-requests by using a submit function through the apiCall function
 * @component
 */

const Edit = (props) => {
  const [inputs, handleChange, initializeInput] = useInput();
  const { type, id } = props.match.params;
  const [entity, setEntity] = useState('');
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState('');
  const [typename, setTypeName] = useState([]);
  const [userLevel, setUserLevel] = useState('');

  useEffect(() => {
    /**
     * Asynchronous fetch function for sending a GET-request to populate a specific entity.
     */
    const getContent = async () => {
      try {
        setLoading(true);
        const data = await apiCall(entity + '/' + id, 'GET');
        delete data.result.password;
        initializeInput(data.result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getContent();
  }, [entity, id, initializeInput]);

  useEffect(() => {
    /**
     * Asynchronous fetch function for getting and populating names of item types. Using imported getItemTypesName function
     */
    const populateItemTypes = async () => {
      const types = await getItemTypesName();
      setTypeName(types.result);
    };
    populateItemTypes();
  }, []);

  useEffect(() => {
    /**
     * Function for setting entity name. Using type from prop.match.params.
     */
    setEntity(chooseEntity(type));
  }, [type]);

  useEffect(() => {
    const populateUserLevel = async () => {
      const response = await apiCall('me', 'GET');
      setUserLevel(response.result.user_level);
    };
    populateUserLevel();
  }, []);

  /**
   * Submit function for sending PUT-requests for updating entities. Uses id from prop.match.params and entity from state.
   * @param {event} event event
   */
  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await apiCall(entity + '/' + id, 'PUT', inputs);
    setResult(response);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        (entity === 'users' && userLevel === 'Admin' && (
          <EditUser
            handleChange={handleChange}
            inputs={inputs}
            onSubmit={onSubmit}
            result={result}
          />
        )) ||
        (entity === 'items' && (
          <EditItem
            handleChange={handleChange}
            inputs={inputs}
            onSubmit={onSubmit}
            result={result}
            typename={typename}
          />
        )) ||
        (entity === 'itemtypes' && (
          <EditItemType
            handleChange={handleChange}
            inputs={inputs}
            onSubmit={onSubmit}
            result={result}
          />
        )) ||
        (entity === 'projects' && (
          <EditProject
            handleChange={handleChange}
            inputs={inputs}
            onSubmit={onSubmit}
            result={result}
          />
        ))
      )}
    </>
  );
};

export default Edit;
