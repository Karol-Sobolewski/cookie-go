import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './Button.module.scss';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children, type, ...otherProps }) => (
  <button className={clsx(className, styles.root)} type={type} {...otherProps}> {/* eslint-disable-line */}
    {children}
  </button>
);
Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
};

export {
  Component as Button,
  // Container as Button,
  Component as ButtonComponent,
};
