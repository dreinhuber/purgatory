/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NewTrail = styled.div`
  padding: 1vh 1vw;
  .trail-name{
    max-width: 15vw;
  }
  .marker-shorthand{
    max-width: 5vw;
  }
  .marker-num{
    max-width: 5vw;
  }
`;

function AddTrail({ index, trails, setTrails }) {
  const [trailDetails, setTrailDetails] = useState({
    name: '',
    markerShortHand: '',
    lastMarker: '',
  });

  const updateTrails = () => {
    const currentTrails = trails;
    currentTrails[index] = trailDetails;
    setTrails(currentTrails);
  };

  const handleNameInput = (e) => {
    e.preventDefault();
    setTrailDetails({ ...trailDetails, name: e.target.value });
  };

  const handleMarkerName = (e) => {
    e.preventDefault();
    setTrailDetails({ ...trailDetails, markerShortHand: e.target.value });
  };

  const handleMarkerNumber = (e) => {
    e.preventDefault();
    setTrailDetails({ ...trailDetails, lastMarker: e.target.value });
  };

  useEffect(() => {
    updateTrails();
  });

  return (
    <NewTrail>
      <label>
        Name:
        <input className="trail-name" type="text" name="trail-name" onChange={handleNameInput} />
      </label>
      <label>
        Marker:
        <input className="marker-shorthand" type="text" name="marker-shorthand" onChange={handleMarkerName} />
      </label>
      <label>
        Last Marker:
        <input className="marker-num" type="number" name="marker range" onChange={handleMarkerNumber} />
      </label>
    </NewTrail>
  );
}

AddTrail.propTypes = {
  index: PropTypes.number.isRequired,
  trails: PropTypes.array.isRequired,
  setTrails: PropTypes.func.isRequired,
};

export default AddTrail;
