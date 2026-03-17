import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import { addToCart } from "../ReusableService";
import { toast } from "react-toastify";
import "./ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false); 
  
  const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    };


  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleToAdd = async (productId) => {
    try {
      await addToCart(productId);
      toast.success("Product added to cart");
    } catch {
      toast.error("Failed to add product");
    }
  };

  const handleBuyNow = () => {
    setShowPopup(true);
  };

  const proceedToBuy = async () => {
    try {
      await api.post(`/orders/buy/${product.id}`);
      toast.success("Order placed successfully!");
      setShowPopup(false);
      fetchProduct();
    } catch {
      toast.error("Order failed");
    }
  };

  if (!product) {
    return <p className="pd-loading">Loading product...</p>;
  }

  return (
    <div className="pd-start">

      <img
        className="pd-img"
        src={`http://localhost:8080/Images/${product.imageUrl}`}
        alt={product.name}
      />

      <h2 className="pd-title">{product.name}</h2>

      <p className="pd-info">Brand: {product.brand}</p>
      <p className="pd-info">Category: {product.category}</p>

      <p className="pd-price">₹{product.price}</p>

      <p className={`pd-stock ${product.stock > 0 ? "in-stock" : "out-stock"}`}>
        {product.stock > 0 ? "In Stock" : "Out of Stock"}
      </p>

      <p className="pd-desc">{product.description}</p>

      <div className="pd-btn-group">

        <button
          className="pd-cart-btn"
          disabled={product.stock === 0}
          onClick={() => handleToAdd(product.id)}
        >
          Add to Cart
        </button>

        <button
          className="pd-buy-btn"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>

      </div>

      {/* POPUP MODAL */}
      {showPopup && (
        <div className="pd-modal-overlay">
          <div className="pd-modal">

            <h3>Confirm Purchase</h3>

            <p>Do you want to buy this product?</p>

            <button
              className="pd-confirm-btn"
              onClick={proceedToBuy}
            >
              Proceed to Buy
            </button>

            <button
              className="pd-cancel-btn"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default ProductDetails;