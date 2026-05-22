import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const navigate = useNavigate();

    return(

        <div className="dashboard-container">

            <h1 className="dashboard-title">
                Admin Dashboard
            </h1>

            <div className="dashboard-cards">

                <button className="dashboard-card"
                onClick = {() => navigate("/admin/products")}>
                    Products
                </button>

                <button className="dashboard-card">
                    Users
                </button>

                <button className="dashboard-card">
                    Orders
                </button>

                <button className="dashboard-card">
                    Analytics
                </button>

            </div>

        </div>

    )
}

export default Dashboard;