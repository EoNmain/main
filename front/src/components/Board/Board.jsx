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
      { Header: '제목', accessor: 'title' },      
      { Header: '작성자', accessor: 'writer' },
      { Header: '등록일', accessor: 'createdDate' },
      { Header: '조회수', accessor: 'views' }, // 임시 필드
      // { Header: '글 내용', accessor: 'content' },
      { Header: '사용자 id', accessor: 'uid' },
      { Header: '변경 날짜', accessor: 'editDate' },
      { Header: '추천수', accessor: 'recommand' },
      // { Header: 'assignment', accessor: 'type' },
      // { Header: '글 순서', accessor: 'file' },
      // { Header: '글 순서', accessor: 'picture' },
      // { Header: '글 순서', accessor: 'check' },
      
      
    ],
    []
  );
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

    return (
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <BoardListNav />
        </div>
        <div style={{ flex: 4, position: 'relative' }}>
          <Table striped {...getTableProps()} style={{ width: '100%' }}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} style={{
                      minWidth: column.id === 'title' ? '300px' : undefined,
                      color: column.id === 'uid' || column.id === 'editDate' ? '#ccc' : 'white'
                    }}>
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
                      <td {...cell.getCellProps()} style={{
                        color: cell.column.id === 'uid' || cell.column.id === 'editDate' ? '#ccc' : 'white'
                      }}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table> 
          <div
            style={{
              position: 'absolute',
              right: '10px',
              bottom: '10px',
              backgroundColor: 'skyblue',
              border: '1px solid white',
              padding: '10px 20px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            <Link
              to="/boardlist/write"
              style={{
                color: 'white',
                textDecoration: 'none'
              }}
            >
              글 작성 <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <div style={{ height: '900px' }}></div>
      </div>
    );
    
}
