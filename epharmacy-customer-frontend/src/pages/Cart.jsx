import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Cart() {
    const [cart, setCart] = useState([]);

    const loadCart = async () => {
        try {
            const res = await API.get("/cart");
            setCart(res.data);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to load cart");
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const updateQuantity = async (id, quantity) => {
        if (quantity < 1) {
            alert("Quantity must be at least 1");
            return;
        }

        try {
            await API.patch(`/cart/${id}`, { quantity });
            loadCart();
        } catch (error) {
            alert(error.response?.data?.message || "Quantity update failed");
        }
    };

    const removeItem = async (id) => {
        try {
            await API.delete(`/cart/${id}`);
            loadCart();
        } catch (error) {
            alert(error.response?.data?.message || "Remove failed");
        }
    };

    const placeOrder = async () => {
        try {
            await API.post("/orders");
            alert("Order placed successfully");
            loadCart();
        } catch (error) {
            alert(error.response?.data?.message || "Order failed");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className="page">
            <nav>
                <h2>My Cart</h2>

                <div>
                    <Link to="/medicines">Medicines</Link>

                    <Link to="/orders">Orders</Link>

                    <button onClick={logout}>Logout</button>
                </div>
            </nav>

            {cart.length === 0 ? (
                <h3>Your cart is empty</h3>
            ) : (
                <>
                    {cart.map((item) => (
                        <div className="listCard" key={item.id}>
                            {item.medicine?.image && (
                                <img
                                    src={item.medicine.image}
                                    alt={item.medicine.name}
                                    className="medicineImage"
                                />
                            )}

                            <h3>{item.medicine?.name}</h3>

                            <p>Price: ৳{item.medicine?.price}</p>

                            <div className="quantityBox">
                                <button
                                    onClick={() =>
                                        updateQuantity(item.id, item.quantity - 1)
                                    }
                                >
                                    -
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                    onClick={() =>
                                        updateQuantity(item.id, item.quantity + 1)
                                    }
                                >
                                    +
                                </button>
                            </div>

                            <p>
                                Total: ৳
                                {Number(item.medicine?.price) * item.quantity}
                            </p>

                            <button onClick={() => removeItem(item.id)}>
                                Remove
                            </button>
                        </div>
                    ))}

                    <button onClick={placeOrder}>Place Order</button>
                </>
            )}

            <footer className="footer">
                <p>© 2026 ePharmacy Customer Portal</p>
            </footer>
        </div>
    );
}

export default Cart;