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
          <Col className={`col-12 col-xl-6 ${styles.aboutTextColumn}`}>
            {/* eslint-disable */}
            {activeLanguage === `Polish`
              ? aboutPageItems.polish.descriptions.map((item) => (
                  <div key={item.id} className={styles.aboutTextBox}>
                    <p className={styles.aboutParagraph}>{item.text}</p>
                  </div>
                ))
              : aboutPageItems.english.descriptions.map((item) => (
                  <div key={item.id} className={styles.aboutTextBox}>
                    <p className={styles.aboutParagraph}>{item.text}</p>
                  </div>
                ))}
                {/* eslint-enable */}
          </Col>
          <Col className={`col-12 col-xl-6 ${styles.aboutPhotoColumn}`}>
            {aboutPageItems.images.map((item) => (
              <div key={item.id} className={styles.aboutPhotoBox}>
                <img src={item.src} alt={item.title} />
              </div>
            ))}
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
};

export {
  Component as About,
  // Container as About,
  Component as AboutComponent,
};
