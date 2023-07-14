import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";
import allData from "../context/context";
import Cart from "../cart/cart";
import Swal from "sweetalert2";

function ProductDetails() {
  const [product, setProd] = useState({});
  const { getuserID, cart, setcart, userID } = useContext(allData);
  const ID = useParams();

  useEffect(() => {
    getProductsDetails();
  }, []);
  const getProductsDetails = () => {
    axios
      .get(`http://localhost:5001/networkProducts/${ID.productID}`)
      .then((data) => {
        setProd(data.data);
      });
  };

  const AddToCart = async () => {
    const response = await axios.patch(
      `http://localhost:5001/users/${getuserID()}`,
      {
        cartproduct: [...cart, product],
      }
    );
    setcart(response.data.cartproduct);
  };
  console.log(cart);
  return (
    <>
      <div className="product-details">
        <aside>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.title}
          />
        </aside>
        <article id="detail">
          {/* <h1>Product #{product.id}</h1> */}
          <h1 id="detail-product-title">
            {product.name},<span> {product.brand}</span>
            <span> {product.model}</span>
          </h1>
          <p id="detail-product-desc">{product.description}</p>
          <h1 id="detail-product-price">{product.price}JD</h1>
          <Link
            to={`/${userID}/cart`}
            className="login"
            style={{
              padding: "10px 20px",
              width: "40px",
            }}
            onClick={(event) => {
              Swal.fire("Good job!", "You clicked the button!", "success").then(
                (result) => {
                  if (result.isConfirmed) {
                    AddToCart();
                  }
                }
              );
            }}
          >
            <i class="fa-sharp fa-solid fa-cart-plus fa-2xl"></i>
          </Link>
        </article>
      </div>
    </>
  );
}

export default ProductDetails;
