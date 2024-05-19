//Board/jsx
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import Table from 'react-bootstrap/Table';
import BoardListNav from './BoardListNav';
import { Link } from 'react-router-dom'; // Link 컴포넌트 임포트

export default function Board({ type }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const url = 'http://localhost:3000/post';
        const response = await axios.get(url);
        // 서버로부터 받은 데이터를 필터링하고, 필터링된 데이터에 대해 순서 재정의
        const filteredData = response.data.data
          .filter((item) => item.type === type)
          .map((item, index) => ({ ...item, displayOrder: index + 1 }));
        setData(filteredData); // 필터링 및 순서가 재정의된 데이터로 상태 업데이트
      } catch (error) {
        console.error('Post data failed', error);
      }
    }
    getData();
  }, [type]);

  const columns = useMemo(
    () => [
      { Header: '글 순서', accessor: 'displayOrder' },
      { Header: '사용자 id', accessor: 'uid' },
      { Header: '제목', accessor: 'title' },
      { Header: '작성자', accessor: 'writer' },
      // { Header: '글 내용', accessor: 'content' },
      { Header: '변경 날짜', accessor: 'editDate' },
      { Header: '추천수', accessor: 'recommand' },
      // { Header: 'assignment', accessor: 'type' },
      // { Header: '글 순서', accessor: 'file' },
      // { Header: '글 순서', accessor: 'picture' },
      // { Header: '글 순서', accessor: 'check' },
      { Header: '생성 날짜', accessor: 'createdDate' },
    ],
    []
  );
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div style={{ display: 'flex' }}>
      <div className="text-stone-100" style={{ flex: 1 }}>
        <BoardListNav />
      </div>
      <div style={{ flex: 4, position: 'relative' }}>
        <Table striped className="text-stone-100" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
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
                  {row.cells.map((cell) => {
                    return cell.column.id === 'title' ? (
                      <td {...cell.getCellProps()}>
                        <Link to={`/boardlist/board/${row.original.pid}`}>
                          {cell.render('Cell')}
                        </Link>
                      </td>
                    ) : (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Link
          to="/boardlist/write"
          className="absolute bottom-10 right-10 bg-skyblue text-white font-semibold py-2 px-4 rounded shadow"
          style={{ textDecoration: 'none' }}
        >
          글 작성 <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      <div style={{ height: '900px' }}></div>
    </div>
  );
}
