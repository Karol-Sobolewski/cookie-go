import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './Navbar.module.scss';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  const menuEnglishItems = useSelector((state) => state.Menu);
  const activeLanguage = useSelector((state) => state.activeLanguage);
  console.log(activeLanguage);
  return (
    <div className={clsx(className, styles.root)}>
      <Container>
        <Row className="d-flex justify-content-between align-items-center">
          {/* eslint-disable */}
          {activeLanguage === `English`
            ? menuEnglishItems.English.map((item) => (
                <Col>
                  <NavLink key={item.id} to={item.src} activeClassName="active">
                    {item.title}
                  </NavLink>
                </Col>
              ))
            : menuEnglishItems.Polish.map((item) => (
              <Col>
                <NavLink key={item.id} to={item.src} activeClassName="active">
                  {item.title}
                </NavLink>
              </Col>
            ))}
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
  Component as Navbar,
  // Container as Navbar,
  Component as NavbarComponent,
};
