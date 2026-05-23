import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";
import "./OrdersAdmin.css";

function OrdersAdmin() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const res = await api.get("/admin/orders");

            setOrders(res.data);

        } catch (err) {

            toast.error("Failed to load orders");
        }
    };

    const updateStatus = async (orderId, orderStatus) => {

        try {

            await api.put(
                `/admin/orders/${orderId}/status`,
                { orderStatus }
            );

            setOrders((prev) =>
                prev.map((order) =>
                    order.orderId === orderId
                        ? { ...order, orderStatus }
                        : order
                )
            );

            toast.success("Status updated");

        } catch (err) {

            toast.error("Update failed");
        }
    };

    const deleteOrder = async (orderId) => {

        try {

            await api.delete(`/admin/orders/${orderId}`);

            setOrders((prev) =>
                prev.filter((order) => order.orderId !== orderId)
            );

            toast.success("Order deleted");

        } catch (err) {

            toast.error("Delete failed");
        }
    };

    return (

        <div className="orders-container">

            <h2>
                Order Management
            </h2>

            {orders.map((order) => (

                <div
                    className="orders-card"
                    key={order.orderId}
                >

                    <div className="orders-info">

                        <h3>
                            Order #{order.orderId}
                        </h3>

                        <p>
                            User ID: {order.userId}
                        </p>

                        <p>
                            Amount: ₹{order.amount}
                        </p>

                        <p>
                            Payment Status: {order.status}
                        </p>

                        <p>
                            Order Status: {order.orderStatus}
                        </p>

                        <p>
                            Payment ID: {order.paymentId}
                        </p>

                    </div>

                    <div className="orders-actions">

                        <select
                            value={order.orderStatus}
                            onChange={(e) =>
                                updateStatus(
                                    order.orderId,
                                    e.target.value
                                )
                            }
                        >

                            <option value="PLACED">
                                PLACED
                            </option>

                            <option value="CONFIRMED">
                                CONFIRMED
                            </option>

                            <option value="SHIPPED">
                                SHIPPED
                            </option>

                            <option value="DELIVERED">
                                DELIVERED
                            </option>

                            <option value="CANCELLED">
                                CANCELLED
                            </option>

                        </select>

                        <button
                            className="delete-btn"
                            onClick={() =>
                                deleteOrder(order.orderId)
                            }
                        >
                            Delete
                        </button>

                    </div>

                </div>
            ))}

        </div>
    );
}

export default OrdersAdmin;