import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import uuid from 'react-uuid';

import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './ProductForm.module.scss';
import { Button } from '../Button/Button';
import { NutritionTable } from '../NutritionTable/NutritionTable';
import { CartForm } from '../CartForm/CartForm';

const Component = ({ className, children, product }) => {
  const [rotate, setRotate] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
  const exchangeRate = useSelector((state) => state.utils.data.rate);

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
        <h3 className={styles.productTitle}>{product.title}</h3>
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
              <img src={product.images[0].src} alt={product.images[0].title} />
              <p className={styles.clickOnMe}>
                {activeLanguage === `Polish` ? `Kliknij` : `Click`}
              </p>
            </button>
            <div className={styles.productDescriptionBox}>
              <Row className="w-100">
                <Button
                  type="button"
                  className={
                    showNutrition
                      ? styles.nutritionArrow__active
                      : styles.nutritionArrow
                  }
                  onClick={() => setShowNutrition(!showNutrition)}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
                <NutritionTable
                  nutrition={product.nutrition}
                  show={showNutrition}
                />
                <Col>
                  <p>
                    {activeLanguage === `Polish`
                      ? product.polish.description
                      : product.english.description}
                  </p>
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
              <Button
                type="button"
                className={
                  showNutrition ? styles.backArrow__hidden : styles.backArrow
                }
                onClick={() => setRotate(!rotate)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
            </div>
          </div>
        </div>
        <h4 className={styles.productPrice}>
          {/* eslint-disable */}
          {product.price} Zł
          {activeLanguage !== `Polish`
            ? ` / ${(
              Math.round((product.price / exchangeRate) * 100) / 100
            ).toFixed(2)} E`
            : null}
          {/* eslint-enable */}
        </h4>
        <CartForm
          product={product}
          singlePrice={product.price}
          showQty={!showNutrition}
        />
        <main>{children}</main>
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  product: PropTypes.object,
};

export {
  Component as ProductForm,
  // Container as ProductForm,
  Component as ProductFormComponent,
};
