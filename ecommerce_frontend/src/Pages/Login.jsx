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

            localStorage.setItem("token",response.data);
            
            navigate("/home");

        }
        catch (err){
            alert("Invalid Credentials");
        }
    };

    return (
        <div className = "login-page">
        <h1 className="login-title">login</h1>
        <input className="login-buttons" type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input className="login-buttons" type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className="login-submit-button" onClick={loginHandler}>Login</button>
        <p>not registered yet..? <span onClick={()=>navigate("/register")} className = "register-button">Register</span></p>
        </div>
    )
};

export default Login;