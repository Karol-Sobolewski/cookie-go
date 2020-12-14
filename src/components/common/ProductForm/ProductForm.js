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
    <div className={clsx(className, styles.root)}>
      <div className={styles.content}>
        <h3>{title}</h3>
        {/* <textarea rows="6" cols="50" /> */}
        {/* <div className={styles.productImageBox}>
          <div>
            <div className={styles.productImage} />
            <div className={styles.productDescription} />
            <img className={styles.productImage} src={images[0].src} alt={images[0].src} />
            <img className={styles.productDescription} src={images[0].src} alt={images[0].src} />
          </div>
        </div> */}
        <div className={styles.flipBox}>
          <div className={styles.flipBoxInner}>
            <div className={styles.flipBoxFront}>
              <img
                src={images[0].src}
                alt={images[0].src}
                // style="width:300px;height:200px"
              />
            </div>
            <div className={styles.flipBoxBack}>
              <p>{description}</p>
            </div>
          </div>
        </div>
        <Row
          className={`${styles.qtyBox} d-flex justify-content-around align-items-center`}
        >
          <button
            type="button"
            className={styles.qtyButton}
            onClick={() => decrease()}
          >
            -
          </button>
          <input
            className={styles.qtyInput}
            type="text"
            min="1"
            max="5"
            value={qty}
          />
          <button
            className={styles.qtyButton}
            type="button"
            onClick={() => increase()}
          >
            +
          </button>
        </Row>
        <button
          type="submit"
          className={styles.addToCartButton}
          onClick={(e) => addToCart(e)}
        >
          <FontAwesomeIcon icon={faCartArrowDown} />
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
