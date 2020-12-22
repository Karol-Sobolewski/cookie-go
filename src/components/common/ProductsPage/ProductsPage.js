import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import styles from './ProductsPage.module.scss';
import { ProductForm } from '../ProductForm/ProductForm';

const Component = ({ className, children, productName }) => {
  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
  const allProducts = useSelector((state) => state.products.data);
  const products = allProducts.filter(
    (product) => product.category === productName
  );
  // console.log(products);
  return (
    <div className={clsx(className, styles.root)}>
      <Container>
        <div className={styles.productGrid}>
          {products.map((item) => (
            <ProductForm
              key={item._id}
              id={item._id}
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
              singlePrice={item.price}
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

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  productName: PropTypes.string,
};

export {
  Component as ProductsPage,
  // Container as Cookies,
  Component as ProductsPageComponent,
};
