import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ProductDetails.css'

function ProductDetails() {
  const [product,setProd] = useState({});
  const ID = useParams();
  console.log("ahmad");
  
  useEffect(()=>{
    getProductsDetails()
  },[])
  const getProductsDetails = () => {
    axios
      .get(`http://localhost:5001/networkProducts/${ID.productID}`)
      .then((data) => {
        console.log("data",data.data)
        setProd(data.data);
      });   
  };
  return(
    <>   
      
      <div className="product-details">
        <aside>
        <img src={product.image} className="card-img-top" style={{height:"400px", width:"400px"}} alt={product.title} />
        </aside>
        <article id="detail">
          <h1>Product #{product.id}</h1>
          <h1 id="detail-product-title">{product.name},<span> {product.brand}</span> </h1>
          <p id="detail-product-desc">{product.description}</p>
          <h1 id="detail-product-price">{product.price}JD</h1>
        </article>
      </div>
    </>
  )
}

export default ProductDetails;
