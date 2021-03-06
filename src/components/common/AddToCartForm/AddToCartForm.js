import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import styles from './AddToCartForm.module.scss';
import { addProductToCart } from '../../../redux/cartRedux';
import { Button } from '../Button/Button';

const Component = ({ className, product, showQty, singlePrice }) => {
  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );

  const [cart, setCart] = useState({
    id: product._id,
    name: ``,
    image: ``,
    qty: 1,
    price: product.price,
    singlePrice,
  });

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (cart.name) {
      dispatch(addProductToCart(cart));
      setCart({ id: product._id, qty: 1, name: ``, singlePrice });
    }
  };

  useEffect(() => {
    handleSubmit();
  });

  const decrease = () => {
    if (cart.qty > 1) {
      setCart({ ...cart, qty: cart.qty - 1 });
    } else {
      setCart({ ...cart, qty: 1 });
    }
  };
  const increase = () => {
    setCart({ ...cart, qty: cart.qty + 1 });
  };

  const handleChange = (e) => {
    const parsedValue = parseInt(e.target.value);
    if (!isNaN(parsedValue)) { //eslint-disable-line
      setCart({ ...cart, qty: parseInt(e.target.value) });
    }
  };

  const addToCart = () => {
    setCart({
      ...cart,
      price: product.price * cart.qty,
      name:
        activeLanguage === `Polish`
          ? product.polish.title
          : product.english.title,
      image: product.images,
    });
  };
  return (
    <form className={clsx(className, styles.root)} id="addToCartForm">
      <Row
        className={`${
          showQty ? styles.qtyBox : styles.qtyBox__hidden
        } d-flex justify-content-around align-items-center`}
      >
        <Button
          type="button"
          className={styles.qtyButton}
          onClick={() => decrease()}
        >
          <p>-</p>
        </Button>
        <input
          className={styles.qtyInput}
          type="text"
          value={cart.qty}
          onChange={handleChange}
        />
        <Button
          className={styles.qtyButton}
          type="button"
          onClick={() => increase()}
        >
          <p>+</p>
        </Button>
      </Row>
      <Button
        type="button"
        className={styles.addToCartButton}
        onClick={() => addToCart()}
      >
        <FontAwesomeIcon icon={faCartArrowDown} />
      </Button>
    </form>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object,
  showQty: PropTypes.bool,
  singlePrice: PropTypes.number,
};

export { Component as AddToCartForm, Component as AddToCartFormComponent };
