import React, {useState} from 'react';
import CommentLists from './CommentLists';

export default function WrapComments({comments}) {
    const [input, setInput] = useState(comments)
  
    const editComment = (commentId, editValue) => {
      let newCommentLists = CommentLists.map(item=>{
        if(item.id === commentId){
          item.content = editValue;
        }
        return item;
      })
    };
    
    return (
      <>
        <ul className="list-cmt">
          {commentLists.map(comment => {
            const commentId = comment.id;
            return (
              <Comment
                key={commentId}
                comment={comment}
              />
            );
          })}
        </ul>
            
        <div className="box-inp-cmt">
          <input
            type="text"
            placeholder="댓글 달기..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => (e.key === 'Enter' ? addComment() : null)}
            />
          <button className="btn-submit" disabled="" onClick={addComment}>
              게시
          </button>
        </div>
      </>
    )
  }