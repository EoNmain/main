import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useTable } from "react-table";
import Table from "react-bootstrap/Table";
import BoardListNav from "./BoardListNav";

export default function Board() {
  // 데이터 상태 초기화 및 더미 데이터 채우기
  const [data] = useState([
    { id: 1, title: "First Post", author: "John Doe", date: "2024-02-07" },
    { id: 2, title: "Second Post", author: "Jane Smith", date: "2024-02-06" },
    // 추가적인 더미 데이터를 필요에 따라 채워넣을 수 있습니다.
  ]);

  useEffect(() => {
    async function getData() {
      try {
        const url = 'http://localhost:3000/post';
        const response = await axios.get(
          url
          );
        setPostData(response.data); // 데이터베이스에서 받은 데이터로 상태 업데이트
      } catch (error) {
        console.error('Post data failed', error);
      }
    }
    getData();
  }, []);

  const columns = useMemo(
    () => [
      { Header: "글 순서", accessor: "pid" },
      { Header: "제목", accessor: "title" }, // 글 제목 변경
      { Header: "작성자", accessor: "writer" }, // 올린 사람 변경
      { Header: "생성 날짜", accessor: "createdDate" }, // 올린 날짜 변경
    ],
    []
  );

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div style={{ display: "flex" }}>
      <div class="text-semiTitle" style={{ flex: 1 }}>
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
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
