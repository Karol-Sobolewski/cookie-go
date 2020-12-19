import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './Cart.module.scss';
import {
  removeProductFromCart,
  addProductQty,
  subtractProductQty,
} from '../../../redux/cartRedux';

const Component = ({ children }) => {
  const dispatch = useDispatch();

  const [active, setActive] = useState(false);
  const [price, setPrice] = useState(1);

  const cartItems = useSelector((state) => state.cart.products);

  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
  const exchangeRate = useSelector((state) => state.utils.data.rate);

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

  const cartTotalPrice = cartItems.reduce((a, b) => a + (b.price || 0), 0);
  const cartTotalQty = cartItems.reduce((a, b) => a + (b.qty || 0), 0);
  const handleAddQty = (item) => {
    // console.log(item.qty);
    dispatch(addProductQty(item));
    console.log(`add`, item);
    const newPrice = item.qty * item.singlePrice;
    setPrice(newPrice);
  };
  const handleSubtractQty = (item) => {
    // console.log(item);
    dispatch(subtractProductQty(item));
  };
  useEffect(() => {
    console.log(price);
  });
  return (
    <Container ref={wrapperRef} className={styles.root}>
      <button
        type="button"
        onClick={() => toggleTrueFalse()}
        className={styles.cartButton}
      >
        <FontAwesomeIcon
          icon={faShoppingCart}
          className={active ? styles.cartIconActive : styles.cartIcon}
        />
      </button>
      <div className={styles.cartProductIndicator}>
        <div>
          <p>{cartTotalQty}</p>
        </div>
      </div>
      <Container className={active ? styles.cartActive : styles.cart}>
        {/* eslint-disable */}
        {cartItems.length
          ?
          <Container>
            {cartItems.map((item) => (
                <Row key={item.id} className={styles.cartProductRow}>
                  <Col className={styles.cartImage}><img src={item.image[0].src} alt={item.image[0].title}/></Col>
                  <Col><button type="button" onClick={() => handleSubtractQty(item)}>-</button>{item.qty}<button type="button" onClick={() => handleAddQty(item)}>+</button></Col>
                  <Col>{item.singlePrice}</Col>
                  <div id="cartName" className={styles.cartName}>{item.name}</div>
                  <Col><p>{item.price} Zł
                  {activeLanguage !== `Polish`
            /*eslint-disable*/
            ? ` / ${(
              Math.round(((item.price) / exchangeRate) * 100) / 100
              ).toFixed(2)} E`
            : null}</p>
                  </Col>
                  <Col><button type="button" className={styles.removeButton} onClick={() => dispatch(removeProductFromCart(item))}>x</button></Col>
                </Row>
              ))}
              <Row className={styles.cartSummary}>{`${cartTotalPrice} Zł`}
                  {activeLanguage !== `Polish`
            /*eslint-disable*/
            ? ` / ${(
              Math.round(((cartTotalPrice) / exchangeRate) * 100) / 100
              ).toFixed(2)} E`
            : null}</Row>
            </Container>
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
