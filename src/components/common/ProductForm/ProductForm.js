import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import styles from './ProductForm.module.scss';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({
  className,
  children,
  title,
  description,
  price,
  images,
}) => {
  const [qty, setQty] = useState(1);
  // console.log(`Cookies`);
  const decrease = () => {
    if (qty > 1) {
      setQty(qty - 1);
    } else {
      setQty(1);
    }
  };
  const increase = () => {
    setQty(qty + 1);
  };

  const addToCart = (e) => {
    console.log(`add`);
    e.preventDefault();
  };
  useEffect(() => {
    console.log(`photos`, images);
  }, []);

  return (
    <div className={`hey ${clsx(className, styles.root)}`}>
      <div className={styles.content}>
        <h3>{title}</h3>
        <Row>
          <button type="button" onClick={() => decrease()}>
            -
          </button>
          <input
            className={styles.quantity}
            type="text"
            min="1"
            max="5"
            value={qty}
          />
          <button type="button" onClick={() => increase()}>
            +
          </button>
        </Row>
        {/* <textarea rows="6" cols="50" /> */}
        <img src={images[0].src} alt={images[0].src} />
        <button
          type="submit"
          className={styles.addToCartButon}
          onClick={(e) => addToCart(e)}
        >
          <FontAwesomeIcon
            icon={faCartArrowDown}
            // size="1x"
            // TODO size
            // className={active ? styles.cartIconActive : styles.cartIcon}
          />
        </button>
        <main>{children}</main>
      </div>
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
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  images: PropTypes.array,
};

export {
  Component as ProductForm,
  // Container as ProductForm,
  Component as ProductFormComponent,
};
