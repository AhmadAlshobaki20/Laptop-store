import log from "../../prem2.avif";
import "./product.css";
import allData from "../context/context";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
function Product() {
  const { Products } = useContext(allData);

  const AllProduct = Products.map((product) => {
    return (
      <div className="product">
        <img src={product.image} id="product-image" alt="" />
        <div className="desc-price">
          <span id="description">Brand:{product.brand}</span>
          <h5 id="description">Brand:{product.name}</h5>
          <h3 className="Price">Price:{product.price}</h3>
          <Link to={`productDetails/${product.id}`} id="detail-btn">Details</Link>
        </div>
      </div>
    );
  });
  return <section className="products">{AllProduct}</section>;
}
export default Product;
