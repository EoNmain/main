import React, {useState} from 'react';

export default function Comment({
    comment: {id, username, content},
    isEditing,
    setSelectedCommentIndex,
    editComment,
}) {
    const[editValue, setEditValue] = useState(content);

    const handleEditInput = () => {
        editComment(id, editValue);
        setSelectedCommentIndex(0);
    };

    const editInput = (
        <input
            type="text"
            value={editValue}
            onChange={e=>setEditValue(e.target.value)}
            onKeyDown={e=>(e.key === 'Enter' ? handleEditInput():null)}    
        />
    );

    return(
        <li id={id}>
            <span className="wrap-cmt">
                <span className="cmt-user">{username}</span>
                {isEditing ? editInput : <span className="cmt-cont">{content}</span>}
            </span>
            <span className="wrap-btn">
                <button
                    className="btn-edit"
                    onClick={isEditing ? handleEditInput():setSelectedCommentIndex(id)}>
                        <i className="fa fa-solid fa-pencil"/>
                    </button>
            </span>
        </li>
    );
}