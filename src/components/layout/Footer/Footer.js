import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.scss';

const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    <div className={styles.footerIcons}>
      <button type="button">
        <a href="https://www.facebook.com/">
          <FontAwesomeIcon
            icon={faFacebook}
            className={styles.footerIcon}
            size="2x"
          />
        </a>
      </button>
      <button type="button">
        <a href="https://www.instagram.com/">
          <FontAwesomeIcon
            icon={faInstagram}
            className={styles.footerIcon}
            size="2x"
          />
        </a>
      </button>
      <button type="button">
        <a href="https://www.twitter.com/">
          <FontAwesomeIcon
            icon={faTwitter}
            className={styles.footerIcon}
            size="2x"
          />
        </a>
      </button>
    </div>
    <main>{children}</main>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as Footer, Component as FooterComponent };
