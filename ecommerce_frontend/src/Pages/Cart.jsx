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
            const response = await api.post("/cart/place");
            console.log("order placed", response.data);
            toast.success("Order Placed Successfully");
            fetchCartItems();
        }catch(err){
            toast.error("failed to place order");
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
        <div className="cart-background">
            <div className="cart-container">
                <div className="cart-left-section">
                    <div className="cart-items-wrapper">
                        {cartItems.items.map(item => (
                            <div key={item.id} className="cart-items">
                                <div className="product-img">
                                    <img
                                        src={`http://localhost:8080/Images/${item.product.imageUrl}`}
                                        alt={item.product.name}
                                        className="product-image-small"
                                    />
                                </div>
                                <div className="cart-product-info">
                                    <h1>{item.product.name}</h1>
                                    <h1>{item.product.category}</h1>
                                    <h1>{item.product.price}</h1>
                                    <h1>quantity: {item.quantity}</h1>
                                    <button onClick={() => removeFromCart(item.id)}>
                                        remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="place-order-footer">
                        <button className="place-order-btn" onClick ={placeOrder}>
                            Place Order
                        </button>
                    </div>

                    
                </div>

                <div className="cart-details">
                    <h5 className="cart-summary-heading">PRICE DETAILS</h5>
                    <div className="cart-details-middle">
                        <div className="cart-text">
                            <p>Items</p>
                            <b>{cartItems.totalItems}</b>
                        </div>
                        <div className="cart-text">
                            <p>Price</p>
                            <b>₹{cartItems.price}</b>
                        </div>
                        <div className="cart-text">
                            <p>Discount</p>
                            <b className="discount">-₹{cartItems.discount}</b>
                        </div>
                        <div className="cart-text">
                            <p>Coupons</p>
                            <b>no coupons available</b>
                        </div>
                    </div>
                    <div className="cart-total-amount">
                        <b>Total Amount</b>
                        <b>₹{cartItems.totalPrice}</b>
                    </div>
                    <div className="cart-text">
                        <b className="discount">
                            You will save ₹{cartItems.discount} on this order
                        </b>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;