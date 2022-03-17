/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ParkGenerator from './ParkGenerator/ParkGenerator';
import ConditionReportForm from './ConditionReport/ConditionReportForm';
import ReportViewer from './ReportViewer/ReportViewer';

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(darksalmon, coral);
    background-repeat: no-repeat;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    font-family: 'Rubik', sans-serif;
  }
  header {
    color: rgba(12, 71, 39, 0.9);
    font-family: 'Oxanium', sans-serif;
    font-size: 5vh;
    font-weight: 700;
    margin: 2vh;
    text-align: center;
    text-shadow: 0 0 60px rgba(255, 255, 255, 0.7);
  }
  button {
      width: 20vw;
      margin-left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
    }
`;

const Tabs = styled.nav`
  display: flex;
  flex-direction: row;
`;

const NavButton = styled.button`
    background-color: #c1e9d5;
    border: none;
    margin: 0;
    padding: 25px;
    transform: translateX(95%) translateY(40px);

    :hover {
      background-color: beige;
    }
`;

function App() {
  const [currentView, setCurrentView] = useState(<ParkGenerator />);
  const [currentTab, setCurrentTab] = useState('generate');

  const toggleView = (e) => {
    e.preventDefault();
    if (e.target.id === 'generate') {
      setCurrentView(<ParkGenerator />);
      setCurrentTab('generate');
    }
    if (e.target.id === 'report') {
      setCurrentView(<ConditionReportForm />);
      setCurrentTab('report');
    }
    if (e.target.id === 'issues') {
      setCurrentView(<ReportViewer />);
      setCurrentTab('issues');
    }
  };

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <header className="App-header">
          Purgatory
          <Tabs>
            <NavButton type="button" id="generate" current={currentTab} onClick={toggleView}>Park Generator</NavButton>
            <NavButton type="button" id="report" current={currentTab} onClick={toggleView}>Report an Issue</NavButton>
            <NavButton type="button" id="issues" current={currentTab} onClick={toggleView}>View Issues</NavButton>
          </Tabs>
        </header>
        {currentView}
      </div>
    </>
  );
}

export default App;
