import React from "react";
import "./Footer.css";
class Footer extends React.Component {
  render() {
    return (
      <>
        <footer>
          <div className="left-side-section">
            <h1>
              <span className="blue-sec">ADDRESS:</span>11183 Abdoun Alshamali
            </h1>
            <h1>
              <span className="blue-sec">PHONE:</span>+962787014262
            </h1>
            <h1>
              <span className="blue-sec">EMAIL:</span>
              ahmad.r.alshobaki@gmail.com
            </h1>
            <a className="logo">
              <span id="first-part">Network</span>Shop
            </a>
          </div>
          <div className="middle-side-section">
            <h1 id="h1">Home</h1>
            <h1>Product</h1>
            <h1>About us</h1>
            <h1>Contact us</h1>
          </div>
          <div className="right-side-section">
            <h1 id="new-letter">NEWSLETTER:</h1>
            <div className="subscribe">
              <input type="text" />
              <button>Subscribe</button>
            </div>
            <div className="social-media">
              <h1 id="social">SOCIAL:</h1>
              <div className="icons">
                <i className="fa-brands fa-square-facebook fa-xl"></i>
                <i className="fa-brands fa-linkedin fa-xl"></i>
                <i className="fa-brands fa-square-twitter fa-xl"></i>
              </div>
            </div>
          </div>
        </footer>
        <div className="extend">
          <span>© 2023 Network Shop</span>
        </div>
      </>
    );
  }
}

export default Footer;
