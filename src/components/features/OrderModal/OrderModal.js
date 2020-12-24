import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './OrderModal.module.scss';
import { Button } from '../../common/Button/Button';
// import { connect } from 'react-redux';
import { addOrderRequest } from '../../../redux/orderRedux';

const Component = ({ className, children }) => {
  const dispatch = useDispatch();

  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
  const exchangeRate = useSelector((state) => state.utils.data.rate);

  const orderedProducts = useSelector((state) => state.cart.products);

  const [order, setOrder] = useState({
    products: orderedProducts,
    date: new Date(),
  });

  const handleChange = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;
    console.log(name, value);
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(order);
    dispatch(addOrderRequest(order));
  };

  useEffect(() => {
    console.log(orderedProducts);
    // dispatch(actionName(`whatToDispatch`));
  }, []);
  return (
    <div className={clsx(className, styles.root)}>
      <Container className={styles.modalInner}>
        <Row className={`${styles.orderedProducts} ${styles.orderBox}`}>
          {orderedProducts.map((item) => (
            <Row key={item.id} className={styles.orderedProductRow}>
              {/* <Col className={`${styles.cartImage} col-3`}> */}
              <Col
                className={`col-3 d-flex justify-content-center align-items-center${styles.formColumn}`}
              >
                <img src={item.image[0].src} alt={item.image[0].title} />
              </Col>
              <Col
                className={`col-3 d-flex justify-content-center align-items-center${styles.formColumn}`}
              >
                <p>{item.name}</p>
              </Col>
              <Col
                className={`col-3 d-flex justify-content-center align-items-center${styles.formColumn}`}
              >
                <p>{item.qty}</p>
              </Col>
              <Col
                className={`col-3 d-flex justify-content-center align-items-center${styles.formColumn}`}
              >
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
            </Row>
          ))}
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
                <p>Full Name:</p>
              </Col>
              <Col className={`col-12 col-md-6 ${styles.formColumn}`}>
                <Row className="d-flex justify-content-between align-items-center w-100">
                  <Col className={`col-12 col-md-5 ${styles.formColumn}`}>
                    <input
                      name="firstName"
                      placeholder="First Name*"
                      required
                    />
                  </Col>
                  <Col className={`col-12 col-md-5 ${styles.formColumn}`}>
                    <input name="lastName" placeholder="Last Name*" required />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className={styles.formRow}>
              <Col className={`col-12 col-md-6 ${styles.formColumn}`}>
                <p>Phone Number:</p>
              </Col>
              <Col className={`col-12 col-md-6 ${styles.formColumn}`}>
                <input name="phone" type="tel" placeholder="Phone Number" />
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
                <p>Shipping Address:</p>
              </Col>
              <Col className="col-12 col-md-6">
                <Row className="d-flex justify-content-center align-items-center">
                  <input
                    name="street"
                    type="text"
                    placeholder="Street Address*"
                    required
                  />
                </Row>
                <Row
                  className={`d-flex justify-content-center align-items-center w-100${styles.formColumn}`}
                >
                  <input name="street2" placeholder="Street Address 2" />
                </Row>
                <Row className="d-flex justify-content-between align-items-center">
                  <Col className={`col-12 col-md-5 ${styles.formColumn}`}>
                    <input
                      name="city"
                      type="text"
                      placeholder="City*"
                      required
                    />
                  </Col>
                  <Col className={`col-12 col-md-5 ${styles.formColumn}`}>
                    <input
                      name="state"
                      type="text"
                      placeholder="State / Province"
                    />
                  </Col>
                </Row>
                <Row className="d-flex justify-content-between align-items-center">
                  <Col className={`col-12 col-md-5 ${styles.formColumn}`}>
                    <input
                      name="zip"
                      type="text"
                      pattern="[0-9 / -]*"
                      placeholder="Postal / Zip Code*"
                      required
                    />
                  </Col>
                  <Col className={`col-12 col-md-5 ${styles.formColumn}`}>
                    <input
                      name="country"
                      type="text"
                      placeholder="Country*"
                      required
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <input
                // className={`${styles.buttonAdd} col-6`}
                type="submit"
                value="Send"
                component={Button}
              />
            </Row>
          </form>
        </Row>
        <main>{children}</main>
      </Container>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as OrderModal,
  // Container as OrderModal,
  Component as OrderModalComponent,
};
