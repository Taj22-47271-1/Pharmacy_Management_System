import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Dashboard() {
  const navigate = useNavigate();

  const [medicines, setMedicines] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [supplierForm, setSupplierForm] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const [medicineForm, setMedicineForm] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    expiryDate: '',
    supplierId: '',
  });

  const fetchData = async () => {
    try {
      const medRes = await API.get('/medicines');
      const supRes = await API.get('/suppliers');

      setMedicines(medRes.data);
      setSuppliers(supRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addSupplier = async (e) => {
    e.preventDefault();

    try {
      await API.post('/suppliers', supplierForm);
      alert('Supplier Added');

      setSupplierForm({
        name: '',
        phone: '',
        address: '',
      });

      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Supplier add failed');
    }
  };

  const addMedicine = async (e) => {
    e.preventDefault();

    try {
      await API.post('/medicines', {
        name: medicineForm.name,
        category: medicineForm.category,
        price: Number(medicineForm.price),
        quantity: Number(medicineForm.quantity),
        expiryDate: medicineForm.expiryDate,
        supplierId: Number(medicineForm.supplierId),
      });

      alert('Medicine Added');

      setMedicineForm({
        name: '',
        category: '',
        price: '',
        quantity: '',
        expiryDate: '',
        supplierId: '',
      });

      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Medicine add failed');
    }
  };

  const deleteMedicine = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this medicine?',
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/medicines/${id}`);
      alert('Medicine Deleted');
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const lowStockCount = medicines.filter(
    (medicine) => Number(medicine.quantity) <= 10,
  ).length;

  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <h1 className="dashboard-title">Pharmacy Admin Dashboard</h1>

        <div className="top-buttons">
          <button
            type="button"
            onClick={() => navigate('/suppliers')}
            className="supplier-btn"
          >
            Suppliers
          </button>

          <button
            type="button"
            onClick={() => navigate('/change-password')}
            className="password-btn"
          >
            Change Password
          </button>

          <button
            type="button"
            onClick={logout}
            className="logout-btn"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>Total Medicines</h2>
          <p>{medicines.length}</p>
        </div>

        <div className="stat-card">
          <h2>Total Suppliers</h2>
          <p>{suppliers.length}</p>
        </div>

        <div className="stat-card">
          <h2>Low Stock</h2>
          <p className="low-stock">{lowStockCount}</p>
        </div>
      </div>

      <div className="forms-grid">
        <form onSubmit={addSupplier} className="form-card">
          <h2>Add Supplier</h2>

          <input
            type="text"
            placeholder="Supplier Name"
            value={supplierForm.name}
            onChange={(e) =>
              setSupplierForm({
                ...supplierForm,
                name: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Phone"
            value={supplierForm.phone}
            onChange={(e) =>
              setSupplierForm({
                ...supplierForm,
                phone: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Address"
            value={supplierForm.address}
            onChange={(e) =>
              setSupplierForm({
                ...supplierForm,
                address: e.target.value,
              })
            }
            required
          />

          <button type="submit" className="add-supplier-btn">
            Add Supplier
          </button>
        </form>

        <form onSubmit={addMedicine} className="form-card">
          <h2>Add Medicine</h2>

          <input
            type="text"
            placeholder="Medicine Name"
            value={medicineForm.name}
            onChange={(e) =>
              setMedicineForm({
                ...medicineForm,
                name: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={medicineForm.category}
            onChange={(e) =>
              setMedicineForm({
                ...medicineForm,
                category: e.target.value,
              })
            }
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={medicineForm.price}
            onChange={(e) =>
              setMedicineForm({
                ...medicineForm,
                price: e.target.value,
              })
            }
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            value={medicineForm.quantity}
            onChange={(e) =>
              setMedicineForm({
                ...medicineForm,
                quantity: e.target.value,
              })
            }
            required
          />

          <input
            type="date"
            value={medicineForm.expiryDate}
            onChange={(e) =>
              setMedicineForm({
                ...medicineForm,
                expiryDate: e.target.value,
              })
            }
            required
          />

          <select
            value={medicineForm.supplierId}
            onChange={(e) =>
              setMedicineForm({
                ...medicineForm,
                supplierId: e.target.value,
              })
            }
            required
          >
            <option value="">Select Supplier</option>

            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>

          <button type="submit" className="add-medicine-btn">
            Add Medicine
          </button>
        </form>
      </div>

      <div className="table-card">
        <h2>Medicine List</h2>

        {medicines.length === 0 ? (
          <p className="empty-text">No medicines found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Supplier</th>
                <th>Expiry</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {medicines.map((medicine) => (
                <tr key={medicine.id}>
                  <td>{medicine.name}</td>
                  <td>{medicine.category}</td>
                  <td>{medicine.price}</td>
                  <td>{medicine.quantity}</td>
                  <td>{medicine.supplier?.name || 'N/A'}</td>
                  <td>{medicine.expiryDate}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => deleteMedicine(medicine.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;