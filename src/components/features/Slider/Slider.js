import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/captioned.css';
import styles from './Slider.module.scss';

// import { connect } from 'react-redux';

const Component = ({ className, children }) => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const products = useSelector((state) => state.products.data);

  const allPages = useSelector((state) => state.pages.data);
  const sliderData = allPages.filter((page) => page.title === `slider`)[0];

  console.log(`sliderData`, sliderData);
  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
  useEffect(() => {
    // dispatch(actionName(`whatToDispatch`));
  }, []);
  return (
    <div className={clsx(className, styles.root)}>
      <AutoplaySlider
        play
        cancelOnInteraction={false}
        interval={6000}
        className={styles.slider}
        cssModule={styles}
        bullets={false}
        fillParent
      >
        {sliderData.images.map((image) => (
          <div key={image.id} data-src={image.src}>
            <div className={styles.caption}>
              <p>
                {activeLanguage === `Polish` ? image.polish : image.english}
              </p>
            </div>
          </div>
        ))}
      </AutoplaySlider>
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
};

export {
  Component as Slider,
  // Container as Slider,
  Component as SliderComponent,
};
