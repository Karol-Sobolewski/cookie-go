import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Container, Row, Col } from 'react-bootstrap';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from './Contact.module.scss';

const Component = ({ className, children }) => {
  const MyMapComponent = compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyBBKy9aMQ2GWr-z5GOIaBxp9R66JjGWzmE&map_ids=398c318013e2ad8c&v=3.exp`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) => (
    <GoogleMap
      defaultZoom={17}
      defaultCenter={{ lat: 50.0625465503487, lng: 19.93636624388273 }}
      mapID="398c318013e2ad8c"
    >
      <Marker position={{ lat: 50.0625465503487, lng: 19.93636624388273 }} />
    </GoogleMap>
  ));
  //  50.06254655034874, 19.93636624388273
  return (
    <div className={clsx(className, styles.root)}>
      <Container>
        <Row>
          <div className={styles.contactBox}>
            <h2>Cookie Go</h2>
            <p>Rynek Główny 33</p>
            <p>30-010 Kraków</p>
            <p>Polska</p>
            <a href="mailto:contact@cookiego.pl">
              <div className={styles.contactLink}>
                <FontAwesomeIcon icon={faEnvelope} />
                <p>contact@cookiego.pl</p>
              </div>
            </a>
            <a href="tel:+48123456789">
              <div className={styles.contactLink}>
                <FontAwesomeIcon icon={faPhoneAlt} />
                <p>+48123456789</p>
              </div>
            </a>
          </div>
        </Row>
        <Row>
          <div className={styles.mapBox}>
            <MyMapComponent />
          </div>
        </Row>

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
  Component as Contact,
  // Container as OrderModal,
  Component as ContactComponent,
};
