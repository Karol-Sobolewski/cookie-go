import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import styles from './App.module.scss';

import './styles/bootstrap.scss';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { HomePage } from './components/views/HomePage/HomePage';
import { About } from './components/views/About/About';
import { Cookies } from './components/views/Cookies/Cookies';
import { Pastries } from './components/views/Pastries/Pastries';
import { Cakes } from './components/views/Cakes/Cakes';
import { Sweets } from './components/views/Sweets/Sweets';
import { Contact } from './components/views/Contact/Contact';
import { NotFound } from './components/views/NotFound/NotFound';
import { fetchMenu, changeLanguage } from './redux/menuRedux';
import { fetchPages } from './redux/pageRedux';
import { fetchProducts } from './redux/productRedux';

const App = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    console.log(process.env.NODE_ENV);
    dispatch(fetchPages());
    dispatch(fetchMenu());
    dispatch(fetchProducts());
    const loadData = () => {
      fetch(`https://geolocation-db.com/json/`)
        .then((res) => res.json())
        .then((response) => {
          console.log(`Country is : `, response.country_code);
          if (response.country_code !== `PL`) {
            dispatch(changeLanguage(`English`));
            setLoaded(true);
          } else {
            dispatch(changeLanguage(`Polish`));
            setLoaded(true);
          }
        })
        .catch((error) => {
          console.log(`Request failed:`, error);
          dispatch(changeLanguage(`Polish`));
          setLoaded(true);
        });
    };
    setTimeout(() => {
      loadData();
      setLoaded(true);
    }, 500);
  }, []);

  return (
    <>
      {loaded ? (
        <div className={styles.app}>
          <BrowserRouter>
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
                <Route
                  exact
                  path="/about"
                  component={() => <About language="en" />}
                />
                <Route
                  exact
                  path="/cookies"
                  component={() => <Cookies language="en" />}
                />
                <Route
                  exact
                  path="/pastries"
                  component={() => <Pastries language="en" />}
                />
                <Route
                  exact
                  path="/cakes"
                  component={() => <Cakes language="en" />}
                />
                <Route
                  exact
                  path="/sweets"
                  component={() => <Sweets language="en" />}
                />
                <Route
                  exact
                  path="/contact"
                  component={() => <Contact language="en" />}
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
