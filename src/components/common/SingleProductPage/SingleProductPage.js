import { Container, Row, Col } from 'react-bootstrap';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { CartForm } from '../CartForm/CartForm';
import { NotFound } from '../../views/NotFound/NotFound';
import { NutritionTable } from '../NutritionTable/NutritionTable';

import styles from './SingleProductPage.module.scss';

const Component = ({ className, children }) => {
  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
  const exchangeRate = useSelector((state) => state.utils.data.rate);
  const [showNutrition, setShowNutrition] = useState(false);

  const params = useParams();
  const products = useSelector((state) => state.products.data);
  const productById = products.filter(
    (product) => product._id === params.id
  )[0];
  return (
    <div className={clsx(className, styles.root)}>
      {productById ? (
        <Container>
          <Row className={styles.productRow}>
            <Col className={`${styles.productBox} col-12 col-md-6`}>
              <div
                className={showNutrition ? styles.image : styles.image__active}
              >
                <button
                  type="button"
                  onClick={() => setShowNutrition(!showNutrition)}
                >
                  <img
                    src={productById.images[0].src}
                    alt={productById.images[0].title}
                  />
                </button>
                <p className={styles.clickOnMe}>
                  {activeLanguage === `Polish` ? `Kliknij` : `Click`}
                </p>
              </div>
              <NutritionTable
                nutrition={productById.nutrition}
                show={showNutrition}
              />
              <Button
                type="button"
                className={`${
                  showNutrition ? styles.backArrow : styles.backArrow__hidden
                } ${styles.backArrow}
                `}
                onClick={() => setShowNutrition(!showNutrition)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
            </Col>
            <Col className={`${styles.productBox} col-12 col-md-6`}>
              <div className={styles.description}>
                <Row>
                  <h2>
                    {activeLanguage === `Polish`
                      ? productById.polish.title
                      : productById.english.title}
                  </h2>
                </Row>
                <Row>
                  <p>
                    {activeLanguage === `Polish`
                      ? productById.polish.description
                      : productById.english.description}
                  </p>
                </Row>
                <Row>
                  <p>
                    {/* eslint-disable */}
                  {productById.price} Zł
                  {activeLanguage !== `Polish`
                    ? ` / ${(
                      Math.round((productById.price / exchangeRate) * 100) / 100
                    ).toFixed(2)} E`
                    : null}
                  {/* eslint-enable */}
                  </p>
                </Row>
                <Row>
                  <CartForm
                    product={productById}
                    singlePrice={productById.price}
                    showQty
                  />
                </Row>
              </div>
            </Col>
          </Row>
          <main>{children}</main>
        </Container>
      ) : (
        <NotFound />
      )}
    </div>
  );
};
Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as SingleProductPage,
  // Container as SingleProductPage,
  Component as SingleProductPageComponent,
};
