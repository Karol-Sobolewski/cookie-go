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
  const menuItems = useSelector((state) => state.menus.data);
  // const stateU = useSelector((state) => state);
  const activeLanguage = useSelector(
    (state) => state.menus.data.activeLanguage
  );
  // console.log(`menu`, stateU);
  console.log(`menulang`, menuItems);
  console.log(`activeLanguage`, activeLanguage);

  return (
    <div className={clsx(className, styles.root)}>
      <Container>
        <Row className="d-flex justify-content-between align-items-center">
          {/* eslint-disable */}
          {activeLanguage === `English`
            ? menuItems.english.map((item) => (
                <Col key={item.id}>
                  <NavLink to={{pathname: `/${item.src}`, componentProps: `en`}} activeClassName="active">
                    {item.title}
                  </NavLink>
                </Col>
              ))
            : menuItems.polish.map((item) => (
              <Col key={item.id}>
                <NavLink to={{pathname: `/${item.src}`, componentProps: `pl`}} activeClassName="active">
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
