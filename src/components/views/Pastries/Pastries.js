import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './Pastries.module.scss';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children, language }) => {
  console.log(`Pastries`);
  return (
    <div className={clsx(className, styles.root)}>
      <Container>
        <Row>
          <Col>
            <h2>Pastries</h2>
          </Col>
        </Row>
        <main>{children}</main>
      </Container>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   someProp: reduxSelector(state);
// })

// const mapDispatchToProps = (dispatch) => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),

//   const container = connect(mapStateToProps, mapStateToProps)(Component);
// })

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  language: PropTypes.string,
};

export {
  Component as Pastries,
  // Container as Pastries,
  Component as PastriesComponent,
};
