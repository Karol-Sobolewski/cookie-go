import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './Cart.module.scss'; //eslint-disable-line
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ children }) => {
  const [active, setActive] = useState(false);
  const cartItems = useSelector((state) => state.cart.products);
  const activeLanguage = useSelector(
    (state) => state.menus.data.activeLanguage
  );
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
    <Container ref={wrapperRef} className={styles.root}>
      <button type="button" onClick={() => toggleTrueFalse()}>
        <FontAwesomeIcon
          icon={faShoppingCart}
          className={active ? styles.cartIconActive : styles.cartIcon}
        />
      </button>
      <div className={styles.cartProductIndicator}>
        <div>
          <p>{cartItems.length}</p>
        </div>
      </div>
      <Container className={active ? styles.cartActive : styles.cart}>
        {/* eslint-disable */}
        {cartItems.length
          ? cartItems.map((item) => (
              <Row key={item.id} className={styles.cartProductRow}>
                <Col className={styles.cartImage}><img src={item.image[0].src} alt={item.image[0].title}/></Col>
                <Col>{item.name}</Col>
                <Col>{item.qty}</Col>
                <Col>{item.price}</Col>
                <Col>x</Col>
              </Row>
            ))
          : <h3>{activeLanguage === `Polish` ? `Koszyk jest pusty` : `Cart is empty`}</h3>}
          {/* eslint-enable */}
        <main>{children}</main>
      </Container>
    </Container>
  );
};

Component.propTypes = {
  children: PropTypes.node,
};

export {
  Component as Cart,
  // Container as Cart,
  Component as CartComponent,
};
