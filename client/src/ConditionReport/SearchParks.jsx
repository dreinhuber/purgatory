/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ParkSearch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  input {
    width: 20vw;
  }

  #search-parks {
    background-color: #cef2e9;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    margin: 3px;
    margin-top: 3vh;
    padding: 5px;
    max-width: 5em;
    height: 2.2em;

    :hover {
      color: gold;
      background-color: #5d9184;
      box-shadow: -1px 1px grey;
    }

    :active {
      background-color: #4c7369;
      box-shadow: none;
    }
  }
`;

function SearchParks({
  setParkExists,
  setCurrentPark,
}) {
  const [parkSearchInput, setParkSearchInput] = useState('');
  const [parks, setParks] = ([]);

  const handleParkSearchInput = (e) => {
    setParkSearchInput(e.target.value);
  };

  const handleParkSearchSubmit = (e) => {
    e.preventDefault();
    axios.post(
      '/parks/search',
      { data: parkSearchInput },
    )
      .then(({ data }) => {
        if (data) {
          setCurrentPark(data);
          setParkExists(true);
        }
      });
  };

  const getAllParkNames = () => {
    axios.get('/parks/all')
      .then((data) => {
        setParks(data);
        console.log(data);
      });
  };

  useEffect(() => {
    getAllParkNames();
  }, []);

  return (
    <ParkSearch>
      <label>
        Which Park has an issue?
        <br />
        {parks
          ? (
            <>
              <input list="available-parks" onChange={handleParkSearchInput} />
              <datalist id="available-parks">
                {parks.forEach((park) => <option value={park} />)}
              </datalist>
            </>
          )
          : <input type="text" onChange={handleParkSearchInput} />}
      </label>
      <button type="submit" onClick={handleParkSearchSubmit} id="search-parks">Search</button>
    </ParkSearch>
  );
}

SearchParks.propTypes = {
  setParkExists: PropTypes.func.isRequired,
  setCurrentPark: PropTypes.func.isRequired,
};

export default SearchParks;
