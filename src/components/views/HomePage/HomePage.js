import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Container, Row, Col } from 'react-bootstrap';
import ReactSnapScroll from 'react-snap-scroll';

import { useLocation } from 'react-router-dom';
import { changeActiveLanguage } from '../../../redux/utilsRedux';
import styles from './HomePage.module.scss';

import { NewProducts } from '../../features/NewProducts/NewProducts';
import { Slider } from '../../features/Slider/Slider';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, language, children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pages = useSelector((state) => state.pages.data);
  const whyUs = pages.filter((page) => page.title === `whyus`)[0];
  console.log(whyUs);
  useEffect(() => {
    // console.log(container.current);
    if (language) {
      if (language === `en`) {
        dispatch(changeActiveLanguage(`English`));
        console.log(location.componentProps);
      } else if (language === `pl`) {
        dispatch(changeActiveLanguage(`Polish`));
      }
    }
  }, []);
  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
  return (
    <div className={clsx(className, styles.root)}>
      <Slider />
      <Container>
        {activeLanguage === `Polish` ? (
          <div className={styles.shortDescription}>
            <h2>{whyUs.polish.header}</h2>
            <Row>
              {whyUs.polish.descriptions.map((description) => (
                <Col className="col-6 mb-5 mt-5">
                  <p>{description.text}</p>
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          <div className={styles.shortDescription}>
            <h2>{whyUs.english.header}</h2>
            <Row>
              {whyUs.english.descriptions.map((description) => (
                <Col className="col-6 mb-5 mt-5">
                  <p>{description.text}</p>
                </Col>
              ))}
            </Row>
          </div>
        )}

        <NewProducts />
      </Container>
      <main>{children}</main>
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
  Component as HomePage,
  // Container as HomePage,
  Component as HomePageComponent,
};
