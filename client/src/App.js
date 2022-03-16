/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import ParkGenerator from './ParkGenerator/ParkGenerator';
import ConditionReportForm from './ConditionReport/ConditionReportForm';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: tan;
    display: flex;
    flex-direction: column;
  }
  header {
    font-size: 4vh;
    text-align: center;
  }
`;

function App() {
  const [currentView, setCurrentView] = useState(<ConditionReportForm />);

  const toggleView = (e) => {
    e.preventDefault();
    if (e.target.value === 'generate') setCurrentView(<ParkGenerator />);
    if (e.target.value === 'report') setCurrentView(<ConditionReportForm />);
    if (e.target.value === 'issues') setCurrentView(<ParkGenerator />);
  };

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <header className="App-header">
          Purgatory
          <nav>
            <button type="button" value="generate" onClick={toggleView}>Park Generator</button>
            <button type="button" value="report" onClick={toggleView}>Report an Issue</button>
            <button type="button" value="issues" onClick={toggleView}>View Issues</button>
          </nav>
        </header>
        {currentView}
      </div>
    </>
  );
}

export default App;
