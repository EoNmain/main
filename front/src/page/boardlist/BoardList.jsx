/* BoardList.js */
import React from 'react';
import Layout from '../../layout/Layout';
import BoarderListLayout from '../../components/Board/BoardListLayout'
import BoardListNavTabs from '../../components/Board/BoardListNavTabs';
import BoardListPageNum from '../../components/Board/BoardListPageNum';
import Pagination from '../../components/Board/Pagination';
function BoardList(){
  return(

    <Layout>
    <BoarderListLayout/>
    
    <BoardListNavTabs />
    
    {/* <BoardListPageNum /> */}
    <Pagination/>
    
  

    </Layout>
  )
}

export default BoardList;
