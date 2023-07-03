import "./comment.css";
import { useContext, useState } from "react";
import allData from "../../context/context";
import axios from "axios";
function Comment() {
  const [comment, setcomment] = useState({
    user: "",
    content: "",
  });

  // This function use to add new Comment
  const { HandelAddComment, curentUser } = useContext(allData);

  // put data inside posts array

  // const postComment = () => {
  //   axios
  //     .put(`http://localhost:5001/users/${getuserID()}`,
  //     {
  //       comments : [...curentUser.comments,{user:"",content: comment}]
  //     })
  //     .then((response) => {});
  // };

  // This for get data form input field
  const handelComment = (event) => {
    setcomment({ ...comment, user: curentUser, content: event.target.value });
  };

  return (
    <div className="comment">
      <input
        type="text"
        placeholder="Add new Comment"
        onChange={handelComment}
      />
      <button
        onClick={() => {
          HandelAddComment(comment);
        }}
      >
        Add
      </button>
    </div>


  );
}
export default Comment;
