import React from 'react';
import { Container, Row, Image, Col } from 'react-bootstrap';
import headShot from './images/head-shot.jpg';


const Home = () => {
  return (
    <div className="text-center py-5">
      <Container>
        <Row>
          <Col>
            <Image src={headShot} roundedCircle width={200} className='m-4'/>
          </Col>
        </Row>
        <Row>
        <h1>Diego Alducin, Ph.D.</h1>
        <p>Your one-stop portfolio for my resume, publications, and contact information.</p>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
