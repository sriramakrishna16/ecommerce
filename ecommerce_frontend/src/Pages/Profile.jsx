import {useState} from "react";
import {useEffect} from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";


function Profile(){
    // const [username, setUsername] = useState("");
    // const [name , setName ] = useState("");
    // const [email, setEmail] = useState("");
    // const [phone, setPhone] = useState("");
    // const [address, setAddress] = useState("");

    const [profiledetails,setProfiledetails] = useState({});
    const navigate = useNavigate();

   
    useEffect(()=>{
        fetchprofile();
    },[]);

    const fetchprofile = async function(){
        try{
                const response = await api.get("/profile");
                setProfiledetails(response.data);
            }
            catch(err){
                alert("login to continue");
            }
    }
    


    return (
        
            <div className = "profile-container">
                <div className ="profile-details">
                    <div className="profile-title" >
                    <h3>Personal Information</h3>
                    </div>
                    
                    <div className = "row">   
                        <span className="label">Username</span>
                        <span className="colon">:</span>
                        <span>{profiledetails.username}</span>
                    </div>
                    <div className = "row">
                        <span className="label">Name</span>
                        <span className="colon">:</span>
                        <span>{profiledetails.name}</span>
                    </div>
                    <div className = "row">
                        <span className="label">Email</span>
                        <span className="colon">:</span>
                        <span>{profiledetails.email}</span>
                    </div>
                    <div className = "row">
                        <span className="label">Phone no</span>
                        <span className="colon">:</span>
                        <span>{profiledetails.phone}</span>
                    </div>
                    <div className = "row">
                        <span className="label">Address</span>
                        <span className="colon">:</span>
                        <span>{profiledetails.address}</span>
                    </div>
                    <div className="profile-button-placement">
                    <button className="edit-button"onClick={()=>navigate("/updateProfile")}>edit personal details</button>
                    </div>
                    
                    
                </div>
            </div>
           
    )
}

export default Profile;