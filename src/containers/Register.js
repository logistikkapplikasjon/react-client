import React, { useState, useEffect } from 'react';
import apiCall from '../functions/apiCall';
import useInput from '../functions/useInput';
import RegisterUser from '../components/Forms/RegisterUser';
import RegisterItem from '../components/Forms/RegisterItem';
import RegisterItemType from '../components/Forms/RegisterItemType';
import RegisterProject from '../components/Forms/RegisterProject';
import Loading from '../components/Loading';
import chooseEntity from '../functions/chooseEntity';
import getItemTypesName from '../functions/getItemTypesName';

/**
 * Container for registering new entities.
 * Gets entity and id from props.match.params and shows the correct form for the entity.
 * Uses hooks to fetch data and a submit function for sending POST requests using the apiCall function.
 * @component
 */

const Register = (props) => {
  const [inputs, handleChange] = useInput();
  const { type } = props.match.params;
  const [entity, setEntity] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [typename, setTypeName] = useState([]);

  /**
   * Asynchronous function for sending a POST-request to the API containing an object of the entity that should be stored in the database.
   * @param {event} event event
   */
  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await apiCall(entity, 'POST', inputs);
      setResult(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
     * Function for setting entity name. Using type from prop.match.params.
     */
    setEntity(chooseEntity(type));
  }, [type]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        (entity === 'users' && (
          <RegisterUser
            handleChange={handleChange}
            inputs={inputs}
            onSubmit={onSubmit}
            result={result}
          />
        )) ||
        (entity === 'items' && (
          <RegisterItem
            handleChange={handleChange}
            inputs={inputs}
            onSubmit={onSubmit}
            result={result}
            typename={typename}
          />
        )) ||
        (entity === 'itemtypes' && (
          <RegisterItemType
            handleChange={handleChange}
            inputs={inputs}
            onSubmit={onSubmit}
            result={result}
          />
        )) ||
        (entity === 'projects' && (
          <RegisterProject
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

export default Register;
