import { useContext, useEffect, useState, getuserID } from "react";
import allData from "../../context/context";
import axios from "axios";
import "./comment.css";
function Comment({ postId }) {
  const [comment, setComment] = useState({
    user: "",
    content: "",
  });

  // const [getpost, setGetPost] = useState({ comment: [] });
  const [username, setUsername] = useState("");
  const { commentArray, setCommentArray, getuserID } = useContext(allData);

  const name = async () => {
    const response = await axios.get(
      `http://localhost:5001/users/${getuserID()}`
    );
    console.log("name = ", response.data.name);
    setUsername(response.data.name);
  };

  useEffect(() => {}, []);

  console.log(username);
  const handleCommentChange = (event) => {
    setComment({
      ...comment,
      user: username,
      content: event.target.value,
      postId: postId,
    });
  };

  const HandleAddComment = async () => {
    const response = await axios.patch(
      `http://localhost:5001/posts/${postId}`,
      {
        comment: [...commentArray, comment],
      }
    );
    console.log(response.data);
    setCommentArray(response.data.comment);
  };
  console.log(commentArray);

  const handleCommentSubmit = (event) => {
    console.log(comment);
  };

  return (
    <div className="comment">
      <input
        onChange={handleCommentChange}
        id="comment-field"
        placeholder="Add your comment"
      />
      <i
        class="fa-solid fa-square-plus fa-xl"
        onClick={() => {
          name();
          HandleAddComment();
        }}
      ></i>
    </div>
  );
}
export default Comment;
