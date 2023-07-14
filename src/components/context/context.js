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
  const [Posts, setpost] = useState([]);
  const [cart, setcart] = useState([]);
  const [history, setHistory] = useState([]);

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
  const [Products, setProducts] = useState([]);
  const getProducts = () => {
    axios.get("http://localhost:5001/networkProducts").then((prod) => {
      setProducts(prod.data);
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

  const ValueToShare = {
    fetchUsersData,
    Posts,
    setpost,
    users,
    setUsers,
    PostUserData,
    LoginUser,
    userID,
    setUserID,
    setProducts,
    Products,
    getuserID,
    commentArray,
    setCommentArray,
    cart,
    setcart,
    history,
    setHistory
  };

  return <allData.Provider value={ValueToShare}>{children}</allData.Provider>;
}
export { Provider };
export default allData;
