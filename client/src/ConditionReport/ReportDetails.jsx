/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ReportDetails({ currentPark, setIssueObject, onSubmit }) {
  const [trailMarkers, setTrailMarkers] = useState([]);

  const [selectedTrail, setSelectedTrail] = useState('');
  const [selectedMarker, setSelectedMarker] = useState('');
  const [summaryInput, setSummaryInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  const { trails } = currentPark;
  const trailNames = trails.map((trail) => trail.name);

  const updateIssueObject = () => {
    setIssueObject({
      park: currentPark.parkName,
      trail: selectedTrail,
      marker: selectedMarker,
      summary: summaryInput,
      description: descriptionInput,
    });
  };

  const generateTrailMarkers = (marker, max, trail) => {
    const markers = [];
    for (let i = 1; i <= max; i += 1) {
      markers.push(marker + i);
    }
    setTrailMarkers(markers);
    setSelectedMarker(markers[0]);
    setSelectedTrail(trail);
    console.log(trail);
  };

  const handleMarkerSelect = (e) => {
    setSelectedMarker(e.target.value);
  };

  const handleIssueSummary = (e) => {
    setSummaryInput(e.target.value);
  };

  const handleIssueDescription = (e) => {
    setDescriptionInput(e.target.value);
  };

  const handleTrailSelect = (e) => {
    const selection = e.target.value;
    setSelectedTrail(currentPark.trails[selection]);
    const { marker } = currentPark.trails[selection];
    const { lastMarker } = currentPark.trails[selection];

    generateTrailMarkers(marker, lastMarker);
  };

  useEffect(() => {
    const { marker, lastMarker, name } = currentPark.trails[0];
    generateTrailMarkers(marker, lastMarker, name);
  }, []);

  useEffect(() => {
    updateIssueObject();
  }, [selectedTrail, selectedMarker, summaryInput, descriptionInput]);

  return (
    <div>
      <label>
        Trail Name
        <select onChange={handleTrailSelect}>
          {trailNames.map((name, index) => <option value={index}>{name}</option>)}
        </select>
      </label>
      <label>
        Nearest Trail Marker:
        <select onChange={handleMarkerSelect}>
          {trailMarkers.map((marker) => <option value={marker}>{marker}</option>)}
        </select>
      </label>
      <label>
        Short Summary
        <input type="text" onChange={handleIssueSummary} />
      </label>
      <label>
        Description
        <input type="text" onChange={handleIssueDescription} />
      </label>
      <button type="submit" onClick={onSubmit}>Submit Issue</button>
    </div>
  );
}

ReportDetails.propTypes = {
  currentPark: PropTypes.object.isRequired,
  setIssueObject: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ReportDetails;
