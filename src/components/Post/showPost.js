import "./ShowPost.css";
import image from "../../ahmad.jpg";
import { useContext, useEffect, useState } from "react";
import allData from "../context/context";
import axios from "axios";
import Comment from "./comment/comment";
import ShowComment from "./comment/ShowComment";
import EditPost from "./EditPost";

function ShowPost({ post, id }) {
  const [showComment, setShowComment] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [username, setUsername] = useState();
  const [name, setname] = useState();

  const { HandelDeletePosts, getuserID } = useContext(allData);
  const handelShowComment = () => {
    setShowComment(!showComment);
    console.log("showComment:", showComment);
  };
  const handelShowEdit = () => {
    setShowEdit(!showEdit);
    console.log("showEdit:", showEdit);
  };

  // To delete post form array of post inside server
  const deletePost = () => {
    axios.delete(`http://localhost:5001/Posts/${id}`).then((response) => {
      console.log("Post deleted successfully!");
      console.log("Auth", response.data);
      HandelDeletePosts(id);
    });
  };

  // get current username

  useEffect(() => {
    author();
    getCurrentUser();
  }, []);

  const author = () => {
    axios.get(`http://localhost:5001/Posts/${post.id}`).then((response) => {
      console.log("Auth = ", response.data.Author);
      setUsername(response.data.Author);
    });
  };

  const getCurrentUser = () => {
    axios.get(`http://localhost:5001/users/${getuserID()}`).then((response) => {
      console.log("name = ", response.data.name);
      setname(response.data.name);
    });
  };

  const time = new Date();
  return (
    <>
      {Object.keys(post).length === 0 ? null : (
        <div className="cardo ui card">
          <div className="content" id="time-name">
            <div className="user-image">
              <img className="ui avatar image" src={image} alt="" />
              <span>{username}</span>
              <div>
                {time.getHours()}:{time.getMinutes()}
              </div>
            </div>
          </div>
          <div className="content">
            <div>{post.content}</div>
            <span className="right floated">
              <i
                id="delete"
                className="fa fa-trash"
                aria-hidden="true"
                onClick={() => {
                  if (username === name) {
                    deletePost();
                  }
                }}
              ></i>
              <i className="heart outline like icon"></i>
              <i
                className="fas fa-edit"
                onClick={handelShowEdit}
                style={{ color: "#000000" }}
              ></i>
              {showEdit ? <EditPost /> : null}
            </span>
            <i className="comment icon" onClick={handelShowComment}></i>
          </div>
          <div className="extra content">
            <div className="ui large transparent left icon input" />
            {showComment ? (
              <>
                <Comment postId = {id}/>
                <ShowComment postId = {id}/>
              </>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default ShowPost;
