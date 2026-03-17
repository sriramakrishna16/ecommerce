import api from "../api/axiosConfig";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "./OrderDetails.css";

function OrderDetails() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const { orderId} = useParams();
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(null);
  const [showMenu , setShowMenu] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      setOrders(response.data);
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [orderId]);

  const handleCancelItem = async (orderItemId) => {
    try {
      await api.delete(`/orders/${orderId}/cancel/${orderItemId}`);
      
      if (orders.item.length === 1) {
        toast.info("Order removed");
        navigate("/orders");
        return;
      }

      toast.success("Item cancelled");
      fetchOrders();
      setShowMenu(false);
      
    } catch (err) {
      toast.error("Failed to cancel item");
    }
  }; 

  const deleteOrder = async (orderId) => {
    try{
      await api.delete(`/orders/${orderId}`);
      navigate("/orders");
      toast.info("order cancelled");
    }
    catch(err){
      toast.error("failed to cancel order");
    }
  }

  if (loading) {
    return <div className="order-details-page"><p>Loading...</p></div>;
  }

  
  const items = orders.item || [];

  return (
    <div className="order-details-page">
      <div className="order-details-card">

        <p className="order-details-id">
          
          Order ID: <span>#{orders.orderId}</span>
        </p>

        {items.length === 0 && <p>No items found.</p>}

        {items.map((i) => (
          <div key={i.orderItemId} className="order-item" onClick = {()=>{setSelectedItem(i); setShowMenu(true)}}>
            <span className="item-name" >{i.productName}</span>
            <span className="item-qty">Qty: {i.quantity}</span>
            <span className="item-price">₹{i.price * i.quantity}</span>
          </div>
        ))}

        <div className="order-total">
          <span>Total Amount Paid</span>
          <span>₹{orders.totalPrice}</span>
        </div>

      </div>

      {showMenu && selectedItem && (
        <div className="popup-menu">
          <div className="popup-card">

            <h4>{selectedItem.productName}</h4>

            <button
              onClick={() => {
                navigate(`/products/${selectedItem.productId}`);
                setShowMenu(false);
              }}
            >
              View Product Details
            </button>

            <button
              className="delete-btn"
              onClick={() => handleCancelItem(selectedItem.orderItemId)}
            >
              Cancel Item
            </button>

            <button onClick={() => setShowMenu(false)}>
              Close
            </button>

          </div>
        </div>
      )}
      <button className="cancel-order-all" onClick = {()=> deleteOrder(orderId)}>Cancel order</button>
    </div>
  );
}

export default OrderDetails;