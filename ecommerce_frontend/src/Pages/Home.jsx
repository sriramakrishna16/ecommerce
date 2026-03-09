import React, {useState,useEffect} from "react";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import {addToCart} from "../ReusableService";

function HomeProducts(){
    const [products,setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get("/home");
            setProducts(response.data);
            setLoading(false);
        }
        catch(error){
            // navigate("/login");
            console.log(error);
            setError("Unauthorized or backend not runnning");
            setLoading(false);
        }
    };

    const handleToAdd = async function(productId){
        await addToCart(productId);
        toast.success("product added to cart");
    }

    if (loading){
        return <p>fetching products...</p>
    }
    if(error){
        return <h1 style={{color:"red", textAlign:"center",padding:250}}>{error}</h1>
    }

    return (
        <div className="home-products-container">
            {products.map(product=>(
                <div className="product-card" key={product.id}>
                    <div className="product-img">
                        <img src={`http://localhost:8080/Images/${product.imageUrl}`}alt={product.name}
                        onClick={()=> navigate(`/products/${product.id}`)}/>
                        </div>
                    <div className="product-name">
                        <p>Name:  </p>
                        <h5 className="name">{product.name}</h5>
                    </div>
                    <div className="product-info">
                        <div className="product-brand-category">
                             <p>Brand:</p>
                             <p style={{ color: "black", fontWeight:"Bold" }}>{product.brand}</p>
                        </div>
                         <div className ="product-brand-category">
                             <p>Category:</p>
                            <p style={{ color: "black" ,fontWeight:"Bold" }}>{product.category}</p>
                         </div>
                    </div>
                    <div className ="price-quantity">
                        <div className="price">
                            <p style={{fontSize:20}}>price: </p>
                            <p style={{color:" #0a58ca"}}>{product.price}</p>
                            <p style={{fontSize:20}}>.rs</p>
                        </div>
                        <div className="quantity">
                        <p className="quantity">{product.stock}</p>
                        <p style={{color:"red"}}>left</p>
                        </div>
                    </div>
                        <button className="cart-button" onClick={()=>handleToAdd(product.id)}>Add to cart</button>                      
                </div>
            ))}
        </div>
    )
}

export default HomeProducts;