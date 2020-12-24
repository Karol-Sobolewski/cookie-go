import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './OrderModal.module.scss';
import { Button } from '../../common/Button/Button';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children, showModal = false }) => {
  // const dispatch = useDispatch();
  const [isOpen, setModal] = useState(showModal);

  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
  useEffect(() => {
    // dispatch(actionName(`whatToDispatch`));
    setModal(showModal);
  }, []);
  console.log(showModal);
  return (
    <div className={clsx(className, styles.root)}>
      <Container className={styles.modalInner}>
        <Row>
          <Col>
            {activeLanguage === `Polish` ? (
              <h2>Edytuj polski tytuł</h2>
            ) : (
              <h2>OrderModal</h2>
            )}
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
  showModal: PropTypes.bool,
};

export {
  Component as OrderModal,
  // Container as OrderModal,
  Component as OrderModalComponent,
};
