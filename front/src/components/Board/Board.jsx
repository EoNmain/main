import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import Table from 'react-bootstrap/Table';
import BoardListNav from './BoardListNav';
import { Link } from 'react-router-dom'; // Link 컴포넌트 임포트

export default function Board() {
  // 데이터 상태 및 상태 업데이트 함수 정의
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const url = 'http://localhost:3000/post';
        const response = await axios.get(url);
        setData(response.data.data); // 데이터베이스에서 받은 데이터로 상태 업데이트
      } catch (error) {
        console.error('Post data failed', error);
      }
    }
    getData();
  }, []);

  const columns = useMemo(
    () => [
      { Header: '글 순서', accessor: 'pid' },
      { Header: '사용자 id', accessor: 'uid' },
      { Header: '제목', accessor: 'title' },
      { Header: '작성자', accessor: 'writer' },
      // { Header: '글 내용', accessor: 'content' },
      { Header: '변경 날짜', accessor: 'editDate' },
      { Header: '추천수', accessor: 'recommand' },
      { Header: 'assignment', accessor: 'type' },
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
      <div className="text-semiTitle" style={{ flex: 1 }}>
        <BoardListNav />
      </div>
      <div style={{ flex: 4, position: 'relative' }}>
        <div style={{ height: '100px' }}></div>
        <Table striped className="text-semiTitle" {...getTableProps()}>
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
                    // 'title' 열에만 링크를 적용
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
        <div
          className="hidden lg:flex lg:flex-1 lg:justify-end"
          style={{
            position: 'absolute',
            left: '0',
            bottom: '0',
            marginBottom: '-9px',
            marginLeft: '10px',
          }}
        >
          <Link
            to="/boardlist/write"
            className="text-sm font-semibold leading-6 text-semiTitle"
          >
            글 작성 <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
      <div style={{ height: '900px' }}></div>
    </div>
  );
}
