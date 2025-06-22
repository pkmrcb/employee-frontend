import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import API from '../utils/api';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
    }
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data } = await API.get('/employees');
      setEmployees(data);
    } catch (err) {
      console.error('Access denied or fetch error:', err);
    }
  };

  const handleSave = async (formData, id) => {
    if (id) {
      await API.put(`/employees/${id}`, formData);
    } else {
      await API.post('/employees', formData);
    }
    setEditingEmployee(null);
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    await API.delete(`/employees/${id}`);
    fetchEmployees();
  };

  const handleEdit = (emp) => setEditingEmployee(emp);

  useEffect(() => {
    if (role === 'admin') {
      fetchEmployees();
    }
  }, [role]);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto w-full">
        {role === 'admin' ? (
          <div className="space-y-6">
            <EmployeeForm onSave={handleSave} editingEmployee={editingEmployee} />
            <EmployeeList
              employees={employees}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        ) : (
          <div className="text-center text-lg sm:text-xl text-red-500 font-semibold">
            You do not have permission to view this page.
          </div>
        )}
      </div>
    </div>
  );
}
