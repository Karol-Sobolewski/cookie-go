import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import styles from './Cakes.module.scss';
import { ProductForm } from '../../common/ProductForm/ProductForm';

const Component = ({ className, children }) => {
  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );
  const cakes = useSelector((state) => state.products.data.cakes);

  return (
    <div className={clsx(className, styles.root)}>
      {activeLanguage === `Polish` ? <h2>Torty</h2> : <h2>Cakes</h2>}
      <Container>
        <div className={styles.productGrid}>
          {cakes.map((item) => (
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
};

export {
  Component as Cakes,
  // Container as Cookies,
  Component as CakesComponent,
};
