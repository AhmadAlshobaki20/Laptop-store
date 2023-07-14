import { useContext, useEffect, useState } from "react";
import allData from "../../context/context";
import axios from "axios";
import avatar from "../../../assets/matthew.png";

function ShowComment({ postId }) {
  const { getuserID, commentArray, setCommentArray } = useContext(allData);
  const [name, setName] = useState("")

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const response = await axios.get(`http://localhost:5001/posts/${postId}`);
    setCommentArray(response.data.comment);
  };


  const comments = commentArray.map((comment) => {
    if (postId === comment.postId) {
      return (
        <>
          <div className="commentContainer" key={comment.id}>
            <div className="imageAndUser">
              <img src={avatar} alt=".." id="user-comment" />
              <span id="username">{comment.user}</span>
            </div>
            <div>{comment.content}</div>
          </div>
        </>
      );
    }
  });

  return <div>{comments}</div>;
}

export default ShowComment;
