import { Link } from "react-router-dom";
import "./PorductListHome.css";
import { useContext, useEffect, useState } from "react";
import allData from "../context/context";
import axios from "axios";
function ProductListHome() {
  const { Products, setProducts } = useContext(allData);

  const random = Products.slice(0, 6).map((product) => {
    return (
      <>
        <div class="ui card">
          <div class="image">
            <img src={product.image} id="img" alt="." />
          </div>
          <div class="content">
            <a class="header" href="..">
              Name:{product.name}
            </a>
            <div class="meta">
              <span class="date">Brand:{product.brand}</span>
            </div>
            <div class="description">Desc:{product.description}</div>
            <div className="price">
              <h1 style={{ color: "orange" }}>{product.price}</h1>
            </div>
          </div>
          <div class="extra content">
            <Link to={`productDetails/${product.id}`} id="detail-btn">
              Details
            </Link>
          </div>
        </div>
      </>
    );
  });
  return (
    <>
      <h1 id="title-productList-home">Some Products</h1>
      <section>{random}</section>
      <Link to={"/product"} className="more-details-project">
        <Link to={"/product"} id="More-products">
          More Products
        </Link>
      </Link>
    </>
  );
}
export default ProductListHome;
