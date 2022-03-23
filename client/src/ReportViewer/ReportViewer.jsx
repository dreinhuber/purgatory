/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo, useState, useEffect } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import axios from 'axios';
import styled from 'styled-components';
import Table from './Table';

const ImageViewer = styled.button`
  border: none;
  width: fit-content;
  height: fit-content;
  padding: 0;
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
  const [imageSize, setImageSize] = useState(50);

  const toggleImageSize = (e) => {
    e.preventDefault();
    const newSize = (imageSize === 50 ? 500 : 50);
    setImageSize(newSize);
  };

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

  useEffect(() => {
    getAllIssues();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Location',
        columns: [
          {
            Header: 'Park',
            accessor: 'park',
          },
          {
            Header: 'Trail',
            accessor: 'trail',
          },
        ],
      },
      {
        Header: 'Issue Details',
        columns: [
          {
            Header: 'Date',
            accessor: 'date',
            Cell: ({ cell: { value } }) => value.substring(0, 10),
          },
          {
            Header: 'Summary',
            accessor: 'summary',
          },
          {
            Header: 'Description',
            accessor: 'description',
          },
        ],
      },
    ],
    [],
  );

  if (issues.length) {
    return (
      <div>
        <Table columns={columns} issues={issues} />
        {/* <CloudinaryContext cloudName="trailreports">
          <ImageViewer onClick={toggleImageSize}>
            <Image publicId="sample" width={imageSize} />
          </ImageViewer>
        </CloudinaryContext> */}
      </div>
    );
  }

  return (
    <div />
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

/*
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
          <CloudinaryContext cloudName="trailreports">
            <ImageViewer onClick={toggleImageSize}>
              <Image publicId="sample" width={imageSize} />
            </ImageViewer>
          </CloudinaryContext>
        </tr>
      ))}
    </thead>
  </IssuesViewer>
);
*/
