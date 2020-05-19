import React from 'react';
import { Container, Jumbotron } from 'reactstrap';

/**
 * Home page component
 * @component
 */
const Home = () => {
  return (
    // <div>
    <Container>
      <Jumbotron>
        <h1 className='text-center'>Velkommen</h1>
      </Jumbotron>
    </Container>
    // </div>
  );
};

export default Home;
