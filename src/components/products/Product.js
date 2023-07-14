import log from "../../prem2.avif";
import "./product.css";
import allData from "../context/context";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function Product() {
  const { Products, setProducts } = useContext(allData);

  useEffect(()=>{
    getProduct();
  }
  ,[])

  const getProduct = async () => {
    const response = await axios.get(`http://localhost:5001/networkProducts`);
    setProducts(response.data);
  };

  const AllProduct = Products.map((product) => {
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
  return <section className="products">{AllProduct}</section>;
}
export default Product;
