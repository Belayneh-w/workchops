import React, { useState, useRef, useEffect } from 'react'
import './App.scss'
import avatar from './images/bozai.png'
import classNames from 'classnames'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

//Tasks:
// Display comments,
// delete comments, 
//displsy and highlt tabs,
// implement sorting of comments 

// Comment List data

// current logged in user info
// const user = {
//   // userid
//   uid: "30009257",
//   // profile
//   avatar,
//   // username
//   uname: "John",
// };
//
// current logged in user info
const user = {
  // userid
  uid: "13258165",
  // profile
  avatar,
  // username
  uname: "Jay Zhou",
};




// Nav Tab
const tabs = [
  { type: 'hot', text: 'Top' },
  { type: 'newest', text: 'Newest' },
]


interface Comment{
    rpid: number | string,
    user: {
      uid: string,
      avatar: string,
      uname: string,
    },
    content: string,
    ctime:string,
    like: number,

  }
const App = () => {
  const [commentList, setCommentList] = useState<Comment[]>([])
  ;
  const [activeType, setActiveType]= useState('hot')
   const [totalComments, setTotalComment] = useState(2);
  const textareaRef = useRef<HTMLTextAreaElement>(null)


  useEffect(()=>{
    async function getDefaultList(){
const response = await fetch("http://localhost:3004/list");
const data =await response.json()
setCommentList(data)
    }
    getDefaultList()

  },[])

  const deleteComment = (rpid:number | string)=>{
setCommentList(commentList.filter((item) => item.rpid !== rpid))
 setTotalComment(totalComments - 1);
  }


const changeActiveType = (type:string)=>{
  setActiveType(type)
  if(type==='hot'){
setCommentList(_.orderBy(commentList, 'like', 'desc'));
  }else{
    setCommentList(_.orderBy(commentList, 'ctime', 'desc'))
  }
  
}

const makePost = () => {
 
  const newComment = {
    rpid: uuidv4(),
    user,
    content: textareaRef.current!.value,
    ctime: dayjs(Date.now()).format('MM DD HH:mm'),
    like: 0,
  };
  setCommentList([...commentList, newComment])
  textareaRef.current!.value = '';
  textareaRef.current!.focus()
   setTotalComment(totalComments + 1);
}
  return (
    <div className="app">
      {/* Nav Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Comments</span>
            {/* Like */}
            <span className="total-reply">{totalComments}</span>
          </li>
          <li className="nav-sort">
            {/* highlight class name： active */}
            {tabs.map((tab) => (
              <span
                key={tab.type}
                className={classNames("nav-item", {
                  active: tab.type === activeType,
                })}
                // className={`nav-item ${tab.type === activeType && "active"}`}
                // className={`nav-item ${tab.type === activeType?"active" : ''}`}
                onClick={() => changeActiveType(tab.type)}
              >
                {tab.text}
              </span>
            ))}
            {/* 
            <span className="nav-item">Newest</span> */}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* comments */}
        <div className="box-normal">
          {/* current logged in user profile */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="Profile" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* comment */}
            <textarea
              ref={textareaRef}
              className="reply-box-textarea"
              placeholder="tell something..."
            />
            {/* post button */}
            <div className="reply-box-send" onClick={makePost}>
              <div className="send-text">post</div>
            </div>
          </div>
        </div>
        {/* comment list */}
        <div className="reply-list">
          {/* comment item */}
          {commentList.map((item) =>  <Item item={item} onDeleteComment = {deleteComment}/>
          )}
        </div>
      </div>
    </div>
  );
}


type ItemProps = {
  item: Comment;
  onDeleteComment:(rpid:number |string)=>void;
};
function Item (props:ItemProps){
  const { item, onDeleteComment } = props;
  return (
    <div className="reply-item" key={item.rpid}>
      {/* profile */}
      <div className="root-reply-avatar">
        <div className="bili-avatar">
          <img className="bili-avatar-img" alt="" />
        </div>
      </div>

      <div className="content-wrap">
        {/* username */}
        <div className="user-info">
          <div className="user-name">{item.user.uname}</div>
        </div>
        {/* comment content */}
        <div className="root-reply">
          <span className="reply-content">{item.content}</span>
          <div className="reply-info">
            {/* comment created time */}
            <span className="reply-time">{item.ctime}</span>
            {/* total likes */}
            <span className="reply-time">Like:{item.like}</span>

            {item.user.uid === user.uid && (
              <span
                className="delete-btn"
                onClick={() => onDeleteComment(item.rpid)}
              >
                Delete
              </span>
            )}
            {/* same as */}
            {/* {item.user.uid===user.uid?(
                      <span className="delete-btn">Delete</span>
                    ): ''} */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App