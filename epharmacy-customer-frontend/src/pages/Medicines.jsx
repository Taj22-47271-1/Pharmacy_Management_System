import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Medicines() {
    const [medicines, setMedicines] = useState([]);
    const [search, setSearch] = useState("");

    const loadMedicines = async () => {
        try {
            const res = await API.get(`/medicines?search=${search}`);
            setMedicines(res.data);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to load medicines");
        }
    };

    useEffect(() => {
        loadMedicines();
    }, []);

    const addToCart = async (medicineId) => {
        try {
            await API.post("/cart", {
                medicineId,
                quantity: 1,
            });

            alert("Medicine added to cart");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to add cart");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div className="page">
            <nav>
                <h2>ePharmacy</h2>

                <div>
                    <Link to="/cart">Cart</Link>

                    <Link to="/orders">Orders</Link>

                    <button onClick={logout}>Logout</button>
                </div>
            </nav>

            <div className="searchBox">
                <input
                    type="text"
                    placeholder="Search medicine"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button onClick={loadMedicines}>Search</button>
            </div>

            <div className="grid">
                {medicines.length === 0 ? (
                    <h3>No medicines found</h3>
                ) : (
                    medicines.map((medicine) => (
                        <div className="medicineCard" key={medicine.id}>
                            {medicine.image && (
                                <img
                                    src={medicine.image}
                                    alt={medicine.name}
                                    className="medicineImage"
                                />
                            )}

                            <h3>{medicine.name}</h3>

                            <p>
                                <strong>Category:</strong> {medicine.category}
                            </p>

                            <p>
                                <strong>Price:</strong> ৳{medicine.price}
                            </p>

                            <p>
                                <strong>Stock:</strong> {medicine.quantity}
                            </p>

                            <p>{medicine.description}</p>

                            <button onClick={() => addToCart(medicine.id)}>
                                Add To Cart
                            </button>
                        </div>
                    ))
                )}
            </div>

            <footer className="footer">
                <p>© 2026 ePharmacy Customer Portal</p>
            </footer>
        </div>
    );
}

export default Medicines;