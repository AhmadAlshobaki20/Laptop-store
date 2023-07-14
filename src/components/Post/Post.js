import { useEffect, useState } from "react";
import "./Post.css";
import allData from "../context/context";
import { useContext } from "react";
import axios from "axios";

function Post() {
  const [username, setusername] = useState("");
  const { getuserID, Posts, setpost } = useContext(allData);
  const [post, setPost] = useState({
    content: "",
    Author: "",
    comment: [],
  });

  const HandlePostbox = (event) => {
    const value = event.target.value;
    setPost({ ...post, content: value, Author: username, comment: [] });
  };

  // handle post array
  const HandelAddPosts = async () => {
    const response = await axios.post("http://localhost:5001/posts", post);
    const updatePost = [...Posts, response.data];
    console.log(response.data);
    setpost(updatePost);
  };

  // get currentUser
  const name = () => {
    axios.get(`http://localhost:5001/users/${getuserID()}`).then((response) => {
      console.log("name:", response.data.name);
      setusername(response.data.name);
    });
  };

  useEffect(() => {
    name();
  }, []);

  const HandelSubmit = (event) => {
    event.preventDefault();
    HandelAddPosts();
  };

  return (
    <>
   
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
            {/* <input type="file" /> */}
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Post;
