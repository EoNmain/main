import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useTable } from "react-table";
import Table from "react-bootstrap/Table";
import BoardListNav from "./BoardListNav";

export default function Board() {
  // 데이터 상태 및 상태 업데이트 함수 정의
  const [data, setData] = useState([
    { id: 1, title: "First Post", author: "John Doe", date: "2024-02-07" },
    { id: 2, title: "Second Post", author: "Jane Smith", date: "2024-02-06" },
  ]);

  useEffect(() => {
    async function getData() {
      try {
        const url = 'http://localhost:3000/post';
        const response = await axios.get(url);
        setData(response.data); // 데이터베이스에서 받은 데이터로 상태 업데이트
      } catch (error) {
        console.error('Post data failed', error);
      }
    }
    getData();
  }, []);

  const columns = useMemo(
    () => [
      { Header: "글 순서", accessor: "pid" },
      { Header: "제목", accessor: "title" },
      { Header: "작성자", accessor: "writer" },
      { Header: "생성 날짜", accessor: "createdDate" },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div style={{ display: "flex" }}>
      <div className="text-semiTitle" style={{ flex: 1 }}>
        <BoardListNav />
      </div>
      <div style={{ flex: 4, position: "relative" }}>
        <div style={{ height: "100px" }}></div>
        <Table striped className="text-semiTitle" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
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
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div
          className="hidden lg:flex lg:flex-1 lg:justify-end"
          style={{
            position: "absolute",
            left: "0",
            bottom: "0",
            marginBottom: "-9px",
            marginLeft: "10px",
          }}
        >
          <a
            href="/boardlist/write"
            className="text-sm font-semibold leading-6 text-semiTitle"
          >
            글 작성 <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
      <div style={{ height: "900px" }}></div>
    </div>
  );
}
