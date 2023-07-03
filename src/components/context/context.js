import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const allData = createContext({});

function Provider({ children }) {
  const [FeedBack, setFeedBack] = useState([{}]);
  const [LoginUser, setLoginUser] = useState({});
  const [userID, setUserID] = useState();
  const [users, setUsers] = useState([{}]);
  const [commentArray, setCommentArray] = useState([]);

  // use location to get user ID
  const Location = useLocation();
  const getuserID = () => {
    const userId = Location.pathname.split("/")[1];
    return userId;
  };

  // get info users from db.
  function fetchUsersData() {
    axios.get("http://localhost:5001/users").then((user) => {
      setUsers(user.data);
    });
  }
  useEffect(() => {
    fetchUsersData();
  }, []);

  // get products from server
  // products's Array
  const [Products, setProducts] = useState([{}]);
  const getProducts = () => {
    axios.get("http://localhost:5001/networkProducts").then((prod) => {
      setProducts(prod.data);
      console.log(prod);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  // post user's info to db.json/
  function PostUserData(newAccount) {
    axios.post("http://localhost:5001/users", newAccount);
    console.log("Add user to db.json successful");
  }

  const [curentUser, setCurrentUser] = useState();
  // get curentUser
  const getCurrent = () => {
    axios.get(`http://localhost:5001/users/${getuserID()}`).then((user) => {
      setCurrentUser(user.data.name);
    });
  };

  useEffect(() => {
    getCurrent();
  }, []);



  // posts
  const [Posts, setpost] = useState([]);
  // const HandelAddPosts = (newpost) => {
  //   const update = [...Posts, newpost];
  //   setpost(update);
  //   axios.put(`http://localhost:5001/users/${getuserID()}`).
  // };

  const HandelDeletePosts = (id) => {
    const postsAfterDelete = Posts.filter((post) => {
      return id !== post.id;
    });
    setpost(postsAfterDelete);
    console.log("first")
  };

const HandelEditPost = (id, newContent) => {
    const updatePost = Posts.map((post) => {
      if (id === post.id) {
        return { ...post, content: newContent };
      }
      return setpost(updatePost);
    });
  };

  
  // set comments to server

  const HandelAddComment = (newComment) => {
    const addNewComment = [...commentArray, newComment];
    setCommentArray(addNewComment);
    console.log("addNewComment = ",addNewComment)
  };

  const ValueToShare = {
    fetchUsersData,
    Posts,
    setpost,
    // HandelAddPosts,
    HandelDeletePosts,
    // HandelEditPost,
    users,
    setUsers,
    PostUserData,
    LoginUser,
    userID,
    setUserID,
    Products,
    getuserID,
    curentUser,
    setCurrentUser,
    commentArray,
    setCommentArray,
    HandelAddComment,
  };

  return <allData.Provider value={ValueToShare}>{children}</allData.Provider>;
}
export { Provider };
export default allData;
