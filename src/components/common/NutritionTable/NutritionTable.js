import React from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Row, Col } from 'react-bootstrap';
import styles from './NutritionTable.module.scss';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, nutrition, show }) => {
  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
  return (
    <Row className={clsx(className, styles.root)}>
      <Col
        className={
          show ? styles.productNutrition__show : styles.productNutrition
        }
      >
        <Row className={styles.productNutritionRow}>
          <Col>{activeLanguage === `Polish` ? `Waga` : `Weight`}</Col>
          <Col>{nutrition.weight} g</Col>
        </Row>
        <Row className={styles.productNutritionRow}>
          <Col>{activeLanguage === `Polish` ? `Kalorie` : `Calories`}</Col>
          <Col>{nutrition.calories} kcal</Col>
        </Row>
        <Row className={styles.productNutritionRow}>
          <Col>{activeLanguage === `Polish` ? `Tłuszcze` : `Fats`}</Col>
          <Col>{nutrition.fats} g</Col>
        </Row>
        <Row className={styles.productNutritionRow}>
          <Col>
            {activeLanguage === `Polish` ? `Kwasy nasycone` : `Saturated Fat`}
          </Col>
          <Col>{nutrition.satFats} g</Col>
        </Row>
        <Row className={styles.productNutritionRow}>
          <Col>
            {activeLanguage === `Polish` ? `Węglowodany` : `Carbohydrates`}
          </Col>
          <Col>{nutrition.carbs} g</Col>
        </Row>
        <Row className={styles.productNutritionRow}>
          <Col>{activeLanguage === `Polish` ? `Cukry` : `Sugar`}</Col>
          <Col>{nutrition.sugar} g</Col>
        </Row>
        <Row className={styles.productNutritionRow}>
          <Col>{activeLanguage === `Polish` ? `Błonnik` : `Fiber`}</Col>
          <Col>{nutrition.fiber} g</Col>
        </Row>
        <Row className={styles.productNutritionRow}>
          <Col>{activeLanguage === `Polish` ? `Białko` : `Protein`}</Col>
          <Col>{nutrition.protein} g</Col>
        </Row>
        <Row className={styles.productNutritionRow}>
          <Col>{activeLanguage === `Polish` ? `Sól` : `Salt`}</Col>
          <Col>{nutrition.salt} g</Col>
        </Row>
      </Col>
    </Row>
  );
};

Component.propTypes = {
  nutrition: PropTypes.object,
  className: PropTypes.string,
  show: PropTypes.bool,
};

export {
  Component as NutritionTable,
  // Container as NutritionTable,
  Component as NutritionTableComponent,
};
