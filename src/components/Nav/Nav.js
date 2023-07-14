import { Link, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import "./Nav.css";
import { useContext } from "react";
import allData from "../context/context";

function Nav() {
  let { getuserID } = useContext(allData);

  let userId = getuserID();

  console.log("HashLink", HashLink);

  const navigationHome = () => {
    if (userId >= 1) {
      return `${userId}`;
    } else {
      return `/`;
    }
  };
  const navigationProduct = () => {
    if (userId >= 1) {
      return `${userId}/product`;
    } else {
      return `/product`;
    }
  };

  const navigateAbout = () => {
    if (userId >= 1) {
      return `${userId}/#About`;
    } else {
      return `/#About`;
    }
  };

  const navigateToProductDetails = () => {
    if (userId >= 1) {
      return `${userId}/product/productDetails`;
    } else {
      return "/product/productDetails";
    }
  };
  return (
    <header>
      <div>
        <a className="logo" href="..">
          <span id="first-part">Network</span>Shop
        </a>
      </div>
      <nav>
        <ul>
          <li>
            <Link to={navigationHome()} className="nav-list">
              Home
            </Link>
          </li>
          <li>
            <Link to={navigationProduct()} className="nav-list">
              Product
            </Link>
          </li>
          {userId > 1 ? (
            <li>
              <HashLink smooth to={navigateAbout()} className="nav-list">
                About
              </HashLink>
            </li>
          ) : (
            <li>
              <HashLink smooth to={navigateAbout()} className="nav-list">
                About
              </HashLink>
            </li>
          )}
          {userId >= 1 && (
            <li>
              <Link to={`${getuserID()}/community`} className="nav-list">
                Community
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <div className="third-section">
        {userId >= 1 ? (
          <>
            <Link
              to={`/${getuserID()}/cart`}
              class="fa-sharp fa-solid fa-cart-plus fa-2xl"
            ></Link>

            <Link to={`/${getuserID()}/profile`} className="profile"></Link>
            <Link to={"/"} className="login">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to={"/login"} className="login">
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Nav;
