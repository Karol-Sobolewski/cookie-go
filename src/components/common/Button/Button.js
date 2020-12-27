import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Button.module.scss';

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

export { Component as Button, Component as ButtonComponent };
