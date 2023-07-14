import "./EditPost.css";
import { useContext, useState } from "react";
import allData from "../context/context";
import axios from "axios";

function EditPost({ post }) {
  console.log("post = ", post);
  const [newContent, setnewConten] = useState("");
  // get posts array from the context file
  const { Posts, setpost, curentUser } = useContext(allData);

  const HandelEditPost = async (id) => {
    const response = await axios.patch(`http://localhost:5001/posts/${id}`, {
      content: newContent
    });
    try {
      console.log(response.data);
      const updatedPosts = Posts.map((post) => {
        if (post.id === id) {
          return { ...post, ...response.data };
        }
        return post;
      });
      setpost(updatedPosts);
    }catch (error) {
      console.log("faild");
    }
  };

  const handelContent = (e) => {
    setnewConten(e.target.value);
  };
  return (
    <div className="edit-box">
      <input id="input-edit" onChange={handelContent} />
      <button
        id="edit-btn"
        onClick={() => {
          HandelEditPost(post.id, newContent);
        }}
      >
        edit
      </button>
    </div>
  );
}
export default EditPost;