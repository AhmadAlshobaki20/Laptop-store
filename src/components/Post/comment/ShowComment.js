import { useContext, useEffect, useState } from "react";
import allData from "../../context/context";
import axios from "axios";

function ShowComment({ postId }) {
  const { currentUser } = useContext(allData);
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    getPostComments();
  }, []);

  const getPostComments = () => {
    axios.get(`http://localhost:5001/Posts/${postId}`).then((response) => {
      setPostComments(response.data.comment);
    });
  };

  const comments = postComments.map((comment, index) => {
    return (
      <div key={index}>
        <div>User: {comment.user}</div>
        <div>Content: {comment.content}</div>
      </div>
    );
  });

  return (
    <div>
      <h2>Comments:</h2>
      <div>User:{currentUser}</div>
      {comments}
    </div>
  );
}

export default ShowComment;
