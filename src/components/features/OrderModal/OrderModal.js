import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './OrderModal.module.scss';
import { Button } from '../../common/Button/Button';
import { addOrderRequest } from '../../../redux/orderRedux';
import { cleanCart } from '../../../redux/cartRedux';

const Component = ({ className }) => {
  const dispatch = useDispatch();

  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
  const exchangeRate = useSelector((state) => state.utils.data.rate);

  const orderedProducts = useSelector((state) => state.cart.products);

  const cartTotalPrice = orderedProducts.reduce(
    (a, b) => a + (b.price || 0),
    0
  );
  const [order, setOrder] = useState({
    products: orderedProducts,
    added: new Date(),
    totalPrice: cartTotalPrice,
  });

  const cleanUp = () => {
    setOrder(null);
    document.getElementById(`orderForm`).reset();
    dispatch(cleanCart());
  };

  const goToHomePage = () => {
    window.location.href = `/`;
  };

  const handleChange = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;
    setOrder({ ...order, [name]: value });
    console.log(order);
  };

  const handleSubmit = (e) => {
    const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      !order.firstName ||
      !order.lastName ||
      !order.email ||
      !order.street ||
      !order.house ||
      !order.city ||
      !order.zip ||
      !order.country
    ) {
      alert(
        activeLanguage === `Polish`
          ? `Wypełnij wszystkie pola`
          : `Fill all inputs correctly`
      );
      console.log(`!!!`);
      e.preventDefault();
    } else if (
      order.firstName.length < 2 ||
      order.lastName.length < 2 ||
      order.email.length < 5 ||
      order.street.length < 2 ||
      order.house.length < 2 ||
      order.city.length < 2 ||
      order.zip.length < 3 ||
      order.country.length < 2
    ) {
      alert(
        activeLanguage === `Polish`
          ? `Wypełnij wszystkie pola`
          : `Fill all inputs correctly`
      );
      console.log(`short`);
      e.preventDefault();
    } else if (
      order.firstName.length > 100 ||
      order.lastName.length > 100 ||
      order.email.length > 100 ||
      order.street.length > 100 ||
      order.house.length > 100 ||
      order.city.length > 100 ||
      order.zip.length > 15 ||
      order.country.length > 100
    ) {
      alert(
        activeLanguage === `Polish`
          ? `Wypełnij wszystkie pola`
          : `Fill all inputs correctly`
      );
      console.log(`long`);
      e.preventDefault();
    } else if (!order.email.match(mailFormat)) {
      alert(
        activeLanguage === `Polish`
          ? `Podaj poprawny email`
          : `Please fill email correctly`
      );
      console.log(`email`);
      e.preventDefault();
    } else if (order.comment) {
      if (order.comment.length < 2 || order.comment.length > 1000) {
        alert(
          activeLanguage === `Polish`
            ? `Podaj poprawny komentarz`
            : `Please fill order comment correctly`
        );
        e.preventDefault();
      }
      alert(
        activeLanguage === `Polish`
          ? `Zamówienie zostało złożone`
          : `Your order was placed`
      );
      e.preventDefault();
      dispatch(addOrderRequest(order));
      cleanUp();
    } else if (order.phone) {
      if (order.phone.length < 2 || order.phone.length > 20) {
        alert(
          activeLanguage === `Polish`
            ? `Podaj poprawny numer`
            : `Please fill your phone number correctly`
        );
        e.preventDefault();
      }
      alert(
        activeLanguage === `Polish`
          ? `Zamówienie zostało złożone`
          : `Your order was placed`
      );
      e.preventDefault();
      dispatch(addOrderRequest(order));
      cleanUp();
    } else {
      alert(
        activeLanguage === `Polish`
          ? `Zamówienie zostało złożone`
          : `Your order was placed`
      );
      e.preventDefault();
      console.log(`send`);
      dispatch(addOrderRequest(order));
      cleanUp();
    }
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Container className={styles.modalInner}>
        <Row className={`${styles.orderedProducts} ${styles.orderBox}`}>
          {/* eslint-disable */}
          {order
            ? orderedProducts.map((item) => (
                <Row key={item.id} className={styles.orderedProductRow}>
                  <Col
                    className={`col-4 col-md-3 ${styles.orderColumn}`}
                  >
                    <img src={item.image[0].src} alt={item.image[0].title} />
                  </Col>
                  <Col
                    className={`col-3 d-none d-md-block ${styles.orderColumn}`}
                  >
                    <p>{item.name}</p>
                  </Col>
                  <Col
                    className={`col-4 col-md-3 ${styles.orderColumn}`}
                  >
                    <p>x{item.qty}</p>
                  </Col>
                  <Col
                    className={`col-4 col-md-3 ${styles.orderColumn}`}
                  >
                    <p>
                      {item.price}Zł
                      {activeLanguage !== `Polish` ? (
                        ` / ${(
                          Math.round((item.price / exchangeRate) * 100) / 100
                        ).toFixed(2)}E`
                      ) : null}
                  </p>
                </Col>
              </Row>
            ))
            : (
                <button className={styles.homeButton} onClick={() => goToHomePage()}>
                  <p href="/">
                    {activeLanguage === `Polish`
                      ? `Wróć do strony głównej`
                    : `Go back to homepage`}
                  </p>
                </button>
            )}
            {/* eslint-enable */}
        </Row>
        <Row className={`${styles.orderFormBox} ${styles.orderBox}`}>
          <form
            id="orderForm"
            className={styles.orderForm}
            action="#"
            onSubmit={(e) => handleSubmit(e)}
            onChange={(e) => handleChange(e)}
          >
            <Row className={styles.formRow}>
              <Col className={`col-12 col-md-6 ${styles.formColumn}`}>
                <p>
                  {activeLanguage === `Polish`
                    ? `Imię i Nazwisko`
                    : `Full Name`}
                  :
                </p>
              </Col>
              <Col className={`col-12 col-md-6 ${styles.formColumn}`}>
                <Row className="d-flex justify-content-between align-items-center w-100">
                  <Col className={`col-12 col-md-5 ${styles.formColumn}`}>
                    <input
                      name="firstName"
                      type="text"
                      placeholder={
                        activeLanguage === `Polish` ? `Imię*` : `Name*`
                      }
                      required
                      minLength="2"
                      maxLength="100"
                    />
                  </Col>
                  <Col className={`col-12 col-md-5 ${styles.formColumn}`}>
                    <input
                      name="lastName"
                      type="text"
                      placeholder={
                        activeLanguage === `Polish` ? `Nazwisko*` : `Last Name*`
                      }
                      required
                      minLength="2"
                      maxLength="100"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className={styles.formRow}>
              <Col className={`col-12 col-md-6 ${styles.formColumn}`}>
                <p>
                  {activeLanguage === `Polish`
                    ? `Numer telefonu`
                    : `Phone number`}
                  :
                </p>
              </Col>
              <Col className={`col-12 col-md-6 ${styles.formColumn}`}>
                <input
                  name="phone"
                  type="tel"
                  placeholder={
                    activeLanguage === `Polish`
                      ? `Numer telefonu`
                      : `Phone number`
                  }
                  min="5"
                  max="15"
                />
              </Col>
            </Row>
            <Row className={styles.formRow}>
              <Col className={`col-12 col-md-6 ${styles.formColumn}`}>
                <p>E-mail:</p>
              </Col>
              <Col className={`col-12 col-md-6 ${styles.formColumn}`}>
                <input
                  name="email"
                  type="email"
                  placeholder="E-mail*"
                  required
                  min="5"
                  max="100"
                />
              </Col>
            </Row>
            <Row className={styles.formRow}>
              <Col
                className={`col-12 col-md-6 ${styles.formColumn} align-items-start pt-3`}
              >
                <p>
                  {activeLanguage === `Polish`
                    ? `Adres dostawy`
                    : `Shipping address`}
                  :
                </p>
              </Col>
              <Col className="col-12 col-md-6">
                <Row className="d-flex justify-content-center align-items-center">
                  <input
                    name="street"
                    type="text"
                    placeholder={
                      activeLanguage === `Polish` ? `Ulica*` : `Street address*`
                    }
                    required
                    minLength="2"
                    maxLength="100"
                  />
                </Row>
                <Row className="d-flex justify-content-between align-items-center">
                  <Col className={`col-12 col-md-5 ${styles.formColumn}`}>
                    <input
                      name="house"
                      type="text"
                      placeholder={
                        activeLanguage === `Polish` ? `Nr domu*` : `House nr.*`
                      }
                      required
                      minLength="2"
                      maxLength="100"
                    />
                  </Col>
                  <Col className={`col-12 col-md-5 ${styles.formColumn}`}>
                    <input
                      name="appartment"
                      type="text"
                      placeholder={
                        activeLanguage === `Polish`
                          ? `Nr lokalu`
                          : `Appartment number`
                      }
                      minLength="2"
                      maxLength="100"
                    />
                  </Col>
                </Row>
                <Row className="d-flex justify-content-between align-items-center">
                  <Col className={`col-12 col-md-5 ${styles.formColumn}`}>
                    <input
                      name="city"
                      type="text"
                      placeholder={
                        activeLanguage === `Polish` ? `Miasto*` : `City*`
                      }
                      required
                      minLength="2"
                      maxLength="100"
                    />
                  </Col>
                  <Col className={`col-12 col-md-5 ${styles.formColumn}`}>
                    <input
                      name="state"
                      type="text"
                      placeholder={
                        activeLanguage === `Polish`
                          ? `Województwo`
                          : `State / Province`
                      }
                      minLength="2"
                      maxLength="100"
                    />
                  </Col>
                </Row>
                <Row className="d-flex justify-content-between align-items-center">
                  <Col className={`col-12 col-md-5 ${styles.formColumn}`}>
                    <input
                      name="zip"
                      type="text"
                      pattern="[0-9 / -]*"
                      placeholder={
                        activeLanguage === `Polish`
                          ? `Kod pocztowy*`
                          : `Postal / Zip code*`
                      }
                      required
                      minLength="4"
                      maxLength="100"
                    />
                  </Col>
                  <Col className={`col-12 col-md-5 ${styles.formColumn}`}>
                    <input
                      name="country"
                      type="text"
                      placeholder={
                        activeLanguage === `Polish` ? `Państwo*` : `Country*`
                      }
                      required
                      minLength="2"
                      maxLength="100"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className={styles.formRow}>
              <Col className={`col-12 col-md-6 ${styles.formColumn}`}>
                <p>
                  {activeLanguage === `Polish`
                    ? `Komentarz do zamówienia`
                    : `Order comment`}
                  :
                </p>
              </Col>
              <Col className={`col-12 col-md-6 ${styles.formColumn}`}>
                <textarea
                  name="comment"
                  placeholder={
                    activeLanguage === `Polish`
                      ? `Komentarz do zamówienia max 1000 znaków`
                      : `Order comment max 1000 characters`
                  }
                  minLength="2"
                  maxLength="1000"
                />
              </Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center">
              <input
                className={styles.buttonSend}
                type="submit"
                value={activeLanguage === `Polish` ? `Wyślij` : `Send`}
                component={Button}
              />
            </Row>
          </form>
        </Row>
        <Row className={`${styles.orderedPriceSummary} ${styles.orderBox}`}>
          {/* eslint-disable */}
          {activeLanguage === `Polish`
          ? `Do zapłaty: ${cartTotalPrice} Zł`
          : `Total price: ${cartTotalPrice} Zł / ${(
              Math.round((cartTotalPrice / exchangeRate) * 100) / 100
          ).toFixed(2)} E`}
        {/* eslint-enable */}
        </Row>
      </Container>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export { Component as OrderModal, Component as OrderModalComponent };
