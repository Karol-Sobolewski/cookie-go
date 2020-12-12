import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.scss';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

// const activeLanguage = useSelector(
//   (state) => state.menus.data.activeLanguage
// );

// useEffect(() => {

// }, []);

const Component = ({ className, children }) => {
  console.log(`Footer`);
  // console.log(activeLanguage);
  return (
    <div className={clsx(className, styles.root)}>
      <Container>
        <Row>
          <Col>
            <h2>Footer</h2>
          </Col>
        </Row>
        <main>{children}</main>
      </Container>
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
  Component as Footer,
  // Container as Footer,
  Component as FooterComponent,
};
