import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Redirect } from 'react-router'; //eslint-disable-line
import { useSelector } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './NotFound.module.scss';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  const [redirect, setRedirect] = useState(false);
  // console.log(language);
  // TODO useHistory

  useEffect(() => {
    const timeOut = setTimeout(() => setRedirect(true), 5000);
    return () => clearTimeout(timeOut);
  });
  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
  return (
    <div className={clsx(className, styles.root)}>
      {redirect ? (
        <Redirect to="/" />
      ) : (
        <Container>
          <Row>
            <Col>
              {activeLanguage === `English` ? (
                <div>
                  <h2>Sorry, Page Not Found</h2>
                  <p>You will be redirected automatically in 5 seconds</p>
                  <a href="/">Go to Home Page</a>
                </div>
              ) : (
                <div>
                  <h2>Nie znaleziono strony</h2>
                  <p>Zostaniesz automatycznie przekierowany za 5 sekund</p>
                  <a href="/">Wroc do strony glownej</a>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      )}
      <main>{children}</main>
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
  Component as NotFound,
  // Container as NotFound,
  Component as NotFoundComponent,
};
