import { useState, useEffect, useCallback } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCartItems = useCallback(async () => {
        try {
            setLoading(true);

            const response = await api.get("/cart");

            if (response.data.length === 0) {
                toast.info("No items in cart");
            }

            setCartItems(response.data);
        } 
        catch (err) {
            toast.error("User not found. Please login");
            navigate("/login");
        } 
        finally {
            setLoading(false);
        }
    }, [navigate]);


    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);

    const removeFromCart = async (id) => {
        setCartItems(prev => {
            if (!prev) return prev;

            const updatedItems = prev.items
                .map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0);

            const price = updatedItems.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
            );

            const totalItems = updatedItems.reduce(
                (sum, item) => sum + item.quantity,
                0
            );

            const discount = price * 0.10;
            const totalPrice = price - discount;

            return {
                ...prev,
                items: updatedItems,
                price,
                totalItems,
                discount,
                totalPrice
            };
        });

        try {
            await api.delete(`/cart/remove/${id}`);
        } catch (err) {
            toast.error("Failed. Refreshing...");
            fetchCartItems();
        }
    };

    const placeOrder = async()=>{
        try{
            const response = await api.post("/payment/create-order");
            const data = response.data;
            console.log(data);
            const options = {

                key: data.key,

                amount: data.amount,

                currency: data.currency,

                order_id: data.razorPayOrderId,

                name: "SRK Store",

                description: "Order Payment",

                handler: async function(response){
                    try{
                        await api.post("/payment/verify", {
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                            dbOrderId: data.dbOrderId
                        });

                        toast.success("Payment Successful");

                        fetchCartItems();

                        navigate("/orders");

                    }catch(err){
                        toast.error("Payment verification failed");
                        }
                },

                theme: {
                    color: "#3399cc"
                }
            };

        const razorpay = new window.Razorpay(options);

        razorpay.open();


        }catch(err){
            console.log(err.message);
            toast.error("failed to start payment");
        }


    }
   

    if (loading) {
        return <h1>your cart is loading</h1>;
    }

    if (!cartItems || cartItems.items.length === 0) {
        return (
            <div className="orders-empty">
                <h3>Your cart is empty</h3>
                <p>Add items to it now</p>
                <button
                    onClick={() => navigate("/home")}
                    className="cart-shop-button"
                >
                    Shop now
                </button>
            </div>
        );
    }

    return (
    <div className="shopping-cart-page">
        <div className="shopping-cart-layout">
            <div className="shopping-cart-left">
                <div className="shopping-cart-list">
                    {cartItems.items.map(item => (
                        <div key={item.id} className="shopping-cart-card">
                            <div className="shopping-cart-image-box">
                                <img
                                    src={`http://localhost:8080/Images/${item.product.imageUrl}`}
                                    alt={item.product.name}
                                    className="shopping-cart-image"
                                    onClick={()=>navigate(`/products/${item.product.id}`)}
                                />
                            </div>

                            <div className="shopping-cart-info">
                                <h2>{item.product.name}</h2>
                                <p>{item.product.category}</p>
                                <p>₹{item.product.price}</p>
                                <p>Quantity: {item.quantity}</p>

                                <button className="shopping-cart-remove-btn" onClick={() => removeFromCart(item.id)} >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="shopping-cart-footer">
                    <button className="shopping-cart-order-btn" onClick={placeOrder}>
                        Place Order
                    </button>
                </div>
            </div>

            <div className="shopping-cart-summary">
                <h3 className="shopping-cart-summary-title">Price Details</h3>

                <div className="shopping-cart-summary-body">
                    <div className="shopping-cart-row">
                        <span>Items</span>
                        <strong>{cartItems.totalItems}</strong>
                    </div>

                    <div className="shopping-cart-row">
                        <span>Price</span>
                        <strong>₹{cartItems.price}</strong>
                    </div>

                    <div className="shopping-cart-row">
                        <span>Discount</span>
                        <strong className="shopping-cart-green">-₹{cartItems.discount}</strong>
                    </div>

                    <div className="shopping-cart-row">
                        <span>Coupons</span>
                        <strong>No coupons available</strong>
                    </div>
                </div>

                <div className="shopping-cart-total">
                    <span>Total Amount</span>
                    <strong>₹{cartItems.totalPrice}</strong>
                </div>

                <p className="shopping-cart-save-text">
                    You will save ₹{cartItems.discount} on this order
                </p>
            </div>
        </div>
    </div>
);
}

export default Cart;