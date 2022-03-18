/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ParkGenerator from './ParkGenerator/ParkGenerator';
import ConditionReportForm from './ConditionReport/ConditionReportForm';
import ReportViewer from './ReportViewer/ReportViewer';

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(#dbaca0, coral);
    background-repeat: no-repeat;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    font-family: 'Rubik', sans-serif;
  }
  header {
    color: #2c4f46;
    font-family: 'Oxanium', sans-serif;
    font-size: 5vh;
    font-weight: 700;
    margin: 2vh;
    text-align: center;
    text-shadow: 0 0 60px rgba(255, 255, 255, 0.7);
  }
  button {
      width: 15vw;
      margin-left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
    }
`;

const Tabs = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;

  #generate {
    border-left: thick solid #cf7963;
    border-radius: 15px 0 0 0;
  }
  #issues {
    border-right: thick solid #cf7963;
    border-radius: 0 15px 0 0;
  }
`;

const NavButton = styled.button`
    background-color: #cf7963;
    border: none;
    color: #0c4727;
    font-weight: 600;
    font-size: 0.5em;
    margin: 0;
    padding: 25px;
    transform: translateY(40px);
    border-top: thick solid #cf7963;

    :hover {
      background-color: #db907d;
      color: #3f703e;
      box-shadow: inset 0 0 3px #595044;
    }
`;

const SelectedNav = styled.button`
  background-color: #b5614c;
  border: none;
  color: gold;
  font-weight: 600;
  font-size: 0.5em;
  margin: 0;
  padding: 25px;
  border-top: thick solid #cf7963;
  transform: translateY(40px);
  box-shadow: inset 0 0 3px #595044;
  :hover {
    cursor: default;
  }
`;

function App() {
  const [currentView, setCurrentView] = useState(<ConditionReportForm />);
  const [selectGenerate, setSelectGenerate] = useState(false);
  const [selectReport, setSelectReport] = useState(true);
  const [selectIssues, setSelectIssues] = useState(false);

  const toggleView = (e) => {
    e.preventDefault();
    if (e.target.id === 'generate') {
      setCurrentView(<ParkGenerator />);
      setSelectGenerate(true);
      setSelectReport(false);
      setSelectIssues(false);
    }
    if (e.target.id === 'report') {
      setCurrentView(<ConditionReportForm />);
      setSelectGenerate(false);
      setSelectReport(true);
      setSelectIssues(false);
    }
    if (e.target.id === 'issues') {
      setCurrentView(<ReportViewer />);
      setSelectGenerate(false);
      setSelectReport(false);
      setSelectIssues(true);
    }
  };

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <header className="App-header">
          Park Tracker
          <Tabs>
            {selectGenerate
              ? <SelectedNav id="generate">Park Generator</SelectedNav>
              : <NavButton type="button" id="generate" onClick={toggleView}>Park Generator</NavButton>}
            {selectReport
              ? <SelectedNav>Report an Issue</SelectedNav>
              : <NavButton type="button" id="report" onClick={toggleView}>Report an Issue</NavButton>}
            {selectIssues
              ? <SelectedNav id="issues">View Issues</SelectedNav>
              : <NavButton type="button" id="issues" onClick={toggleView}>View Issues</NavButton>}
          </Tabs>
        </header>
        {currentView}
      </div>
    </>
  );
}

export default App;
