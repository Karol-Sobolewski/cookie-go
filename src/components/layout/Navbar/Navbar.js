import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import { Cart } from '../../features/Cart/Cart';
import { ResponsiveMenu } from '../ResponsiveMenu/ResponsiveMenu';
import styles from './Navbar.module.scss';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  const [cartRWD, setcartRWD] = useState(false);
  const size = window.innerWidth;
  console.log(size);
  useEffect(() => {
    if (size <= 1200) {
      setcartRWD(true);
    }
  }, [size]);
  const menuItems = useSelector((state) => state.menus.data);
  // const stateU = useSelector((state) => state);
  const activeLanguage = useSelector(
    (state) => state.menus.data.activeLanguage
  );

  return (
    <div className={clsx(className, styles.root)}>
      <Container className={styles.mainMenu}>
        <Row className="d-flex justify-content-center align-items-center">
          {menuItems.pages.map((item) => (
            <Col key={item.id}>
              <NavLink
                to={{ pathname: `/${item.src}` }}
                activeClassName="active"
              >
                {activeLanguage === `Polish`
                  ? item.titlePolish
                  : item.titleEnglish}
              </NavLink>
            </Col>
          ))}
          {/* //TODO Language -> button with dispatch instead of NavLink
          */}
          <Col className={styles.changeLanguage}>
            {activeLanguage === `Polish` ? (
              <h3>
                {/* <NavLink to={{ pathname: `/en` }} activeClassName="active"> */}
                EN
                {/* </NavLink> */}
              </h3>
            ) : (
              <h3>
                {/*   to={{ pathname: `/pl`, componentProps: `pl` }}
                activeClassName="active"
               > */}
                PL
              </h3>
            )}
          </Col>
          <Col className={styles.cartMenu}>
            <Cart RWD={cartRWD} />
          </Col>
        </Row>
        <main>{children}</main>
      </Container>
      <ResponsiveMenu />
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
