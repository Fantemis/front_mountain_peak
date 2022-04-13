/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { Route, Router } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchMountainPeaks } from './reducers/Slices/MountainPeaksSlice';
import Globe from 'react-globe.gl';

const App = ({
  mountainPeaks,
  mountainPeaksData
}) => {

  useEffect(() => {
      // FIXME What should we do if the token doesn't exist
      mountainPeaks();
    }, []);

  const N = 300;
  const gData = mountainPeaksData.map((mountainPeak) => ({
    lat: mountainPeak.latitude,
    lng: mountainPeak.longitude,
    size: mountainPeak.altitude / 50000,
    color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
  }));

  return (
   <Globe 
   pointsData={gData}
   pointAltitude="size"
   pointColor="color"
   globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
   />
  );
}

App.propTypes = {
  mountainPeaks: PropTypes.func,
  mountainPeaksData: PropTypes.array,
};

const mapStateToProps = (state) => ({
mountainPeaksData: state.mountainPeaks.mountainPeaks,
});

export default connect(mapStateToProps, {
  mountainPeaks: fetchMountainPeaks
})(App);

