import './App.css';
import HomeProducts from './Pages/Home';
import Login from './Pages/Login';
import Register from "./Pages/register";
import Profile from "./Pages/Profile";
import UpdateProfile from "./Pages/UpdateProfile";
import ProductDetails from './Pages/ProductDetails';
import Cart from './Pages/Cart';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



import ProtectedRoute from './components/protectedRoute';
import { BrowserRouter, Routes , Route, useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="nav-bar">

      <h1 style={{ cursor: "pointer", margin: 10}} onClick={() => navigate("/home")}>
        Ecommerce
      </h1>

      <div className="input-search">
        <input type="text" placeholder="search any product" className="nav-input" />
        <button>search</button>
      </div>

      <div className="nav-buttons">

        {token && <button onClick={() => navigate("/home")}>Home</button>}
        {token && <button>Orders</button>}
        {token && <button onClick={()=> navigate("/cart")}>Cart</button>}
        {token && <button onClick={logout}>Logout</button>}
    
        {token && <button className = "profile-button" onClick={()=> navigate("/profile")}>profile</button>}


        {!token && <button onClick={() => navigate("/login")}>Home</button>}
        {!token && <button>Orders</button>}
        {!token && <button>Cart</button>}
        {!token && <button onClick={() => navigate("/login")}>Login</button>}
        
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

    

        {/* Protected Home */}
        <Route
          path="/home"
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
