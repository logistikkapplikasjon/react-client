import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import UnauthRouter from './routes/UnauthRouter';
import AuthedRouter from './routes/AuthedRouter';
import Loading from './containers/Loading';
import apiCall from './functions/apiCall';

const App = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [validated, setValidated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userLevel, setUserLevel] = useState();

  /**
   * function for toggling dropdown menus in navbar
   */
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Function for logging out the user. Removes the usertoken from localStorage and redirects the user to the login page
   * @param {Event} e event
   */
  const logOut = (e) => {
    localStorage.removeItem('usertoken');
    window.location.href = '/login';
  };

  useEffect(() => {
    /**
     * Asynchronous function for validating a users token. Uses a GET-request with a token header expecting to return either an error message with unauthorized or a validated decoded token.
     */
    const validateUser = async () => {
      try {
        setIsFetching(true);
        const response = await apiCall('validate', 'GET');
        if (response.token) {
          setUserLevel(response.token.user_level);
          setValidated(true);
        } else {
          setUserLevel('');
          setValidated(false);
        }
        setIsFetching(false);
      } catch (error) {
        console.log(error);
        setUserLevel('');
        setValidated(false);
      }
    };
    validateUser();
  }, []);

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <Router>
          <Navbar
            userLevel={userLevel}
            toggle={toggle}
            isOpen={isOpen}
            logOut={logOut}
          />
          {validated ? <AuthedRouter /> : <UnauthRouter />}
        </Router>
      )}
    </>
  );
};

export default App;
