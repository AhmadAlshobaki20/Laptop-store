import { Link } from "react-router-dom";
import "./PorductListHome.css";
import { useContext} from "react";
import allData from "../context/context";
function ProductListHome() {
  const { Products } = useContext(allData);
  const random = Products.splice(0,6,1).map((product) => {
    return (
      <>
        <div className="product" key={product.id}>
          <img src={product.image} id="product-image" alt="" />
          <div className="desc-price">
            <span id="description">Brand:{product.brand}</span>
            <h5 id="description">Brand:{product.name}</h5>
            <h3 className="Price">Price:{product.price}</h3>
            <Link to={`product/productDetails/${product.id}`} id="detail-btn">
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
