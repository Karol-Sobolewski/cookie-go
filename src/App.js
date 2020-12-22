import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import styles from './App.module.scss';

import './styles/bootstrap.scss';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { HomePage } from './components/views/HomePage/HomePage';
import { About } from './components/views/About/About';
import { Contact } from './components/views/Contact/Contact';
import { NotFound } from './components/views/NotFound/NotFound';
import { SingleProductPage } from './components/common/SingleProductPage/SingleProductPage';
import { ProductsPage } from './components/common/ProductsPage/ProductsPage';
import { fetchMenu } from './redux/menuRedux';

import {
  fetchUtils,
  changeActiveLanguage,
  changeExchangeRate,
} from './redux/utilsRedux';
import { fetchPages } from './redux/pageRedux';
import { fetchProducts } from './redux/productRedux';

import ScrollToTop from './utils/ScrollToTop';

const App = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    dispatch(fetchPages());
    dispatch(fetchMenu());
    dispatch(fetchProducts());
    dispatch(fetchUtils());

    const loadData = () => {
      fetch(`https://geolocation-db.com/json/`)
        .then((res) => res.json())
        .then((response) => {
          // console.log(`Country is : `, response.country_code);
          if (response.country_code !== `PL`) {
            // dispatch(changeLanguage(`English`));
            dispatch(changeActiveLanguage(`English`));
            setLoaded(true);
          } else {
            dispatch(changeActiveLanguage(`Polish`));
            setLoaded(true);
          }
        })
        .catch((error) => {
          console.log(`Request failed:`, error);
          dispatch(changeActiveLanguage(`Polish`));
          setLoaded(true);
        });
      fetch(`https://api.nbp.pl/api/exchangerates/rates/A/EUR/?format=json`)
        .then((res) => res.json())
        .then((currency) => {
          const euro = (Math.round(currency.rates[0].mid * 100) / 100).toFixed(
            2
          );
          dispatch(changeExchangeRate(euro));
          // console.log(euro);
        });
    };
    setTimeout(() => {
      loadData();
    }, 500);
  }, []);

  return (
    <>
      {loaded ? (
        <div className={styles.app}>
          <BrowserRouter>
            <ScrollToTop />
            <MainLayout>
              <AnimatedSwitch
                atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className={styles.switchWrapper}
              >
                <Route exact path="/" component={() => <HomePage />} />
                <Route
                  exact
                  path="/en"
                  component={() => <HomePage language="en" />}
                />
                <Route
                  exact
                  path="/pl"
                  component={() => <HomePage language="pl" />}
                />
                <Route exact path="/about" component={() => <About />} />
                <Route
                  exact
                  path="/cookies"
                  component={() => <ProductsPage productName="cookies" />}
                />
                <Route
                  exact
                  path="/pastries"
                  component={() => <ProductsPage productName="pastries" />}
                />
                <Route
                  exact
                  path="/cakes"
                  component={() => <ProductsPage productName="cakes" />}
                />
                <Route
                  exact
                  path="/sweets"
                  component={() => <ProductsPage productName="sweets" />}
                />
                <Route exact path="/contact" component={() => <Contact />} />
                <Route
                  exact
                  path="/products/:id"
                  component={SingleProductPage}
                />
                <Route path="*" component={NotFound} />
              </AnimatedSwitch>
            </MainLayout>
          </BrowserRouter>
        </div>
      ) : null}
    </>
  );
};

export default App;
