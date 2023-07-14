// import Cart from "./components/cart/cart";
import {
  Home,
  Product,
  Nav,
  Login,
  Footer,
  Register,
  Profile,
  Cart,
  Community,
  ProductDetails,
} from "./components/intermediry";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:userId" element={<Home />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/:userId/product" element={<Product />}></Route>
        <Route path="/:userId/community" element={<Community />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/:userId/profile" element={<Profile />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route
          path="/product/productDetails/:productID"
          element={<ProductDetails />}
        />
        <Route
          path="/:userId/product/productDetails/:productID"
          element={<ProductDetails />}
        />
        <Route path="/:userId/cart" element={<Cart />} />
      </Routes>

      <Footer />
    </>
  );
}
export default App;
