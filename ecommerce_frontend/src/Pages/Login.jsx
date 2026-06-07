import {useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig"

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginHandler = async function(){
        try{
            const response = await api.post("/login",{
                username,
                password
            });

            localStorage.setItem("token",response.data.token);
            localStorage.setItem("role", response.data.role);
      
            navigate("/home");
        }
        catch (err){
            alert("Invalid Credentials");
        }
    };

   return (

    
  <div className="login-container">


    <div className="login-card">

      <h2 className="login-title">Login</h2>


      <input className="login-input" type="text" placeholder="Username" value={username}
       onChange={(e) => setUsername(e.target.value)}/>

      <input className="login-input" type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)}/>

      <button className="login-submit-button" onClick={loginHandler} >Login</button>
      
      <p className="login-footer">
        Not registered yet?{" "}
        <span className="register-button" onClick={() => navigate("/register")}>Register</span>
        <b/>
      </p>

      <p className="login-footer">use admin credentials to login as admin</p>

    </div>
  </div>
);
};

export default Login;