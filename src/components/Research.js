import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import test_image from './images/head-shot.jpg';

const Research = () => {
  return (
      <>
        <Container className='p-3'>
          <h1>Research Interests</h1>
          <Card className='my-4'>
            <Row className='p-4'>
            <Col minBreakpoint="xs" xs={6} s={4} md={2}>
              <Card.Img src={test_image} width={100}></Card.Img>
            </Col>

            <Col xs={10} md={10}>
              <Card.Body>
                <Card.Title>Quantum Computing</Card.Title>
                <Card.Text>
                  I am interested in a variety of research topics, including topic 1, topic 2, and topic 3. 
                </Card.Text>
              </Card.Body>
            </Col>
            </Row>
          </Card>

          

          <Card className='my-4'>
            <Card.Body>
              <Card.Title>Machine Learning</Card.Title>
              <Card.Text>
                I am interested in a variety of research topics, including topic 1, topic 2, and topic 3. 
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className='my-4'>
            <Card.Body>
              <Card.Title>Machine Learning Research</Card.Title>
              <Card.Text>
                I am interested in a variety of research topics, including topic 1, topic 2, and topic 3. 
              </Card.Text>
            </Card.Body>
          </Card>


        </Container>
      </>
        
  );
};

export default Research;
