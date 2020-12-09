import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './About.module.scss';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  // const PageItems = useSelector((state4) => state4);
  // console.log(`PageItems`, PageItems);
  // const [lang, setLanguage] = useState(initialState.activeLanguage);
  // const [state, dispatch] = useReducer(reducer, state2);
  const aboutPageItems = useSelector((state) => state.pages.data.about);

  const activeLanguage = useSelector(
    (state) => state.menus.data.activeLanguage
  );
  // useEffect(() => {
  // }, []);
  console.log(aboutPageItems);

  return (
    <div className={clsx(className, styles.root)}>
      <Container>
        <Row className={styles.aboutGrid}>
          {activeLanguage === `Polish`
            ? aboutPageItems.polish.descriptions.map((item) => (
              /* eslint-disable */
                <Row key={item.id}>
                  <Col
                    key={item.id}
                    className={`${styles.aboutFeature} col-12 col-lg-6 d-flex justify-content-center align-items-center`}
                  >
                    <p key={item.id}>{item.text}</p>
                  </Col>
                </Row>
              ))
            : aboutPageItems.english.descriptions.map((item) => (
                <Row key={item.id}>
                  <Col
                    key={item.id}
                    className={`${styles.aboutFeature} col-12 col-lg-6 d-flex justify-content-center align-items-center`}
                  >
                    <p key={item.id}>{item.text}</p>
                  </Col>
                </Row>
            ))}
            {/* eslint-enable */}
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
};

export {
  Component as About,
  // Container as About,
  Component as AboutComponent,
};
