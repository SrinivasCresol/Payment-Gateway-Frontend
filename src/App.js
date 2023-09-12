import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SuperAdmin from "./Pages/SuperAdmin";
import AdminHome from "./Pages/AdminHome";
import ProductCreate from "./Pages/ProductCreate";
import ProductUpdate from "./Pages/ProductUpdate";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import Success from "./Components/Success";
import Failure from "./Components/Failure";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/super-admin" element={<SuperAdmin />} />
        <Route path="/admin" element={<AdminHome />}>
          <Route path="product/create" element={<ProductCreate />} />
          <Route path="product/update" element={<ProductUpdate />} />
        </Route>
        <Route path="/user" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Failure />} />
      </Routes>
    </>
  );
}

export default App;
