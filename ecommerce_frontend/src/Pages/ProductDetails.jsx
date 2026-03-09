import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import api from "../api/axiosConfig";
import {addToCart} from "../ReusableService";
import { toast } from "react-toastify";



function ProductDetails(){
    const {id} = useParams();
    const [product , setProduct] = useState(null);

    

    useEffect(() => {
    const fetchProduct = async () => {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        };

        fetchProduct();
    }, [id]);

    const handleToAdd = async function(productId){
        await addToCart(productId);
        toast.success("product added to cart");
    }


    if(!product){
        return (<p>loading...</p>);
    }

    return (
        <div style={{ padding: 50 }}>
      <img
        src={`http://localhost:8080/Images/${product.imageUrl}`} alt={product.name}
        width={300}
      />

      <h2>{product.name}</h2>

      <p>Brand: {product.brand}</p>
      <p>Category: {product.category}</p>
      <p>Price: {product.price} rs</p>
      <p>Stock: {product.stock}</p>

      <p>Description: {product.description}</p>
      {/* api.post(`/cart/add/${productId}`) */}
        <button className="cart-button" onClick={()=>handleToAdd(product.id)}>Add to cart</button>     
        <button className="cart-button">Buy now</button>                 

    </div>
    );
}

export default ProductDetails;