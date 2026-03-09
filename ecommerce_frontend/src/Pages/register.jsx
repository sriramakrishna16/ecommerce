
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function Register(){
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [name, setName ] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const registerHandler = async function () {
        try {
            await api.post("/register",{
                name,username,email,
                phone: phone? Number(phone) : null,
                address,password
            });
            alert("Registration completed")
            navigate("/login");

        }
        catch(err){
            alert("failed to register");
        }
        
    };

    return (
        <div className = "login-page">
        <h1 className="login-title">Register</h1>
        <input className="login-buttons" type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input className="login-buttons" type="text" placeholder="enter your name" value={name} onChange={(e)=>setName(e.target.value)}/>
        <input className="login-buttons" type="text" placeholder="enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input className="login-buttons" type="number" placeholder="enter your phoneno" value={phone} onChange={(e)=>setPhone(e.target.value)}/>

        <input className="login-buttons" type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <input className="login-buttons" type="text" placeholder="enter your address" value={address} onChange={(e)=>setAddress(e.target.value)}/>

        <button className="login-submit-button" onClick={registerHandler}>Register</button>
        <p>already registered..?<span onClick={()=> navigate("/login")} className = "register-button">Login</span></p>
        </div>
    )

};

export default Register;