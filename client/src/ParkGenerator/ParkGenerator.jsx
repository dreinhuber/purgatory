/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AddTrail from './AddTrail';
import { ModuleStyle } from '../styles';

const Generator = styled.div`
  ${ModuleStyle}
`;

let trailCounter = 0;

function ParkGenerator() {
  const [trailInputs, setTrailInputs] = useState([]);
  const [parkName, setParkName] = useState('');
  const [trails, setTrails] = useState([]);

  const addTrailInput = (e) => {
    e.preventDefault();
    trailCounter += 1;
    setTrailInputs((existing) => [
      ...existing,
      <AddTrail
        key={trailCounter}
        index={trailCounter - 1}
        trails={trails}
        setTrails={setTrails}
      />,
    ]);
  };

  const handleParkName = (e) => {
    setParkName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newParkObject = {
      parkName,
      trails,
    };

    axios.post('http://localhost:3000/parks', {
      data: newParkObject,
    });
  };

  return (
    <Generator>
      <form className="gen-form">
        <label>
          Park Name:
          <br />
          <input type="text" name="name" placeholder="name of your park" onChange={handleParkName} />
        </label>
        Trails:
        {trailInputs.map((trailInput) => trailInput)}
        <button type="button" onClick={addTrailInput}>Add Trail</button>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </Generator>
  );
}

export default ParkGenerator;
