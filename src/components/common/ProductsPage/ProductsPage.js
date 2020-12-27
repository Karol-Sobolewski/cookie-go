import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import styles from './ProductsPage.module.scss';
import { ProductForm } from '../ProductForm/ProductForm';

const Component = ({ className, children, productName }) => {
  const allProducts = useSelector((state) => state.products.data);
  const products = allProducts.filter(
    (product) => product.category === productName
  );
  return (
    <div className={clsx(className, styles.root)}>
      <Container>
        <div className={styles.productGrid}>
          {products.map((item) => (
            <ProductForm key={item._id} product={item} />
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

export { Component as ProductsPage, Component as ProductsPageComponent };
