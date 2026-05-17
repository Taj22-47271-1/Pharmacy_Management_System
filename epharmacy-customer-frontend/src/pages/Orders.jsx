import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Orders() {
    const [orders, setOrders] = useState([]);

    const loadOrders = async () => {
        try {
            const res = await API.get("/orders/my-orders");
            setOrders(res.data);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to load orders");
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className="page">
            <nav>
                <h2>My Orders</h2>

                <div>
                    <Link to="/medicines">Medicines</Link>
                    <Link to="/cart">Cart</Link>
                    <button onClick={logout}>Logout</button>
                </div>
            </nav>

            {orders.length === 0 ? (
                <h3>No orders found</h3>
            ) : (
                orders.map((order) => (
                    <div className="listCard" key={order.id}>
                        {order.medicine?.image && (
                            <img
                                src={order.medicine.image}
                                alt={order.medicine.name}
                                className="medicineImage"
                            />
                        )}

                        <h3>{order.medicine?.name}</h3>
                        <p>Quantity: {order.quantity}</p>
                        <p>Total Price: ৳{order.totalPrice}</p>
                        <p>Status: {order.status}</p>
                    </div>
                ))
            )}

            <footer className="footer">
                <p>© 2026 ePharmacy Customer Portal</p>
            </footer>
        </div>
    );
}

export default Orders;