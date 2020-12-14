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
    (state) => state.menus.data.activeLanguage
  );
  const cookies = useSelector((state) => state.products.data.cookies);
  useEffect(() => {
    console.log(cookies);
  });
  // const [qty, setQty] = useState(1);
  // const state = {
  //   title: `asd`,
  //   quantity: qty,
  //   price: qty * 5,
  // };
  // console.log(`Cookies`);
  // const decrement = () => {
  //   if (qty > 1) {
  //     setQty(qty - 1);
  //   } else {
  //     setQty(1);
  //   }
  // };
  // const increment = () => {
  //   setQty(qty + 1);
  // };

  // const addToCart = (e) => {
  //   console.log(`add`);
  //   dispatch(addProduct(state));
  //   e.preventDefault();
  // };

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  //   const parseValue = parseInt(e.target.value);
  //   if (!isNaN(parseValue)) { //eslint-disable-line
  //     setQty(parseInt(e.target.value));
  //   }
  // };

  return (
    <div className={clsx(className, styles.root)}>
      {activeLanguage === `Polish` ? <h2>Ciastka</h2> : <h2>Cookies</h2>}
      <Container>
        <div className={styles.productGrid}>
          {cookies.map((item) => (
            <ProductForm
              key={item.id}
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
