  import { useContext, useEffect, useState } from "react";
  import allData from "../context/context";
  import ShowPost from "./showPost";
  import "./ListPost.css";
  import axios from "axios";
  import ShowComment from "./comment/ShowComment";
  function ListPost() {
    const { getuserID } = useContext(allData);
    const [postOfUser, setPostOfUser] = useState([]);

    useEffect(() => {
      userPost();
    }, []);
    const userPost = () => {
      axios.get(`http://localhost:5001/Posts`).then((userPosts) => {
        console.log("userPosts:", userPosts.data);
        setPostOfUser(userPosts.data);
      });
    };

    const allposts = postOfUser.map((post) => {
      return <ShowPost post={post} id={post.id} />;
    });

    return (
      <>
        <div className="Post-List">{allposts}</div>
      </>
    );
  }
  export default ListPost;
