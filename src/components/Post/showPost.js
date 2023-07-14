import "./ShowPost.css";
import image from "../../ahmad.jpg";
import { useContext, useEffect, useState } from "react";
import allData from "../context/context";
import axios from "axios";
import Comment from "./comment/comment";
import ShowComment from "./comment/ShowComment";
import EditPost from "./EditPost";
import Swal from "sweetalert2";

function ShowPost({ post }) {
  const [showComment, setShowComment] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [username, setUsername] = useState();
  const [name, setname] = useState();

  const { getuserID, Posts, setpost } = useContext(allData);
  const handelShowComment = () => {
    setShowComment(!showComment);
    console.log("showComment:", showComment);
  };
  const handelShowEdit = () => {
    setShowEdit(!showEdit);
  };

  // get current username
  useEffect(() => {
    author();
    getCurrentUser();
  }, []);

  const author = () => {
    axios.get(`http://localhost:5001/Posts/${post.id}`).then((response) => {
      // console.log("Auth = ", response.data.Author);
      setUsername(response.data.Author);
    });
  };

  const getCurrentUser = () => {
    axios.get(`http://localhost:5001/users/${getuserID()}`).then((response) => {
      // console.log("name = ", response.data.name);
      setname(response.data.name);
    });
  };

  const HandleDeletePost = (id) => {
    const response = axios.delete(`http://localhost:5001/posts/${post.id}`);

    const updatePost = Posts.filter((element) => {
      return id !== element.id;
    });
    setpost(updatePost);
  };

  console.log(post);
  return (
    <>
      <div className="PostContainer">
        <div className="user-image">
          <img src={image} alt="" id="post-image" />
          <span>{username}</span>
        </div>
        <div className="post-content">
          {post.content}
          <div className="icons">
            <i
              class="fa fa-trash"
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    HandleDeletePost(post.id);
                    Swal.fire(
                      "Deleted!",
                      "Your file has been deleted.",
                      "success"
                    );
                  }
                });
              }}
              aria-hidden="true"
            ></i>
            <i class="fas fa-edit" onClick={handelShowEdit}></i>
            <i></i>
          </div>
        </div>
        <div id="edit">{showEdit && <EditPost post={post} />}</div>
        <h1>Comments:</h1>
        <ShowComment postId={post.id} />
        <Comment postId={post.id} />
      </div>
    </>
  );
}

export default ShowPost;
