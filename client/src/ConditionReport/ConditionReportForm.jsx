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
  const [issuePosted, setIssuePosted] = useState(false);
  const [currentPark, setCurrentPark] = useState({});
  const [issueObject, setIssueObject] = useState({});

  const submitIssue = (e) => {
    e.preventDefault();
    axios.post('/parks/issues', {
      data: issueObject,
    })
      .then(() => {
        setIssuePosted(true);
        alert('Issue posted, thank you for using this service!');
      });
  };

  if (issuePosted) {
    return (
      <ConditionReportForm>
        <form>
          <h2>Thank you for posting your issue</h2>
        </form>
      </ConditionReportForm>
    )
  }

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
