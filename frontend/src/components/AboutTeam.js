import React from 'react'
import { Container, Row, Col } from 'react-grid-system';
import Circle from '@uiw/react-color-circle';

function AboutTeam() {
    return (
        <div>
          <h1 className='text-4xl font-bold text-center font-serif'>About the Team</h1>
          <div className='mb-12'></div>
          <Container>
            <Row>
              <Col sm={4}>
              <Circle
                className='justify-center'
                colors={[ 'green' ]}
              />
              <div className='text-2xl font-bold text-center font-serif'>Corey Katchen</div>
              <div className='text-center font-serif'>Mobile App</div>
              </Col>
              <Col sm={4}>
                <Circle
                  className='justify-center'
                  colors={[ 'blue' ]}
                />
                <div className='text-2xl font-bold text-center font-serif'>Isabella Faille</div>
                <div className='text-center font-serif'>Website</div>
              </Col>
              <Col sm={4}>
                <Circle
                  className='justify-center'
                  colors={[ 'purple' ]}
                />
                <div className='text-2xl font-bold text-center font-serif'>Luigi Muccio</div>
                <div className='text-center font-serif'>Mobile App</div>
              </Col>
            </Row>
          </Container>
          <div className='mb-12'></div>
          <Container>
            <Row>
              <Col sm={4}>
                <Circle 
                  className='justify-center'
                  colors={[ 'yellow' ]}
                />
                <div className='text-2xl font-bold text-center font-serif'>Owen Burns</div>
                <div className='text-center font-serif'>Database</div>
              </Col>
              <Col sm={4}>
                <Circle
                  className='justify-center'
                  colors={[ 'orange' ]}
                />
                <div className='text-2xl font-bold text-center font-serif'>Rebeca Rodriguez</div>
                <div className='text-center font-serif'>Project Manager</div>
              </Col>
              <Col sm={4}>
                <Circle
                  className='justify-center'
                  colors={[ 'red' ]}
                />
                <div className='text-2xl font-bold text-center font-serif'>Sean Merkel</div>
                <div className='text-center font-serif'>Website</div>
              </Col>
            </Row>
          </Container>
        </div>
      )
    }

export default AboutTeam;