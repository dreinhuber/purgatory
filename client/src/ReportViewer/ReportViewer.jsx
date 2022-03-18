import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const IssuesViewer = styled.table`
  color: #c1e9d5;
  background-color: #174f3b;
  border-radius: 15px;
  box-shadow: -3px 3px #cf7963;
  border: thick solid #b5614c;
  margin-left: 50%;
  margin-top: 3vh;
  margin-bottom: 3vh;
  max-height: 60vh;
  overflow: scroll;
  position: relative;
  transform: translateX(-50%);
  width: 60vw;
  padding: 4vh;

  th {
    font-family: 'Oxanium', sans-serif;
    font-size: 1.5vw;
    color: white;
  }

  td {
    background-color: #cec8b1ac;
    color: #0d4d29;
    font-size: 1vw;
    padding: 0.5vw;
  }

`;

const formatAndStoreIssues = (trails, setIssues) => {
  console.log(trails);
  const formattedIssues = trails.map((trail) => {
    const formattedIssue = {
      park: trail.park,
      trail: trail.name,
    };
    trail.issues.forEach(({
      date,
      marker,
      description,
      summary,
      photos,
      _id,
    }) => {
      formattedIssue.date = date;
      formattedIssue.marker = marker;
      formattedIssue.description = description;
      formattedIssue.summary = summary;
      formattedIssue.photos = photos;
      formattedIssue.id = _id;
    });
    return formattedIssue;
  });

  setIssues(formattedIssues);
};

function ReportViewer() {
  const [issues, setIssues] = useState([]);

  const getAllIssues = () => {
    axios.get('/parks/issues')
      .then(({ data }) => {
        formatAndStoreIssues(data, setIssues);
      });
  };

  const deleteIssue = (e) => {
    e.preventDefault();
    const issue = issues.filter((where) => (where.id === e.target.value));
    axios.post('/parks/issues/delete', {
      data: issue[0],
    });
  };

  useEffect(() => { getAllIssues(); }, []);

  return (
    <IssuesViewer>
      <thead>
        <tr>
          <th>Date</th>
          <th>Park</th>
          <th>Trail</th>
          <th>Marker</th>
          <th>Summary</th>
          <th>Description</th>
        </tr>
        {issues.map((issue) => (
          <tr className="issue">
            <td>{issue.date.substring(0, 9)}</td>
            <td>{issue.park}</td>
            <td>{issue.trail}</td>
            <td>{issue.marker}</td>
            <td>{issue.summary}</td>
            <td>{issue.description}</td>
          </tr>
        ))}
      </thead>
    </IssuesViewer>
  );
}

export default ReportViewer;

/*
<td>
  <button
    type="button"
    value={issue.id}
    onClick={deleteIssue}
  >
    Done
  </button>
</td>
*/
