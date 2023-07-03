import { useContext, useEffect, useState } from "react";
import allData from "../../context/context";
import axios from "axios";

function Comment({ postId }) {
  const [comment, setComment] = useState({
    user: "",
    content: "",
  });

  const [getpost, setGetPost] = useState({ comment: [] });

  const { HandelAddComment, currentUser } = useContext(allData);

  const handleCommentChange = (event) => {
    setComment({ ...comment, content: event.target.value });
  };

  useEffect(() => {
    getAllpost();
  }, []);

  const getAllpost = () => {
    axios.get(`http://localhost:5001/posts/${postId}`).then((response) => {
      setGetPost(response.data);
    });
  };

  const postComment = () => {
    const updatedComment = [...getpost.comment, comment];

    axios
      .put(`http://localhost:5001/posts/${postId}`, {
        ...getpost,
        comment: updatedComment,
      })
      .then((response) => {
        console.log("Comment added successfully!");
        setComment({ ...comment, content: "" }); // Clear the comment input field
        setGetPost(response.data); // Update the getpost state with the updated post
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    HandelAddComment(comment);
    postComment();
  };

  return (
    <div className="comment">
      <form id="form" onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Add new comment"
          value={comment.content}
          onChange={handleCommentChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Comment;
