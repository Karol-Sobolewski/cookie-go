import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
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
  const container = React.createRef();

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

  return (
    <div className={clsx(className, styles.root)}>
      <Slider />
      <Container>
        <div className={styles.shortDescription}>
          <p>short description</p>
        </div>
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
