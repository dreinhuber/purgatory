/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IssueForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  select {
    padding: 5px;
    margin-left: 2em;
    background-color: #95c4b4;
    font-family: inherit;
  }

  #summary {
    width: 50vw;
  }

  #selectors {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 3vw;
    margin-bottom: 3vw;
  }

  textarea {
    border: thin solid #517868;
    box-shadow: 0 0 1px #ffffff;
    background-color: #95c4b4;
    color:rgb(73, 28, 7);
    font-family: inherit;
    font-size: 1.25em;
    padding: 7px;
    margin: 5px;
    min-height: 20vh;
    width: 50vw;
  }
`;

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
    console.log(selectedTrail);
  };

  const generateTrailMarkers = (marker, max, trail) => {
    const markers = [];
    for (let i = 1; i <= max; i += 1) {
      markers.push(marker + i);
    }
    setTrailMarkers(markers);
    setSelectedMarker(markers[0]);
    setSelectedTrail(trail);
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
    const { marker } = currentPark.trails[selection];
    const { lastMarker } = currentPark.trails[selection];
    generateTrailMarkers(marker, lastMarker);
    setSelectedTrail(currentPark.trails[selection].name);
  };

  useEffect(() => {
    const { marker, lastMarker, name } = currentPark.trails[0];
    generateTrailMarkers(marker, lastMarker, name);
  }, []);

  useEffect(() => {
    updateIssueObject();
  }, [selectedTrail, selectedMarker, summaryInput, descriptionInput]);

  return (
    <IssueForm>
      <div id="selectors">
        <label>
          Trail Name:
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
      </div>
      <label>
        Category/Summary:
        <br />
        <input id="summary" type="text" onChange={handleIssueSummary} />
      </label>
      <label>
        Longer Description:
        <br />
        <textarea type="text" onChange={handleIssueDescription} />
      </label>
      <button type="submit" onClick={onSubmit}>Submit Issue</button>
    </IssueForm>
  );
}

ReportDetails.propTypes = {
  currentPark: PropTypes.object.isRequired,
  setIssueObject: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ReportDetails;
