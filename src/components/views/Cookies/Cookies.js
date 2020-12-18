import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import styles from './Cookies.module.scss';
import { ProductForm } from '../../common/ProductForm/ProductForm';
// import { connect } from 'react-redux';
// import { addProduct } from '../../../redux/cartRedux';

const Component = ({ className, children }) => {
  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
  const cookies = useSelector((state) => state.products.data.cookies);
  useEffect(() => {});

  return (
    <div className={clsx(className, styles.root)}>
      {activeLanguage === `Polish` ? <h2>Ciastka</h2> : <h2>Cookies</h2>}
      <Container>
        <div className={styles.productGrid}>
          {cookies.map((item) => (
            <ProductForm
              key={item._id}
              title={
                activeLanguage === `Polish`
                  ? item.polish.title
                  : item.english.title
              }
              description={
                activeLanguage === `Polish`
                  ? item.polish.description
                  : item.english.description
              }
              price={item.price}
              images={item.images}
              nutrition={item.nutrition}
            />
          ))}
        </div>
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
  Component as Cookies,
  // Container as Cookies,
  Component as CookiesComponent,
};
