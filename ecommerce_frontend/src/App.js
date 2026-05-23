import './App.css';
import {useState} from "react";
import HomeProducts from './Pages/Home';
import Login from './Pages/Login';
import Register from "./Pages/register";
import Profile from "./Pages/Profile";
import UpdateProfile from "./Pages/UpdateProfile";
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import Orders from './Pages/Orders';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderDetails from './Pages/OrderDetails';
import Dashboard from "./Pages/Dashboard";
import ProductsAdmin from "./Pages/AdminProductManagement";
import UsersAdmin from "./Pages/AdminUserManagement";
import OrdersAdmin from "./Pages/AdminOrderManagement";


import ProtectedRoute from './components/protectedRoute';
import { BrowserRouter, Routes , Route, useNavigate } from 'react-router-dom';

function Navbar() {
  const[keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleSearch = () => {
    if (!keyword.trim()) return;
    navigate(`/home/products/${encodeURIComponent(keyword)}`);
  };
  
  return (
      <div className="nav-bar">
        <div className="nav-logo" onClick={() => navigate("/home")}>
          Ecommerce
        </div>
        <div className="input-search">
          <input
            type="text"
            placeholder="Search products..."
            className="nav-input"
            value={keyword}
            onChange={(e)=> setKeyword(e.target.value)}
            onKeyDown={(e) => {if(e.key === "Enter"){
              handleSearch();
            }}}
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
        <div className="nav-buttons">

          {token ? (
            <>
              <button onClick={() => navigate("/home")}>Home</button>
              <button onClick={() => navigate("/orders")}>Orders</button>
              <button onClick={() => navigate("/cart")}>Cart</button>

              { role === "ADMIN" && (
              <button onClick={() => navigate("/admin/dashboard")}>Dashboard</button>)
              }
              <button className="profile-button" onClick={() => navigate("/profile")}>P</button>
              <button className="logout-btn" onClick={logout}>Logout</button>
            </>) : (
            <>
              <button onClick={() => navigate("/login")}>Home</button>
              <button onClick={() => navigate("/login")}>Orders</button>
              <button onClick={() => navigate("/login")}>Cart</button>
              <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
            </>
          )}

        </div>
      </div>
    );
}


function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path ="/admin/dashboard" element={<Dashboard/>} />
        <Route path ="/admin/products" element = {<ProductsAdmin/>} />
        <Route path="/orders/:orderId/:id" element = {<ProductDetails />} />
        <Route path="/admin/users" element = {<UsersAdmin/>} />
        <Route path="/admin/ordermanagement" element={<OrdersAdmin/>}/>


        {/* Protected Home */}
      
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/home/products/:keyword"
          element={
            <ProtectedRoute>
              <HomeProducts />
            </ProtectedRoute>
          }
        />

      </Routes>
        <ToastContainer position="bottom-right" autoClose={3000} />


    </BrowserRouter>

  );
}

export default App;
