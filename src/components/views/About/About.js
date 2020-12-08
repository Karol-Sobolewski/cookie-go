import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './About.module.scss';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import initialState from '../../../redux/initialState';

const state2 = {
  count: ``,
};

function reducer(state, action) {
  switch (action.type) {
    case `PL`:
      return { count: state.count + 1 };
    case `EN`:
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const Component = ({ className, language, children }) => {
  const PageItems = useSelector((state4) => state4);
  console.log(`PageItems`, PageItems);
  const [lang, setLanguage] = useState(initialState.activeLanguage);
  const [state, dispatch] = useReducer(reducer, state2);

  useEffect(() => {
    console.log(language);
    if (language === `PL`) {
      dispatch({ type: `PL` });
      console.log(state2);
      setLanguage(`Polish`);
    } else {
      console.log(`stateabout`, initialState);
      setLanguage(`English`);
    }
  }, []);
  return (
    <div className={clsx(className, styles.root)}>
      {language === `PL` || lang === `Polish` ? (
        <Container>
          <Row>About</Row>
          <Row className={styles.aboutGrid}>
            {initialState.about.polish.descriptions.map((item) => (
              <Row key={item.id}>
                <Col
                  className={`col-12 col-lg-6 d-flex justify-content-center align-items-center ${styles.aboutFeature}`}
                >
                  <p>{item.text}</p>
                </Col>
              </Row>
            ))}
          </Row>
          <main>{children}</main>
        </Container>
      ) : (
        <Container>
          <Row>O nas</Row>
          <main>{children}</main>
        </Container>
      )}
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
  Component as About,
  // Container as About,
  Component as AboutComponent,
};
