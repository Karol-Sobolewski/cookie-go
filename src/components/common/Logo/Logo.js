import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Logo.module.scss';

const Component = ({ className }) => {
  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
  return (
    <div className={clsx(className, styles.root)}>
      <Link to={activeLanguage === `English` ? `/en` : `/`}>
        <img
          type="image/svg+xml"
          src="/images/logo/logo.svg"
          className={styles.logoImg}
          aria-label="Logo"
        />
      </Link>
      <h1 className={styles.pageTitle}>Cookies and more...</h1>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export { Component as Logo, Component as LogoComponent };
