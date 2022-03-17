import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const IssuesViewer = styled.table`
  color: #c1e9d5;
  background-color: #0c4727;
  border-radius: 15px;
  box-shadow: -5px 5px darkgreen;
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
    font-size: 2vw;
    color: white;
  }

  td {
    background-color: #cec8b1ac;
    color: #0d4d29;
    font-size: 1.75vw;
    padding: 1vw;
  }

`;

const formatAndStoreIssues = (trails, setIssues) => {
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
    }) => {
      formattedIssue.date = date;
      formattedIssue.marker = marker;
      formattedIssue.description = description;
      formattedIssue.summary = summary;
      formattedIssue.photos = photos;
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
