import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row } from 'react-bootstrap';
import styles from './Header.module.scss';

import { Logo } from '../../common/Logo/Logo';
import { Navbar } from '../Navbar/Navbar';

const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    <Container fluid>
      <Row className={styles.topPattern} />
      <Row className="d-flex justify-content-center align-items-center">
        <Logo />
      </Row>
      <Row>
        <Navbar />
      </Row>
      <main>{children}</main>
    </Container>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as Header, Component as HeaderComponent };
