import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { HamburgerSqueeze } from 'react-animated-burgers';

import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import { Cart } from '../../features/Cart/Cart';
import styles from './ResponsiveMenu.module.scss';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

const Component = ({ className, children }) => {
  const menuItems = useSelector((state) => state.menus.data);
  const activeLanguage = useSelector(
    (state) => state.menus.data.activeLanguage
  );
  const [active, setActive] = useState(false);
  const toggleTrueFalse = () => setActive(!active);
  const useOutsideAlerter = (ref) => {
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
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  // console.log(active);
  return (
    <div className={clsx(className, styles.root)} ref={wrapperRef}>
      <HamburgerSqueeze
        className={styles.burgerButton}
        id="burgerButton"
        isActive={active}
        onClick={toggleTrueFalse}
      />

      <nav className={active ? styles.burgerMenu__active : styles.burgerMenu}>
        {menuItems.pages.map((item) => (
          <Col key={item.id}>
            <NavLink
              to={{ pathname: `/${item.src}` }}
              activeClassName="active"
              onClick={toggleTrueFalse}
            >
              {activeLanguage === `Polish`
                ? item.titlePolish
                : item.titleEnglish}
            </NavLink>
          </Col>
        ))}
        <Col>
          {activeLanguage === `Polish` ? (
            <NavLink to={{ pathname: `/en` }} activeClassName="active">
              EN
            </NavLink>
          ) : (
            <NavLink
              to={{ pathname: `/pl`, componentProps: `pl` }}
              activeClassName="active"
            >
              PL
            </NavLink>
          )}
        </Col>
      </nav>
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
  Component as ResponsiveMenu,
  // Container as Burger,
  Component as ResponsiveMenuComponent,
};
