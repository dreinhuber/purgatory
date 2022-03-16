/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function SearchParks({
  setParkExists,
  setCurrentPark,
}) {
  const [parkSearchInput, setParkSearchInput] = useState('');

  const handleParkSearchInput = (e) => {
    setParkSearchInput(e.target.value);
  };

  const handleParkSearchSubmit = (e) => {
    e.preventDefault();
    axios.post(
      'http://localhost:3000/parks/search',
      { data: parkSearchInput },
    )
      .then(({ data }) => {
        if (data) {
          setCurrentPark(data);
          setParkExists(true);
        }
      });
  };

  return (
    <div>
      <label>
        Park Name
        <input type="text" onChange={handleParkSearchInput} />
      </label>
      <button type="submit" onClick={handleParkSearchSubmit}>Search</button>
    </div>
  );
}

SearchParks.propTypes = {
  setParkExists: PropTypes.func.isRequired,
  setCurrentPark: PropTypes.func.isRequired,
};

export default SearchParks;
