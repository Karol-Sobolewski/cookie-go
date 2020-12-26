import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './OrderModal.module.scss';
import { Button } from '../../common/Button/Button';
// import { connect } from 'react-redux';
import { addOrderRequest } from '../../../redux/orderRedux';
import { cleanCart } from '../../../redux/cartRedux';

const Component = ({ className }) => {
  const dispatch = useDispatch();

  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
  const exchangeRate = useSelector((state) => state.utils.data.rate);

  const orderedProducts = useSelector((state) => state.cart.products);

  const [order, setOrder] = useState({
    products: orderedProducts,
    added: new Date(),
  });

  const cartTotalPrice = orderedProducts.reduce(
    (a, b) => a + (b.price || 0),
    0
  );

  const cleanUp = (e) => {
    console.log(e);
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
      e.preventDefault();
    } else if (
      order.firstName.length < 2 ||
      order.lastName.length < 2 ||
      order.email.length < 3 ||
      order.street.length < 2 ||
      order.house.length < 1 ||
      order.city.length < 2 ||
      order.zip.length < 2 ||
      order.country.length < 2
    ) {
      alert(
        activeLanguage === `Polish`
          ? `Wypełnij wszystkie pola`
          : `Fill all inputs correctly`
      );
      e.preventDefault();
    } else if (!order.email.match(mailFormat)) {
      alert(
        activeLanguage === `Polish`
          ? `Podaj poprawny email`
          : `Please fill email correctly`
      );
      e.preventDefault();
    } else {
      alert(
        activeLanguage === `Polish`
          ? `Zamówienie zostało złożone`
          : `Your order was placed`
      );
      e.preventDefault();
      dispatch(addOrderRequest(order));
      cleanUp(e);
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
            // method="post"
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
                      placeholder={
                        activeLanguage === `Polish` ? `Imię*` : `Name*`
                      }
                      required
                    />
                  </Col>
                  <Col className={`col-12 col-md-5 ${styles.formColumn}`}>
                    <input
                      name="lastName"
                      placeholder={
                        activeLanguage === `Polish` ? `Nazwisko*` : `Last Name*`
                      }
                      required
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
                  />
                </Row>
                <Row className="d-flex justify-content-between align-items-center">
                  <Col className={`col-12 col-md-5 ${styles.formColumn}`}>
                    <input
                      name="house"
                      placeholder={
                        activeLanguage === `Polish` ? `Nr domu*` : `House nr.*`
                      }
                      required
                    />
                  </Col>
                  <Col className={`col-12 col-md-5 ${styles.formColumn}`}>
                    <input
                      name="appartment"
                      placeholder={
                        activeLanguage === `Polish`
                          ? `Nr lokalu`
                          : `Appartment number`
                      }
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
                    />
                  </Col>
                </Row>
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

export {
  Component as OrderModal,
  // Container as OrderModal,
  Component as OrderModalComponent,
};