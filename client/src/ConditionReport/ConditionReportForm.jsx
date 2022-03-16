/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ModuleStyle } from '../styles';
import SearchParks from './SearchParks';
import ReportDetails from './ReportDetails';

const ConditionForm = styled.div`
  ${ModuleStyle}
`;

function ConditionReportForm() {
  const [parkExists, setParkExists] = useState(false);
  const [currentPark, setCurrentPark] = useState({});
  const [issueObject, setIssueObject] = useState({});

  const submitIssue = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/parks/issues', {
      data: issueObject,
    });
  };

  return (
    <ConditionForm>
      <form>
        <SearchParks
          setParkExists={setParkExists}
          setCurrentPark={setCurrentPark}
        />
        {parkExists
          ? (
            <ReportDetails
              currentPark={currentPark}
              setIssueObject={setIssueObject}
              onSubmit={submitIssue}
            />
          ) : null}
      </form>
    </ConditionForm>
  );
}

export default ConditionReportForm;
