import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { fetchMenu, changeLanguage } from '../../../redux/menuRedux';
import styles from './HomePage.module.scss';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import initialState from '../../../redux/initialState';

const Component = ({ className, language, children }) => {
  const dispatch = useDispatch();

  const location = useLocation();
  useEffect(() => {
    console.log(language);
    if (language) {
      if (language === `en` || location.componentProps === `en`) {
        dispatch(changeLanguage(`English`));
      } else {
        dispatch(changeLanguage(`Polish`));
      }
    }
  }, []);
  return (
    <div className={clsx(className, styles.root)}>
      <Container>
        <Row>
          <Col>
            <h2>HomePage</h2>
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
  Component as HomePage,
  // Container as HomePage,
  Component as HomePageComponent,
};
