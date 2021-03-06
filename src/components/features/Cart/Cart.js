import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useModal } from 'react-modal-hook';
import ReactModal from 'react-modal';

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
import { OrderModal } from '../OrderModal/OrderModal';

const Component = ({ children }) => {
  const dispatch = useDispatch();

  const [active, setActive] = useState(false);
  const [shakeCart, setShakeCart] = useState(false);

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

  const customStyles = {
    overlay: { zIndex: 1000, backgroundColor: `rgba(0, 0, 0, 0.2)` },
    content: {
      borderRadius: `20px`,
      display: `flex`,
      justifyContent: `center`,
      alignItems: `center`,
    },
  };
  const [showModal, hideModal] = useModal(() => {
    const hide = () => {
      hideModal();
      const scrollY = document.body.style.top;
      document.body.style.position = ``;
      document.body.style.top = ``;
      window.scrollTo(0, parseInt(scrollY || `0`) * -1);
    };
    return (
      <ReactModal isOpen style={customStyles}>
        <Button
          type="button"
          onClick={() => hide()}
          className={styles.hideModalButton}
        >
          <p>x</p>
        </Button>
        <OrderModal />
      </ReactModal>
    );
  });

  const handleAddQty = (item) => {
    dispatch(
      addProductQty({
        ...item,
        qty: item.qty + 1,
        price: item.singlePrice * item.qty,
      })
    );
  };
  const handleSubtractQty = (item) => {
    dispatch(subtractProductQty({ ...item, qty: item.qty - 1 }));
  };

  const handleProductRemove = (item) => {
    dispatch(removeProductFromCart(item));
  };

  const handleSubmitOrder = () => {
    showModal(true);
    setActive(false);
    document.body.style.position = `fixed`;
    document.body.style.top = `-${window.scrollY}px`;
  };

  useEffect(() => {
    if (cartTotalQty === 1 && active === false) {
      setShakeCart(true);
    } else {
      setShakeCart(false);
    }
  });

  return (
    <Container ref={wrapperRef} className={styles.root}>
      <button
        type="button"
        onClick={() => toggleTrueFalse()}
        className={shakeCart ? styles.cartButton__shake : styles.cartButton}
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
          <Container className={styles.products}>
            {cartItems.map((item) => (
              <Row key={item.id} className={styles.cartProductRow}>
                <Col className={`${styles.cartProductImage} col-3`}>
                  <img src={item.image[0].src} alt={item.image[0].title} />
                </Col>
                <Col className="col-3">
                  <Button
                    type="button"
                    className={styles.qtyButton}
                    onClick={() => handleSubtractQty(item)}
                  >
                    <p>-</p>
                  </Button>
                  {item.qty}
                  <Button
                    type="button"
                    className={styles.qtyButton}
                    onClick={() => handleAddQty(item)}
                  >
                    <p>+</p>
                  </Button>
                </Col>
                <div id="cartName" className={styles.cartProductTitle}>
                  {item.name}
                </div>
                <Col className="col-3">
                  <p>
                    {/* eslint-disable */}
                    {item.price}Zł
                    {activeLanguage !== `Polish`
                      ? ` / ${(
                          Math.round((item.price / exchangeRate) * 100) / 100
                        ).toFixed(2)}E`
                      : null}
                      {/* eslint-enable */}
                  </p>
                </Col>
                <Col className="col-3">
                  <Button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleProductRemove(item)}
                  >
                    <p>x</p>
                  </Button>
                </Col>
              </Row>
            ))}
          </Container>
        ) : (
          <h3>
            {activeLanguage === `Polish`
              ? `Koszyk jest pusty`
              : `Cart is empty`}
          </h3>
        )}
        <main>{children}</main>
        {cartItems.length ? (
          <div className={styles.orderSummary}>
            <Row className={styles.cartSummary}>
              {/* eslint-disable */}
              {activeLanguage === `Polish`
                ? `Do zapłaty: ${cartTotalPrice} Zł`
                : `Total price: ${cartTotalPrice} Zł / ${(
                  Math.round((cartTotalPrice / exchangeRate) * 100) / 100
                  ).toFixed(2)} E`}
              {/* eslint-enable */}
            </Row>
            <Button
              className={styles.orderButton}
              onClick={() => handleSubmitOrder()}
            >
              {activeLanguage === `Polish` ? `Zamów` : `Order`}
            </Button>
          </div>
        ) : null}
      </Container>
    </Container>
  );
};

Component.propTypes = {
  children: PropTypes.node,
};

export { Component as Cart, Component as CartComponent };
