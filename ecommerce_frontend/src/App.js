import "./App.css";
import { useState } from "react";
import HomeProducts from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/register";
import Profile from "./Pages/Profile";
import UpdateProfile from "./Pages/UpdateProfile";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Orders from "./Pages/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderDetails from "./Pages/OrderDetails";
import Dashboard from "./Pages/Dashboard";
import ProductsAdmin from "./Pages/AdminProductManagement";
import UsersAdmin from "./Pages/AdminUserManagement";
import OrdersAdmin from "./Pages/AdminOrderManagement";
import LandingPage from "./Pages/LandingPage";

import ProtectedRoute from "./components/protectedRoute";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

/* ================= NAVBAR ================= */
function Navbar() {
  const [keyword, setKeyword] = useState("");
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
        SRK16 Mart
      </div>

      <div className="input-search">
        <input
          type="text"
          placeholder="Search products..."
          className="nav-input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="nav-buttons">
        <button onClick={() => navigate("/home")}>Home</button>

        {token ? (
          <>
            <button onClick={() => navigate("/orders")}>Orders</button>
            <button onClick={() => navigate("/cart")}>Cart</button>

            {role === "ADMIN" && (
              <button onClick={() => navigate("/admin/dashboard")}>
                Dashboard
              </button>
            )}

            <button onClick={() => navigate("/profile")}>Profile</button>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Orders</button>
            <button onClick={() => navigate("/login")}>Cart</button>
            <button onClick={() => navigate("/login")}>Login</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= LAYOUT WRAPPER ================= */
function Layout({ children }) {
  const location = useLocation();

  // ❌ DO NOT show navbar on landing page
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

/* ================= APP ================= */
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* LANDING PAGE (NO NAVBAR) */}
          <Route path="/" element={<LandingPage />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* USER */}
          <Route path="/home" element={<HomeProducts />} />
          <Route path="/home/products/:keyword" element={<HomeProducts />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/updateProfile"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route path="/products/:id" element={<ProductDetails />} />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders/:orderId"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders/:orderId/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />

          {/* ADMIN */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute>
                <ProductsAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <UsersAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/ordermanagement"
            element={
              <ProtectedRoute>
                <OrdersAdmin />
              </ProtectedRoute>
            }
          />
        </Routes>

        <ToastContainer position="bottom-right" autoClose={3000} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;