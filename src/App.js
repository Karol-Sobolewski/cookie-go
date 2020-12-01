import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import axios from 'axios';
import styles from './App.module.scss';
import './styles/bootstrap.scss';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { HomePage } from './components/views/HomePage/HomePage';
import { Contact } from './components/views/Contact/Contact';
import initialState from './redux/initialState';

const App = () => {
  // const activeLanguage = useSelector((state) => state.activeLanguage);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    fetch(`https://geolocation-db.com/json/`)
      .then((res) => res.json())
      .then((response) => {
        console.log(`Country is : `, response.country_code);
        if (response.country_code !== `PL`) {
          console.log(`active`, state.activeLanguage);
          setState({ activeLanguage: `English` });
          console.log(`active2`, state.activeLanguage);
        } else {
          setState({ activeLanguage: `Polish` });
        }
      })
      .catch((data, status) => {
        console.log(`Request failed:`, data);
      });
  }, []);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <MainLayout>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className={styles.switchWrapper}
          >
            <Route exact path="/" component={HomePage} />
            <Route exact path="/contact" component={Contact} />
          </AnimatedSwitch>
        </MainLayout>
      </BrowserRouter>
    </div>
  );
};

export default App;
