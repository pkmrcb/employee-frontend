import { useState, useEffect } from 'react';
import API from '../utils/api';

export default function Profile() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    API.get('/profile').then((res) => setUser(res.data));
  }, []);

  const save = async () => {
    const { name, email } = user;
    await API.put('/profile', { name, email });
    setEditing(false);
    alert('Updated!');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-lg w-full mx-auto bg-white p-6 sm:p-8 rounded-lg shadow space-y-5">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-700">Your Profile</h2>

        <input
          disabled={!editing}
          className={`w-full p-3 border rounded ${
            editing ? 'focus:outline-none focus:ring-2 focus:ring-blue-400' : 'bg-gray-100'
          }`}
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          disabled={!editing}
          className={`w-full p-3 border rounded ${
            editing ? 'focus:outline-none focus:ring-2 focus:ring-blue-400' : 'bg-gray-100'
          }`}
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        {editing ? (
          <button
            onClick={save}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition duration-200"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
