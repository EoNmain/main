//BoardListNavTabs.jsx
import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Board from './Board';
import axios from 'axios';

export default function BoardListNavTabs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/post');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3 bg-backDark text-white"
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Tab
        eventKey="기본 게시판"
        title="기본 게시판"
        style={{ textAlign: 'center' }}
      >
        <Board type="default" />
      </Tab>
      <Tab
        eventKey="과제 게시판"
        title="과제 게시판"
        style={{ textAlign: 'center' }}
      >
        <Board type="assignment" />
      </Tab>
      <Tab
        eventKey="모집해요~"
        title="모집해요"
        style={{ textAlign: 'center' }}
      >
        <Board type="recruitment" />
      </Tab>
    </Tabs>
  );
}
