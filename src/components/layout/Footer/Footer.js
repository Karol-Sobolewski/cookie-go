import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// import { Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.scss';

// const activeLanguage = useSelector(
//   (state) => state.menus.data.activeLanguage
// );

// useEffect(() => {

// }, []);

const Component = ({ className, children }) => {
  console.log(`Footer`);
  // console.log(activeLanguage);
  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.footerIcons}>
        <button type="button">
          <a href="https://www.facebook.com/">
            <FontAwesomeIcon
              icon={faFacebook}
              className={styles.footerIcon}
              size="2x"
            />
          </a>
        </button>
        <button type="button">
          <a href="https://www.instagram.com/">
            <FontAwesomeIcon
              icon={faInstagram}
              className={styles.footerIcon}
              size="2x"
            />
          </a>
        </button>
        <button type="button">
          <a href="https://www.twitter.com/">
            <FontAwesomeIcon
              icon={faTwitter}
              className={styles.footerIcon}
              size="2x"
            />
          </a>
        </button>
      </div>
      <main>{children}</main>
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
  Component as Footer,
  // Container as Footer,
  Component as FooterComponent,
};
