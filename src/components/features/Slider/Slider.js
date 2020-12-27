import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/captioned.css';
import styles from './Slider.module.scss';

const Component = ({ className }) => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  const allPages = useSelector((state) => state.pages.data);
  const sliderData = allPages.filter((page) => page.title === `slider`)[0];

  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
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

Component.propTypes = {
  className: PropTypes.string,
};

export { Component as Slider, Component as SliderComponent };
