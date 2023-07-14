  import { useContext, useEffect, useState } from "react";
  import allData from "../context/context";
  import ShowPost from "./showPost";
  import "./ListPost.css";
  import axios from "axios";
  // import ShowComment from "./comment/ShowComment";
  function ListPost() {
    const {Posts, setpost} = useContext(allData);
    useEffect(() => {
      fetchAllPosts();
    }, []);

    const fetchAllPosts = async() => {
      const response = await axios.get(`http://localhost:5001/Posts`)
      setpost(response.data);
    };

    const allPosts = Posts.map((post) => {
      return <ShowPost key={post.id} post={post}/>;
    });

    return (
      <>
        <div className="Post-List">{allPosts}</div>
      </>
    );
  }
  export default ListPost;
