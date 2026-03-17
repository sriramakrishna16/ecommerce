import api from "../api/axiosConfig";
import {useState,useEffect} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import "./Orders.css";


function Orders(){
    const [orders,setOrders] = useState([]);
    const [loading , setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchOrders = async ()=>{
        try {
            const response = await api.get("/orders")
            setOrders(response.data);
            console.log(response.data);

        }catch(err){
            toast.error("something went wrong");
        }finally{
            setLoading(false)
        }
    };

    useEffect(()=>{
        fetchOrders();
    },[]);

    if(loading){
        return <h1>Loading orders...</h1>; 
    }

    if(!orders || orders.length === 0){
    return (
        <div className="orders-empty">
        <h3>No Orders Yet</h3>
        <p>Start shopping now</p>

        <button
            onClick={() => navigate("/home")}
            className="cart-shop-button" >
            Shop now
        </button>
        </div>
        );
    }

    return (
    <div>
         <h2 className = "orders-title">My Orders</h2>


        {orders.map(order => (
            <div className = "Orders-page">


                <div key={order.orderId} className = "order-card" >
                    <div className = "order-header" onClick={()=>navigate("/home")}>
                        <h2 className = "order-id">Order ID: #{order.orderId}</h2>
                         <div className = "field-seperation">
                            <h2 style={{fontWeight:"lighter"}} >Total Amount:</h2>
                            <h2 > ₹{order.amount}</h2>
                        </div>
                    </div>

                    <div className = "each-item">
                    
                    {order.items.map(item=>(
                        
                        <div key = {item.productId} className = "order-item" onClick={()=> navigate(`/orders/${order.orderId}`)}>
                            
                                <img src={`http://localhost:8080/Images/${item.imageUrl}`}
                                alt={item.productName}
                                className="order-img" />
                                
                            <div className = "order-info">    
                                <h3 style={{fontWeight:"lighter"}}>Name : {item.productName}</h3>
                                <div className = "field-seperation">
                                <h3 style={{fontWeight:"lighter"}}>Brand :</h3>
                                <h3>{item.productBrand}</h3>
                                </div>
                                <div className = "field-seperation">
                                <h3 style={{fontWeight:"lighter"}}>Price :</h3>
                                <h3>{item.Price}</h3>
                                </div>

                                <h3 style={{fontWeight:"lighter"}}>Quantity: {item.quantity}</h3>
                            </div>
                        </div>
                    ))}
                    </div>

                    <hr />
                    <br/>
                    <div className = "order-details" onClick={()=>navigate(`/orders/${order.orderId}`)}>
                        <div>
                    <h3 className = "color-green">Order Placed Successfully</h3>
                    <h5>on SRK Ecommerce</h5>
                    </div>
                    <div>
                    <h3 className = "color-green">Total Amount Paid: ₹{order.amount}/-</h3>
                    <h5>on {new Date(order.orderDate).toLocaleString("en-IN",
                        {day: "numeric", month : "short", year: "numeric" , hour:"numeric", minute: "2-digit"}
                    )}</h5>
                    </div>
                    </div>


                </div>
            </div>

        ))}

    </div>
);

}

export default Orders;