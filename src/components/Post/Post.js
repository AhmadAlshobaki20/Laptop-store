import { useEffect, useState } from "react";
import "./Post.css";
import allData from "../context/context";
import { useContext } from "react";
import axios from "axios";

function Post() {
  const [username, setusername] = useState("");
  const { getuserID, curentUser, Posts, setpost, setCurrentUser } =
    useContext(allData);
  const [post, setPost] = useState({
    content: "",
    Author: "",
    comment:[]
  });

  const name = () => {
    axios.get(`http://localhost:5001/users/${getuserID()}`).then((response) => {
      console.log("name:", response.data.name);
      setusername(response.data.name);
    });
  };

  useEffect(() => {
    name();
  }, []);

  const HandlePostbox = (event) => {
    const value = event.target.value;
    setPost({ ...post, content: value, Author: username, comment:[]});
  };

  const addPostToUser = (user, newPost) => {
    // Copy the user object to avoid mutating the original object
    const updatedUser = { ...user };

    // Initialize the posts array if it doesn't exist
    updatedUser.posts = updatedUser.posts || [];

    // Add the new post to the posts array
    updatedUser.posts.push(newPost);

    // Return the updated user object
    return updatedUser;
  };

  const postPosts = () => {
    const time = new Date();
    const newPost = { content: post.content, time: time };

    // Update the user object with the new post
    const updatedUser = addPostToUser(curentUser, newPost);

    // Make a POST request to update the user data on the server
    axios
      .put(`http://localhost:5001/users/${getuserID()}`, updatedUser)
      .then((response) => {
        console.log("Post added successfully!", response.data);

        // Update the curentUser state with the updatedUser
        setCurrentUser(updatedUser);

        // Optionally, you can perform any additional actions here
      })
      .catch((error) => {
        console.error("Error adding post:", error);
        // Optionally, you can handle the error here
      });
  };

  const setAllPost = () => {
    axios.post("http://localhost:5001/Posts", post).then((response) => {
      console.log("post : ", response.data);
    });
  };

  const HandelAddPosts = (newpost) => {
    const update = [...Posts, newpost];
    setpost(update);
    postPosts();
    setAllPost();
  };

  const HandelSubmit = (event) => {
    event.preventDefault();
    console.log(curentUser);
  };

  return (
    <>
      <div className="view"></div>
      <div className="post-area">
        <form
          className="post-form"
          encType="multipart/form-data"
          onSubmit={HandelSubmit}
        >
          <textarea
            className="post-textArea"
            cols={30}
            rows={12}
            onChange={HandlePostbox}
            placeholder="write your post here"
          ></textarea>
          <div>
            <input type="file" />
            <button onClick={() => HandelAddPosts(post)}>Post</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Post;
