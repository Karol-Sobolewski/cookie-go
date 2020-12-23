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

import { Button } from '../../common/Button/Button';

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
        {cartItems.length ? (
          <Container>
            {cartItems.map((item) => (
              <Row key={item.id} className={styles.cartProductRow}>
                <Col className={styles.cartImage}>
                  <img src={item.image[0].src} alt={item.image[0].title} />
                </Col>
                <Col>
                  <Button
                    type="button"
                    className={styles.qtyButton}
                    onClick={() => handleSubtractQty(item)}
                  >
                    -
                  </Button>
                  {item.qty}
                  <Button
                    type="button"
                    className={styles.qtyButton}
                    onClick={() => handleAddQty(item)}
                  >
                    +
                  </Button>
                </Col>
                <Col>{item.singlePrice}</Col>
                <div id="cartName" className={styles.cartName}>
                  {item.name}
                </div>
                <Col>
                  <p>
                    {/* eslint-disable */}
                    {item.price} Zł
                    {activeLanguage !== `Polish`
                      ? ` / ${(
                          Math.round((item.price / exchangeRate) * 100) / 100
                        ).toFixed(2)} E`
                      : null}
                      {/* eslint-enable */}
                  </p>
                </Col>
                <Col>
                  <Button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => dispatch(removeProductFromCart(item))}
                  >
                    x
                  </Button>
                </Col>
              </Row>
            ))}
            <Row className={styles.cartSummary}>
              {/* eslint-disable */}
              {`${cartTotalPrice} Zł`}
              {activeLanguage !== `Polish`
                ? ` / ${(
                    Math.round((cartTotalPrice / exchangeRate) * 100) / 100
                ).toFixed(2)} E`
                : null}
                {/* eslint-enable */}
            </Row>
          </Container>
        ) : (
          <h3>
            {activeLanguage === `Polish`
              ? `Koszyk jest pusty`
              : `Cart is empty`}
          </h3>
        )}
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
