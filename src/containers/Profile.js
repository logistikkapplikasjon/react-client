import React, { useState, useEffect } from 'react';
import apiCall from '../functions/apiCall';
import UserProfile from '../components/UserProfile';
import Loading from '../components/Loading';
import useInput from '../functions/useInput';
import { Container, Col } from 'reactstrap';
import Alert from '../components/Alert';

/**
 * Container for showing the user profile. Shows the user their personal informastion and lets them change their password.
 * @component
 */
const Profile = () => {
  const [data, setData] = useState({ user: '', isFetching: true });
  const [input, handleChange] = useInput();
  const [result, setResult] = useState('');
  const { password, first_name, last_name, email, phone_number } = input || {};

  useEffect(() => {
    /**
     * Asynchronous function for fetching the users data using the /me endpoint. Saves the response data to state.
     */
    const getProfile = async () => {
      try {
        setData({ user: [], isFetching: true });
        const response = await apiCall('me', 'GET');
        setData({ user: response.result, isFetching: false });
      } catch (error) {
        setData({ user: [], isFetching: false });
        console.log(error);
      }
    };
    getProfile({});
  }, []);

  /**
   * Asynchronous function for submitting the changed password to the API. Storing the response in state.
   * @param {event} event event
   */
  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await apiCall('users/' + data.user.user_id, 'PUT', {
      password,
      first_name,
      last_name,
      email,
      phone_number,
    });
    setResult(response);
  };

  return (
    <Container>
      <div>
        <Col>
          <h1 className='text-center'>DIN PROFIL</h1>
          {data.isFetching ? (
            <Loading />
          ) : (
            data.user !== undefined && (
              <UserProfile
                user={data.user}
                handleChange={handleChange}
                password={password}
                first_name={first_name}
                last_name={last_name}
                email={email}
                phone_number={phone_number}
                onSubmit={onSubmit}
              />
            )
          )}
          <Alert result={result} />
        </Col>
      </div>
    </Container>
  );
};
export default Profile;
