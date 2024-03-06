/* BoardList.js */
import React from 'react';
import Layout from '../../layout/Layout';
import BoarderListLayout from '../../components/Board/BoardListLayout'
import BoardListNav from '../../components/Board/BoardListNav'
import BoardListNavTabs from '../../components/Board/BoardListNavTabs';
import BoardListPageNum from '../../components/Board/BoardListPageNum';
function BoardList(){
  return(

    <Layout>
    <BoarderListLayout/>
    
    <BoardListNavTabs />
  
    {/* <BoardListNav /> */}
    
    <BoardListPageNum />
    
  

    </Layout>
  )
}

export default BoardList;
