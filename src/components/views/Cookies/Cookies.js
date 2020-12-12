import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Cookies.module.scss';
import { ProductForm } from '../../common/ProductForm/ProductForm';
// import { connect } from 'react-redux';
import { fetchProducts } from '../../../redux/productRedux';
import { addProduct } from '../../../redux/cartRedux';

const Component = ({ className, children }) => {
  const dispatch = useDispatch();
  const activeLanguage = useSelector(
    (state) => state.menus.data.activeLanguage
  );
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const [qty, setQty] = useState(1);

  const state = {
    title: `asd`,
    quantity: qty,
    price: qty * 5,
  };
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
    dispatch(addProduct(state));
    e.preventDefault();
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    const parseValue = parseInt(e.target.value);
    if (!isNaN(parseValue)) { //eslint-disable-line
      setQty(parseInt(e.target.value));
    }
  };

  return (
    <div className={clsx(className, styles.root)}>
      {activeLanguage === `PL` ? <h2>Ciastka</h2> : <h2>Cookies</h2>}
      <Container>
        <Row>
          <Col className="">
            <div className={styles.cookie}>
              <p>Cookie 1</p>
              <Row>
                <button type="button" onClick={decrement}>
                  -
                </button>
                <input
                  className={styles.quantity}
                  type="text"
                  value={qty}
                  onChange={handleChange}
                />
                <button type="button" onClick={increment}>
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
        <ProductForm />
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
  Component as Cookies,
  // Container as Cookies,
  Component as CookiesComponent,
};
