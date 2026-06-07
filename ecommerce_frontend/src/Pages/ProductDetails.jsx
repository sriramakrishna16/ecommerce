import { useState, useEffect , useCallback} from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { addToCart } from "../ReusableService";
import { toast } from "react-toastify";
import "./ProductDetails.css";

function ProductDetails() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false); 
  
  const fetchProduct = useCallback(async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    },[id]);


  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const token = localStorage.getItem("token");

  const handleToAdd = async (productId) => {
    try {
      if(token){
      await addToCart(productId);
      toast.success("Product added to cart");
      }else{
        toast.warn("please login to continue");
        navigate("/login");
      }
    } catch {
      toast.error("Failed to add product");
    }
  };

  const handleBuyNow = () => {
    if(token){
    setShowPopup(true);
    }else{
      toast.warn("please login to continue");
      navigate("/login");
    }
  };

  const proceedToBuy = async () => {
    try {
      const response = await api.post(`/payment/orders/buy/${product.id}`);
      const data = response.data;
      if(data.status === "OUT_OF_STOCK"){
        toast.error("product is out of stock");
        setShowPopup(false);
        fetchProduct();
        return;
      }
      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.razorPayOrderId,

        name: "SRK Store",
        description: product.name,

        handler: async function (response) {

          try {
            await api.post("/payment/verify", {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              dbOrderId: data.dbOrderId
            });

            toast.success("Payment Successful");
            setShowPopup(false);

            fetchProduct(); 

          } catch (err) {
            toast.error("Payment verification failed");
          }
        },

        theme: {
          color: "#3399cc"
        }
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err){
      console.log(err);
      toast.error("failed to start payment");
    }
    
  };


  if (!product) {
    return <p className="pd-loading">Loading product...</p>;
  }

  return (
    <div className="pd-start">

      <img className="pd-img" src={`http://localhost:8080/Images/${product.imageUrl}`} alt={product.name}/>

      <h2 className="pd-title">{product.name}</h2>

      <p className="pd-info">Brand: {product.brand}</p>
      <p className="pd-info">Category: {product.category}</p>

      <p className="pd-price">₹{product.price}</p>

      <p className={`pd-stock ${product.stock > 0 ? "in-stock" : "out-stock"}`}>
        {product.stock > 0 ? "In Stock" : "Out of Stock"}
      </p>

      <p className="pd-desc">{product.description}</p>

      <div className="pd-btn-group">

        <button className="pd-cart-btn" disabled={product.stock === 0} onClick={() => handleToAdd(product.id)} >
          Add to Cart
        </button>

        <button
          className="pd-buy-btn"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>

      </div>

      {showPopup && (
        <div className="pd-modal-overlay">
          <div className="pd-modal">

            <h3>Confirm Purchase</h3>

            <p>Do you want to buy this product?</p>

            <button className="pd-confirm-btn" onClick={proceedToBuy}>
              Proceed to Buy
            </button>

            <button className="pd-cancel-btn" onClick={() => setShowPopup(false)}>
              Cancel
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default ProductDetails;