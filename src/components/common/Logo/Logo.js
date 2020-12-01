import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className }) => (
  <div className={clsx(className, styles.root)}>
    <Link to="/">
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

// const mapStateToProps = (state) => ({
//   someProp: reduxSelector(state);
// })

// const mapDispatchToProps = (dispatch) => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),

//   const container = connect(mapStateToProps, mapStateToProps)(Component);
// })

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Logo,
  // Container as Logo,
  Component as LogoComponent,
};
