import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './Cart.module.scss'; //eslint-disable-line
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children, language, isActive, RWD }) => {
  const [active, setActive] = useState(false);

  const toggleTrueFalse = () => setActive(!active);
  const useClickOutsideOfCart = (ref) => {
    useEffect(() => {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setActive(false);
        }
      }

      document.addEventListener(`mousedown`, handleClickOutside);
      return () => {
        document.removeEventListener(`mousedown`, handleClickOutside);
      };
    }, [ref]);
  };
  const wrapperRef = useRef(null);
  useClickOutsideOfCart(wrapperRef);

  return (
    <div
      className={`${styles.root} ${RWD ? styles.cartRWD : null}`}
      ref={wrapperRef}
    >
      <FontAwesomeIcon
        icon={faShoppingCart}
        className={active ? styles.cartIconActive : styles.cartIcon}
        onClick={() => toggleTrueFalse()}
      />
      <Container className={active ? styles.cartActive : styles.cart}>
        <Row>
          <Col>
            <h2>Cart</h2>
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
  isActive: PropTypes.bool,
  RWD: PropTypes.bool,
};

export {
  Component as Cart,
  // Container as Cart,
  Component as CartComponent,
};
