/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { useTable, useSortBy } from 'react-table';
import PropTypes from 'prop-types';

const IssuesViewer = styled.table`
  color: #c1e9d5;
  background-color: #325c4b;
  border-radius: 15px;
  box-shadow: -3px 3px #cf7963;
  border: thick solid #b5614c;
  display: block;
  margin-left: 50%;
  margin-top: 3vh;
  margin-bottom: 3vh;
  max-height: 70vh;
  overflow: scroll;
  position: relative;
  transform: translateX(-50%);
  width: 70vw;
  padding: 4vh;

  th {
    font-family: 'Oxanium', sans-serif;
    font-size: 2vw;
    color: white;
    border-bottom: thick solid rgb(200, 100, 100);
  }

  td {
    background-color: #cec8b1ac;
    color: #0d4d29;
    font-size: 1.5vw;
    padding: 0.5vw;
  }

  .sort-asc {
    color: #cec8b1e8;
    text-shadow: 0 -2px coral;
    border-bottom: thick solid coral;
  }

  .sort-desc {
    color: #cec8b1ac;
    text-shadow: 0 3px brown;
    border-bottom: thick solid brown;
  }

`;

function Table({ columns, issues }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: issues,
    },
    useSortBy,
  );

  return (
    <IssuesViewer {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(
                  column.getSortByToggleProps(),
                )}
                className={
                  column.isSorted
                    ? column.isSortedDesc
                      ? 'sort-desc'
                      : 'sort-asc'
                    : ''
                }
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </IssuesViewer>
  );
}

Table.propTypes = {
  columns: PropTypes.any.isRequired,
  issues: PropTypes.array.isRequired,
};

export default Table;
