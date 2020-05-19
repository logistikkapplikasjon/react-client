import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import apiCall from '../functions/apiCall';
import Loading from '../components/Loading';
import useInput from '../functions/useInput';

/**
 * Container for logging in users.
 * Shows a form with username and password, login button and register button.
 * @component
 */
const Login = () => {
  const [inputs, handleChange] = useInput();
  const [result, setResult] = useState({ data: '', isFetching: false });
  const { email, password } = inputs;

  /**
   * Submit function that makes a POST-request to the API containing user inputted username and password as an object.
   * Stores the result in state.
   * @param {event} event event
   */
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setResult({ data: '', isFetching: true });
      const response = await apiCall('signin', 'POST', inputs);
      setResult({ data: response, isFetching: false });
      if (response.token) {
        /**
         * Function for storing a JWT-token in localStorage and redirecting the user to the profile page.
         */
        localStorage.setItem('usertoken', response.token);
        window.location.href = '/Profile';
      }
    } catch (error) {
      console.log(error);
      setResult({ data: '', isFetching: false });
    }
  };

  return (
    <>
      {result.isFetching ? (
        <Loading />
      ) : (
        <LoginForm
          email={email}
          password={password}
          handleChange={handleChange}
          onSubmit={onSubmit}
          result={result}
        />
      )}
    </>
  );
};

export default Login;
