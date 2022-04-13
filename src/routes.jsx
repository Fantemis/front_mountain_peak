/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { Route, Router } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import App from './App';
import { fetchMountainPeaks } from './reducers/Slices/MountainPeaksSlice';


const Routes = ({
    mountainPeaks
}) => {

    useEffect(() => {
        // FIXME What should we do if the token doesn't exist
        mountainPeaks();
      }, []);

    return (
        
            <Router>
                <Route exact path='/' component={App} />
            </Router>
    );
};

Routes.propTypes = {
    mountainPeaks: PropTypes.func,
};

const mapStateToProps = (state) => ({
  mountainPeaks: state.mountainPeaks.mountainPeaks,
});

export default connect(mapStateToProps, {
    mountainPeaks: fetchMountainPeaks
})(Routes);
