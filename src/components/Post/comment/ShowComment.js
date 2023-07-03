import { useContext } from "react";
import allData from "../../context/context";

function ShowComment() {
  const { commentArray } = useContext(allData);

  const comments = commentArray.map((com) => {
    return <div><div>{com.user.name}</div><div>{com.content}</div></div>;
  });

  return (
    <>
      <div>{comments}</div>
    </>
  );
}

export default ShowComment;
