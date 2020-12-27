import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { Container, Row, Col } from 'react-bootstrap';
import { HamburgerSqueeze } from 'react-animated-burgers';
import { changeActiveLanguage } from '../../../redux/utilsRedux';
import { Cart } from '../../features/Cart/Cart';
import styles from './Navbar.module.scss';

const Component = ({ className, children }) => {
  const menuItems = useSelector((state) => state.menus.data);
  const activeLanguage = useSelector(
    (state) => state.utils.data.activeLanguage
  );

  const [active, setActive] = useState(false);
  const [activeRWD, setActiveRWD] = useState(false);

  const dispatch = useDispatch();

  const toggleMenuButton = () => setActiveRWD(!activeRWD);

  const handleToggleLanguageButton = () => {
    if (activeLanguage === `Polish`) {
      dispatch(changeActiveLanguage(`English`));
    } else if (activeLanguage === `English`) {
      dispatch(changeActiveLanguage(`Polish`));
    }
    setActive(!active);
  };

  const useOutsideMenu = (ref) => {
    useEffect(() => {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setActiveRWD(false);
          setActive(false);
        }
      }
      document.addEventListener(`mousedown`, handleClickOutside);
      return () => {
        document.removeEventListener(`mousedown`, handleClickOutside);
      };
    }, [ref]);
  };
  const menuRef = useRef(null);
  useOutsideMenu(menuRef);

  const useOutsideLanguage = (ref) => {
    useEffect(() => {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setActive(false);
        }
      }
      document.addEventListener(`mousedown`, handleClickOutside);
      return () => {
        document.removeEventListener(`mousedown`, handleClickOutside);
      };
    }, [ref]);
  };

  const languageRef = useRef(null);
  useOutsideLanguage(languageRef);

  return (
    <div className={clsx(className, styles.root)} ref={menuRef}>
      <HamburgerSqueeze
        className={styles.burgerButton}
        id="burgerButton"
        isActive={activeRWD}
        onClick={toggleMenuButton}
      />
      <Container className="">
        <Row className={activeRWD ? styles.mainMenu__active : styles.mainMenu}>
          {menuItems.pages.map((item) => (
            <Col key={item.id}>
              <NavLink
                to={{ pathname: `/${item.src}` }}
                activeClassName="active"
                onClick={() => setActiveRWD(false)}
              >
                {activeLanguage === `Polish`
                  ? item.titlePolish
                  : item.titleEnglish}
              </NavLink>
            </Col>
          ))}
          <Col className={styles.changeLanguage} ref={languageRef}>
            <button onClick={() => setActive(!active)} type="button">
              <h3>{activeLanguage === `Polish` ? `Language` : `Język`}</h3>
            </button>
            <ul
              className={
                active ? styles.languagesBox__active : styles.languagesBox
              }
            >
              {activeLanguage === `Polish` ? (
                <li  //eslint-disable-line
                  className={styles.languageBox}
                  onClick={() => handleToggleLanguageButton()}
                >
                  <img src="/images/language/muffinNB.png" alt="English" />
                  <a href="#">ENGLISH</a>
                </li>
              ) : (
                <li  //eslint-disable-line
                  className={styles.languageBox}
                  onClick={() => handleToggleLanguageButton()}
                >
                  <img src="/images/language/paczek.png" alt="Polski" />
                  <a href="#">POLSKI</a>
                </li>
              )}
            </ul>
          </Col>
          <Col className={styles.cartMenu}>
            <Cart />
          </Col>
        </Row>
        <main>{children}</main>
      </Container>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export { Component as Navbar, Component as NavbarComponent };
