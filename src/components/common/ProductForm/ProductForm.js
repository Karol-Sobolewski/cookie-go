import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartArrowDown,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import styles from './ProductForm.module.scss';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

// TODO click outside -> setRotate(false) setShowNutrition(false)

const Component = ({
  className,
  children,
  title,
  description,
  price,
  images,
  nutrition,
}) => {
  const [qty, setQty] = useState(1);
  // console.log(`Cookies`);
  const [rotate, setRotate] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

  const activeLanguage = useSelector(
    (state) => state.menus.data.activeLanguage
  );

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
    setQty(1);
    e.preventDefault();
    setRotate(false);
    setShowNutrition(false);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    const parseValue = parseInt(e.target.value);
    if (!isNaN(parseValue)) { //eslint-disable-line
      setQty(parseInt(e.target.value));
    }
  };

  const useClickOutsideOfProductBox = (ref) => {
    useEffect(() => {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setRotate(false);
          setShowNutrition(false);
        }
      }

      document.addEventListener(`mousedown`, handleClickOutside);
      return () => {
        document.removeEventListener(`mousedown`, handleClickOutside);
      };
    }, [ref]);
  };
  const wrapperRef = useRef(null);
  useClickOutsideOfProductBox(wrapperRef);

  return (
    <div className={clsx(className, styles.root)} ref={wrapperRef}>
      <div className={styles.content}>
        <h3 className={styles.productTitle}>{title}</h3>
        <div className={styles.productBox}>
          <div
            className={
              rotate ? styles.productBoxInner__rotate : styles.productBoxInner
            }
          >
            <button
              type="button"
              className={styles.productImage}
              onClick={() => setRotate(!rotate)}
            >
              <img src={images[0].src} alt={images[0].title} />
            </button>
            <div className={styles.productDescriptionBox}>
              <Row>
                <Col
                  className={
                    showNutrition
                      ? styles.productNutrition__show
                      : styles.productNutrition
                  }
                >
                  <button
                    type="button"
                    className={styles.backArrow}
                    onClick={() => setShowNutrition(!showNutrition)}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  <Row className={styles.productNutritionRow}>
                    <Col>{activeLanguage === `Polish` ? `Waga` : `Weight`}</Col>
                    <Col>60 g</Col>
                  </Row>
                  <Row className={styles.productNutritionRow}>
                    <Col>
                      {activeLanguage === `Polish` ? `Kalorie` : `Calories`}
                    </Col>
                    <Col>{nutrition.calories}</Col>
                  </Row>
                  <Row className={styles.productNutritionRow}>
                    <Col>
                      {activeLanguage === `Polish` ? `Tłuszcze` : `Fats`}
                    </Col>
                    <Col>{nutrition.fats}</Col>
                  </Row>
                  <Row className={styles.productNutritionRow}>
                    <Col>
                      {activeLanguage === `Polish`
                        ? `Kwasy nasycone`
                        : `Saturated Fat`}
                    </Col>
                    <Col>{nutrition.satFats}</Col>
                  </Row>
                  <Row className={styles.productNutritionRow}>
                    <Col>
                      {activeLanguage === `Polish`
                        ? `Węglowodany`
                        : `Carbohydrates`}
                    </Col>
                    <Col>{nutrition.carbs}</Col>
                  </Row>
                  <Row className={styles.productNutritionRow}>
                    <Col>{activeLanguage === `Polish` ? `Cukry` : `Sugar`}</Col>
                    <Col>{nutrition.sugar}</Col>
                  </Row>
                  <Row className={styles.productNutritionRow}>
                    <Col>
                      {activeLanguage === `Polish` ? `Błonnik` : `Fiber`}
                    </Col>
                    <Col>{nutrition.fiber}</Col>
                  </Row>
                  <Row className={styles.productNutritionRow}>
                    <Col>
                      {activeLanguage === `Polish` ? `Białko` : `Protein`}
                    </Col>
                    <Col>{nutrition.protein}</Col>
                  </Row>
                  <Row className={styles.productNutritionRow}>
                    <Col>{activeLanguage === `Polish` ? `Sól` : `Salt`}</Col>
                    <Col>{nutrition.salt}</Col>
                  </Row>
                </Col>
                <Col className={styles.productDescription}>
                  <p>{description}</p>
                  <button
                    type="button"
                    onClick={() => setShowNutrition(!showNutrition)}
                    className={styles.showNutritionButton}
                  >
                    {activeLanguage === `Polish`
                      ? `Wartości odżywcze`
                      : `Nutrition Facts`}
                  </button>
                </Col>
              </Row>
              <button
                type="button"
                className={styles.backArrow}
                onClick={() => setRotate(!rotate)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
            </div>
          </div>
        </div>
        <h4 className={styles.productPrice}>
          {price} {activeLanguage === `Polish` ? `Zł` : `Euro`}
        </h4>
        <Row
          className={`${
            showNutrition ? styles.qtyBox__hidden : styles.qtyBox
          } d-flex justify-content-around align-items-center`}
        >
          <button
            type="button"
            className={styles.qtyButton}
            onClick={() => decrease()}
          >
            <p>-</p>
          </button>
          <input
            className={styles.qtyInput}
            type="text"
            value={qty}
            onChange={handleChange}
          />
          <button
            className={styles.qtyButton}
            type="button"
            onClick={() => increase()}
          >
            <p>+</p>
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
  price: PropTypes.string,
  images: PropTypes.array,
  nutrition: PropTypes.object,
};

export {
  Component as ProductForm,
  // Container as ProductForm,
  Component as ProductFormComponent,
};
