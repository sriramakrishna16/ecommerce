import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import api from "../api/axiosConfig";

function ProfileUpdate(){
    const [name , setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const [profiledetails,setProfiledetails] = useState({});

    useEffect(()=>{
        fetchprofile();
    },[]);

    useEffect(()=>{
        loadProfile();
    },[]);

    async function fetchprofile(){
        try{
            const response = await api.get("/profile");
            setProfiledetails(response.data);
        } catch(err){
            alert("login in to continue");
        }
    };

    async function loadProfile(){
        const response = await api.get("/profile");
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setAddress(response.data.address);
    }


    const UpdateHolder = async function(){
        try{
        await api.post("/updateProfile",{
            name,email,phone: phone? Number(phone):null
            ,address}
            );
        alert("Profile Updation Successful");
        navigate("/profile");
    }catch(err){
        alert("updation failed");
        navigate("/profile");
    }
    };

    return (

         <div className = "profile-container">
                <div className ="profile-details">
                    <div className="profile-title" >
                    <h3>Personal Information</h3>
                    </div>
                    
                    <div className = "row-update">   
                        <span className="label">Username</span>
                        <span className="colon"></span>
                        <span>{profiledetails.username}</span>
                    </div>
                    <div className = "row-update">
                        <span className="label">Name</span>
                        <span className="colon"></span>
                        <input className="update-profile-box" type="text" value={name}  onChange={(e)=>setName(e.target.value)}></input>
                    </div>
                    <div className = "row-update">
                        <span className="label">Email</span>
                        <span className="colon"></span>
                        <input className="update-profile-box" type="text" value={email}  onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                    <div className = "row-update">
                        <span className="label">Phone no</span>
                        <span className="colon"></span>
                        <input className="update-profile-box" type="number" value={phone} onChange={(e)=>setPhone(e.target.value)}></input>
                    </div>
                    <div className = "row-update">
                        <span className="label">Address</span>
                        <span className="colon"></span>
                        <input className="update-profile-box" type="text" value={address} onChange={(e)=>setAddress(e.target.value)}></input>
                    </div>
                    <div className="profile-button-placement">
                        <button className="save-button" onClick={UpdateHolder}>save</button>
                        <button className="cancel-button" onClick = {()=> navigate("/profile")}>cancel</button>
                    </div>
                    
                </div>
            </div>
    )

};

export default ProfileUpdate;