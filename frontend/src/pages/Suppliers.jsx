import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();
  const fetchSuppliers = async () => {
    try {
      const res = await API.get('/suppliers');

      setSuppliers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const deleteSupplier = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this supplier?',
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/suppliers/${id}`);

      alert('Supplier Deleted');

      fetchSuppliers();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          'Delete Failed',
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
  onClick={() => navigate('/dashboard')}
  className="bg-gray-700 text-white px-4 py-2 rounded mb-5"
>
  Back to Dashboard
</button>
      <h1 className="text-4xl font-bold mb-8">
        Suppliers List
      </h1>

      <div className="bg-white p-6 rounded shadow">
        {suppliers.length === 0 ? (
          <p>No suppliers found.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>

                <th className="border p-2">Phone</th>

                <th className="border p-2">Address</th>

                <th className="border p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td className="border p-2">
                    {supplier.name}
                  </td>

                  <td className="border p-2">
                    {supplier.phone}
                  </td>

                  <td className="border p-2">
                    {supplier.address}
                  </td>

                  <td className="border p-2">
                    <button
                      onClick={() =>
                        deleteSupplier(supplier.id)
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded"
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

export default Suppliers;