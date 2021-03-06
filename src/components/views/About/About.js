import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './About.module.scss';

const Component = ({ className, children }) => {
  const allPages = useSelector((state) => state.pages.data);
  const aboutPageItems = allPages.filter((page) => page.title === `about`)[0];

  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );

  return (
    <div className={clsx(className, styles.root)}>
      <Container>
        <Row className={styles.aboutGrid}>
          <Col className={`col-12 col-xl-6 ${styles.aboutTextColumn}`}>
            {/* eslint-disable */}
            {activeLanguage === `Polish`
              ? aboutPageItems.polish.descriptions.map((item) => (
                  <div key={item.id} className={styles.aboutTextBox}>
                    <p className={styles.aboutParagraph}>{item.text}</p>
                  </div>
                ))
              : aboutPageItems.english.descriptions.map((item) => (
                  <div key={item.id} className={styles.aboutTextBox}>
                    <p className={styles.aboutParagraph}>{item.text}</p>
                  </div>
                ))}
                {/* eslint-enable */}
          </Col>
          <Col className={`col-12 col-xl-6 ${styles.aboutPhotoColumn}`}>
            {aboutPageItems.images.map((item) => (
              <div key={item.id} className={styles.aboutPhotoBox}>
                <img src={item.src} alt={item.title} />
              </div>
            ))}
          </Col>
        </Row>
        <main>{children}</main>
      </Container>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as About, Component as AboutComponent };
