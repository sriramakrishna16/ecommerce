import React, {useState,useEffect} from "react";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {addToCart} from "../ReusableService";
import { useParams } from "react-router-dom";

function HomeProducts(){

    const [products,setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {keyword} = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = keyword
                    ? await api.get(`/home/products/${keyword}`)
                    : await api.get("/home");
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError("Unauthorized or backend not running");
                setLoading(false);
            }
        };
        fetchProducts();
    }, [keyword]);


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
            {products.map((product) => (
            <div className="product-card" key={product.id}>
                <div
                className="product-img"
                onClick={() => navigate(`/products/${product.id}`)}
                >
                <img
                    src={`http://localhost:8080/Images/${product.imageUrl}`}
                    alt={product.name}
                />
                </div>

                <h3 className="name">{product.name}</h3>

                <div className="product-meta">
                <span>{product.brand}</span>
                <span>•</span>
                <span>{product.category}</span>
                </div>

                <div className="price-row">
                <span className="price">₹ {product.price}</span>
                <span className="stock">{product.stock} left</span>
                </div>

                <button
                className="cart-button"
                onClick={() => handleToAdd(product.id)}
                >
                Add to Cart
                </button>
            </div>
            ))}
        </div>
    );
}

export default HomeProducts;