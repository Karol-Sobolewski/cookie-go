import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import uuid from 'react-uuid';

import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartArrowDown,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { addProductToCart } from '../../../redux/cartRedux';
import styles from './ProductForm.module.scss';

const Component = ({
  className,
  children,
  id,
  title,
  description,
  price,
  singlePrice,
  images,
  nutrition,
}) => {
  const [rotate, setRotate] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
  const exchangeRate = useSelector((state) => state.utils.data.rate);

  const [cart, setCart] = useState({
    id,
    name: ``,
    image: ``,
    qty: 1,
    price,
    singlePrice,
  });

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (cart.name) {
      dispatch(addProductToCart(cart));
      setCart({ id, qty: 1, name: `` });
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
      // console.log(cart.qty);
    }
  };

  const addToCart = () => {
    setCart({ ...cart, price: price * cart.qty, name: title, image: images });
    setRotate(false);
    setShowNutrition(false);
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
              <p className={styles.clickOnMe}>
                {activeLanguage === `Polish` ? `Kliknij` : `Click`}
              </p>
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
                    <Col>{nutrition.weight} g</Col>
                  </Row>
                  <Row className={styles.productNutritionRow}>
                    <Col>
                      {activeLanguage === `Polish` ? `Kalorie` : `Calories`}
                    </Col>
                    <Col>{nutrition.calories} kcal</Col>
                  </Row>
                  <Row className={styles.productNutritionRow}>
                    <Col>
                      {activeLanguage === `Polish` ? `Tłuszcze` : `Fats`}
                    </Col>
                    <Col>{nutrition.fats} g</Col>
                  </Row>
                  <Row className={styles.productNutritionRow}>
                    <Col>
                      {activeLanguage === `Polish`
                        ? `Kwasy nasycone`
                        : `Saturated Fat`}
                    </Col>
                    <Col>{nutrition.satFats} g</Col>
                  </Row>
                  <Row className={styles.productNutritionRow}>
                    <Col>
                      {activeLanguage === `Polish`
                        ? `Węglowodany`
                        : `Carbohydrates`}
                    </Col>
                    <Col>{nutrition.carbs} g</Col>
                  </Row>
                  <Row className={styles.productNutritionRow}>
                    <Col>{activeLanguage === `Polish` ? `Cukry` : `Sugar`}</Col>
                    <Col>{nutrition.sugar} g</Col>
                  </Row>
                  <Row className={styles.productNutritionRow}>
                    <Col>
                      {activeLanguage === `Polish` ? `Błonnik` : `Fiber`}
                    </Col>
                    <Col>{nutrition.fiber} g</Col>
                  </Row>
                  <Row className={styles.productNutritionRow}>
                    <Col>
                      {activeLanguage === `Polish` ? `Białko` : `Protein`}
                    </Col>
                    <Col>{nutrition.protein} g</Col>
                  </Row>
                  <Row className={styles.productNutritionRow}>
                    <Col>{activeLanguage === `Polish` ? `Sól` : `Salt`}</Col>
                    <Col>{nutrition.salt} g</Col>
                  </Row>
                </Col>
                <Col>
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
          {price * cart.qty} Zł
          {activeLanguage !== `Polish`
            /*eslint-disable*/
            ? ` / ${(
              Math.round(((price * cart.qty) / exchangeRate) * 100) / 100
              ).toFixed(2)} E`
            : null}
            {/**eslint-enable */}

        </h4>
        <form className={styles.addtoCartForm} id="addToCartForm">
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
              value={cart.qty}
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
            type="button"
            className={styles.addToCartButton}
            onClick={addToCart}
          >
            <FontAwesomeIcon icon={faCartArrowDown} />
          </button>
        </form>
        <main>{children}</main>
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  images: PropTypes.array,
  nutrition: PropTypes.object,
  singlePrice: PropTypes.number,
};

export {
  Component as ProductForm,
  // Container as ProductForm,
  Component as ProductFormComponent,
};
