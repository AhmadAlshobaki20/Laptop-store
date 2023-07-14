import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import allData from "../context/context";
import "./cart.css";

function Cart() {
  const { getuserID, cart, setcart } = useContext(allData);
  const [counter, setCounter] = useState();
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get(
      `http://localhost:5001/users/${getuserID()}`
    );
    setcart(response.data.cartproduct);
  };

  const deleteProduct = async (id) => {
    const updateProduct = cart.filter((product) => {
      return id !== product.id;
    });
    axios.patch(`http://localhost:5001/users/${getuserID()}`, {
      cartproduct: updateProduct,
    });
    setcart(updateProduct);
  };
  const deleteAllProduct = async () => {
    const response = await axios.patch(
      `http://localhost:5001/users/${getuserID()}`,
      {
        cartproduct: [],
      }
    );
    setcart(response.data.cartproduct);
  };
  const showproducts = cart.map((elem) => {
    return (
      <>
        <div className="row">
          <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
            {/* <!-- Image --> */}
            <div
              className="bg-image hover-overlay hover-zoom ripple rounded"
              data-mdb-ripple-color="light"
            >
              <img src={elem.image} className="w-100" />
              <a href="#!">
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                ></div>
              </a>
            </div>
            {/* <!-- Image --> */}
          </div>

          <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
            {/* <!-- Data --> */}
            <p>
              <strong>name : {elem.name}</strong>
            </p>
            <p>{elem.description}</p>
            <p>Model: {elem.model}</p>
            <button
              type="button"
              className="btn btn-primary btn-sm me-1 mb-2"
              data-mdb-toggle="tooltip"
              title="Remove item"
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire(
                      "Deleted!",
                      "Your file has been deleted.",
                      "success"
                    );
                    deleteProduct(elem.id);
                  }
                });
              }}
            >
              <i className="fas fa-trash"></i>
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm mb-2"
              data-mdb-toggle="tooltip"
              title="Move to the wish list"
            >
              <i className="fas fa-heart"></i>
            </button>
            {/* <!-- Data --> */}
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            {/* <!-- Quantity --> */}
            <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
              <button
                className="btn btn-primary px-3 me-2"
                onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
              >
                <i className="fas fa-minus"></i>
              </button>

              <div className="form-outline">
                <input
                  id="form1"
                  min="0"
                  name="quantity"
                  value=""
                  type="number"
                  className="form-control"
                />
                <label className="form-label" for="form1">
                  Quantity
                </label>
              </div>

              <button
                className="btn btn-primary px-3 ms-2"
                onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
            {/* <!-- Quantity --> */}
            {/* <!-- Price --> */}
            <p className="text-start text-md-center">
              <strong>${elem.price}</strong>
            </p>
            {/* <!-- Price --> */}
          </div>
        </div>
        <hr className="my-4" />
      </>
    );
  });

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart - 2 items</h5>
              </div>
              <div className="card-body">{showproducts}</div>
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <p>
                  <strong>Expected shipping delivery</strong>
                </p>
                <p className="mb-0">12.10.2020 - 14.10.2020</p>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body">
                <p>
                  <strong>We accept</strong>
                </p>
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                  alt="Visa"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                  alt="American Express"
                />
                <img
                  className="me-2"
                  width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard"
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Products
                    <span>$53.98</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Shipping
                    <span>Gratis</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>$53.98</strong>
                    </span>
                  </li>
                </ul>

                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={deleteAllProduct}
                >
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div />
    </section>
  );
}
export default Cart;
