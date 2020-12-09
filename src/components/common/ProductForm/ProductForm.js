import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './ProductForm.module.scss';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children, language }) => {
  const [qty, setQty] = useState(1);
  console.log(`Cookies`);
  const decrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    } else {
      setQty(1);
    }
  };
  const increment = () => {
    setQty(qty + 1);
  };

  const addToCart = (e) => {
    console.log(`add`);
    e.preventDefault();
  };
  return (
    <div className={clsx(className, styles.root)}>
      <Container>
        <Row>
          <Col className="">
            <div className={styles.cookie}>
              <p>Cookie 1</p>
              <Row>
                <button type="button" onClick={() => decrement()}>
                  -
                </button>
                <input
                  className={styles.quantity}
                  type="text"
                  min="1"
                  max="5"
                  value={qty}
                />
                <button type="button" onClick={() => increment()}>
                  +
                </button>
              </Row>
              <textarea rows="6" cols="50" />
              <button type="submit" onClick={(e) => addToCart(e)}>
                Add to cart
              </button>
            </div>
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
};

export {
  Component as ProductForm,
  // Container as ProductForm,
  Component as ProductFormComponent,
};
