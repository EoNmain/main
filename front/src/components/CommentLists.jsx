import React, {useState} from 'react';
import Comment from './Comment';

function CommentLists({commentLists, editComment}){
    const [selectedCommentIndex, setSelectedCommentIndex] = useState(0);

    return(
        <ul className="list-cmt">
            {commentLists.map(comment => {
                const commentId = comment.id;
                return(
                    <Comment
                        key={commentId}
                        comment={comment}
                        isEditing={selectedCommentIndex == commentId ? true : false}
                        setSelectedCommentIndex={setSelectedCommentIndex}
                        editComment={editComment}
                        />
                );
            })}
        </ul>
    );
}

export default CommentLists;