import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';
import styles from './NewProducts.module.scss';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  console.log(`NewProducts`);
  // const dispatch = useDispatch();

  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
  const exchangeRate = useSelector((state) => state.utils.data.rate);

  const products = useSelector((state) => state.products.data);
  useEffect(() => {
    // console.log(lastFour);
  }, []);
  const sort = products.sort(function (a, b) {
    const c = new Date(a.added);
    const d = new Date(b.added);
    return d - c;
  });
  const lastFour = sort.slice(0, 4);
  return (
    <div className={clsx(className, styles.root)}>
      <Container>
        <Row>
          <Col>
            {activeLanguage === `Polish` ? (
              <h2>Nasze najnowsze produkty</h2>
            ) : (
              <h2>Our recent products</h2>
            )}
          </Col>
        </Row>
        <Row className="d-flex justify-content-around align-items-center">
          {lastFour.map((item) => (
            <div key={item._id} className={styles.productBox}>
              <Link
                key={item._id}
                to={`/products/${item._id}`}
                className={styles.productBoxPhoto}
              >
                <img src={item.images[0].src} alt={item.images[0].title} />
              </Link>
              <div className={styles.productBoxText}>
                <p>
                  {activeLanguage === `Polish`
                    ? item.polish.title
                    : item.english.title}
                </p>
                <p>
                  {item.price} Zł
                  {activeLanguage !== `Polish`
                    ? /*eslint-disable*/
             ` / ${(
              Math.round(((item.price) / exchangeRate) * 100) / 100
              ).toFixed(2)} E`
            : null}
            {/**eslint-enable */}</p>
              </div>
            </div>
          ))}
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
  Component as NewProducts,
  // Container as NewProducts,
  Component as NewProductsComponent,
};
