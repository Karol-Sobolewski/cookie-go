import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import { NotFound } from '../../views/NotFound/NotFound';
import { ProductForm } from '../ProductForm/ProductForm';
import styles from './SingleProductPage.module.scss';

// import { connect } from 'react-redux';
import { fetchSelectedProduct } from '../../../redux/productRedux';

const Component = ({ className, children }) => {
  // console.log(`SingleProductPage`);
  const dispatch = useDispatch();

  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
  const params = useParams();
  const products = useSelector((state) => state.products.data);
  const getProductById = products.filter(
    (product) => product._id === params.id
  )[0];
  console.log(getProductById);
  useEffect(() => {
    // dispatch(fetchSelectedProduct(id.id));
    // dispatch(getProductById(id.id));
    // console.log(products);
    // dispatch(getProductById(products, id.id));
    // console.log(getProductById);
  }, []);
  return (
    <div className={clsx(className, styles.root)}>
      {getProductById ? (
        <Container>
          <Row>
            <ProductForm
              key={params.id}
              id={params.id}
              title={
                activeLanguage === `Polish`
                  ? getProductById.polish.title
                  : getProductById.english.title
              }
              description={
                activeLanguage === `Polish`
                  ? getProductById.polish.description
                  : getProductById.english.description
              }
              price={getProductById.price}
              singlePrice={getProductById.price}
              images={getProductById.images}
              nutrition={getProductById.nutrition}
            />
          </Row>
          <main>{children}</main>
        </Container>
      ) : (
        <NotFound />
      )}
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
  // product: getProductById(state, props.match.params.id),
};

export {
  Component as SingleProductPage,
  // Container as SingleProductPage,
  Component as SingleProductPageComponent,
};
