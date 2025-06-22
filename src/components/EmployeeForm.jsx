import { useState, useEffect } from 'react';

export default function EmployeeForm({ onSave, editingEmployee }) {
  const [form, setForm] = useState({ name: '', email: '', role: '', password: '' });

  useEffect(() => {
    if (editingEmployee) {
      setForm({ name: editingEmployee.name, email: editingEmployee.email, role: editingEmployee.role });
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editingEmployee) {
      onSave(form);
    } else {
      const { password, ...formWithoutPassword } = form;
      onSave(formWithoutPassword, editingEmployee._id);
    }
    setForm({ name: '', email: '', role: '', password: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-center">
        {editingEmployee ? 'Edit Employee' : 'Add Employee'}
      </h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      {!editingEmployee && (
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      )}

      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {editingEmployee ? 'Update' : 'Add'}
      </button>
    </form>
  );
}
