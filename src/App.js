import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import axios from 'axios';
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

import initialState from './redux/initialState';

import { fetchMenu, changeLanguage } from './redux/menuRedux';
import { fetchPages } from './redux/pageRedux';

const App = () => {
  // const activeLanguage = useSelector((state) => state.activeLanguage);
  const dispatch = useDispatch();

  // const [state, setState] = useState(initialState);
  const [loaded, setLoaded] = useState(false);
  // console.log(`state`, state);
  useEffect(() => {
    dispatch(fetchPages());
    dispatch(fetchMenu());
    const loadData = () => {
      fetch(`https://geolocation-db.com/json/`)
        .then((res) => res.json())
        .then((response) => {
          console.log(`Country is : `, response.country_code);
          if (response.country_code !== `PL`) {
            dispatch(changeLanguage(`English`));
            // console.log(`active`, state.activeLanguage);
            // setState({ activeLanguage: `English` });
            // console.log(`active2`, state.activeLanguage);
            setLoaded(true);
          } else {
            dispatch(changeLanguage(`Polish`));
            setLoaded(true);
          }
        })
        .catch((data, status) => {
          console.log(`Request failed:`, data);
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
                  path="/onas"
                  component={() => <About language="pl" />}
                />
                <Route
                  exact
                  path="/cookies"
                  component={() => <Cookies language="en" />}
                />
                <Route
                  exact
                  path="/ciasteczka"
                  component={() => <Cookies language="pl" />}
                />
                <Route
                  exact
                  path="/pastries"
                  component={() => <Pastries language="en" />}
                />
                <Route
                  exact
                  path="/ciasta"
                  component={() => <Pastries language="pl" />}
                />
                <Route
                  exact
                  path="/cakes"
                  component={() => <Cakes language="en" />}
                />
                <Route
                  exact
                  path="/torty"
                  component={() => <Cakes language="pl" />}
                />
                <Route
                  exact
                  path="/sweets"
                  component={() => <Sweets language="en" />}
                />
                <Route
                  exact
                  path="/cukierki"
                  component={() => <Sweets language="pl" />}
                />
                <Route
                  exact
                  path="/contact"
                  component={() => <Contact language="en" />}
                />
                <Route
                  exact
                  path="/kontakt"
                  component={() => <Contact language="pl" />}
                />
              </AnimatedSwitch>
            </MainLayout>
          </BrowserRouter>
        </div>
      ) : null}
    </>
  );
};

export default App;
