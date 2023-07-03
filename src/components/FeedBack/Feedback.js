import "./FeedBack.css";
import { useContext, useState } from "react";
import allData from "../context/context";
function FeedBack() {
  const [feed, setFeed] = useState({});

  const handelTransformeFeedback = (event) => {
    setFeed(event.target.value);
  };
  const handelsubmit = (event) => {
      
  };
  return (
    <>
      <div className="feedback-container">
        <div className="feedback-caption">
          <h1>feedback</h1>
          <p>
            we are ready to response your feedback anytime please tell us
            anytime if you faced any problem when you use our website we improve
            ourself
            <span id="attention"> with your suggestion</span> thank you.
          </p>
        </div>
        <form className="feedback" onSubmit={handelsubmit}>
          <textarea
            cols={70}
            rows={10}
            placeholder={"enter your feedback here"}
            onChange={handelTransformeFeedback}
          ></textarea>
          <button>submit</button>
        </form>
      </div>
    </>
  );
}

export default FeedBack;
