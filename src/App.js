/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Route, Router } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchMountainPeaks } from './reducers/Slices/MountainPeaksSlice';
import { updateMountainPeak } from './reducers/Slices/MountainPeaksSlice';
import { createMountainPeak } from './reducers/Slices/MountainPeaksSlice';

import Globe from 'react-globe.gl';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './App.css';
const App = ({
  mountainPeaks,
  mountainPeaksData,
  updateForm,
  createPeak,
}) => {

  const pointScale = 50000;
  const [open, setOpen] = useState(false);
  const [mod, setMod] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [altitude, setAltitude] = useState('');

  const [payload, setPayload] = useState('');

  const onOpenModal = (e, mod) => {
    setMod(mod);
    setOpen(true);
    if(e.name !== undefined) {
      setPayload(e);
      setId(e.pk);
      setName(e.name);
      setLocation(e.location);
      setLatitude(e.lat);
      setLongitude(e.lng);
      setAltitude(e.size * pointScale);
    }
  }
  const onCloseModal = () => setOpen(false);
  const sendData = () => {
    const payload = {
      name,
      location,
      latitude,
      longitude,
      altitude
    }
    console.log(payload)
    mod === 'update' ? updateForm(id, payload) : createPeak(payload);
    onCloseModal();
  }
  useEffect(() => {
      // FIXME What should we do if the token doesn't exist
      mountainPeaks();
  }, []);

  const N = 300;
  const gData = mountainPeaksData.map((mountainPeak) => ({
    pk: mountainPeak.pk,
    name: mountainPeak.name,
    location: mountainPeak.location,
    lat: mountainPeak.latitude,
    lng: mountainPeak.longitude,
    size: mountainPeak.altitude / pointScale,
    color:'white'
  }));

  // ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
  return (
    <>
      <button className="add-button" type="button" onClick={(e) => onOpenModal(e, 'create')}>add data</button>
      <Globe 
        pointsData={gData}
        onPointClick={(e) => onOpenModal(e, 'update')}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      />
      <Modal open={open} onClose={onCloseModal} center>
        <h2>Name: &nbsp;
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        </h2>
        <h2>Location: &nbsp;
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}/>
        </h2>
        <h2>Latitude: &nbsp;
          <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)}/>
        </h2>
        <h2>Longitude: &nbsp;
        <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)}/>
        </h2>
        <h2>Altitude: &nbsp;
        <input type="text" value={altitude} onChange={(e) => setAltitude(e.target.value)}/>
        </h2>
        <button type='button' onClick={sendData}>Send data</button>
      </Modal>
    </>
  );
}

App.propTypes = {
  mountainPeaks: PropTypes.func,
  mountainPeaksData: PropTypes.array,
  updateForm: PropTypes.func,
  createPeak: PropTypes.func,
};

const mapStateToProps = (state) => ({
mountainPeaksData: state.mountainPeaks.mountainPeaks,
});

export default connect(mapStateToProps, {
  mountainPeaks: fetchMountainPeaks,
  updateForm: updateMountainPeak,
  createPeak: createMountainPeak,
})(App);

