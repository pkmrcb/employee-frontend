import { useState, useEffect } from 'react';
import API from '../utils/api';

export default function Profile() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    API.get('/profile').then(res => setUser(res.data));
  }, []);

  const save = async () => {
    const { name, email } = user;
    await API.put('/profile', { name, email });
    setEditing(false);
    alert('Updated!');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold">Your Profile</h2>
        <input disabled={!editing} className="w-full p-3 border rounded" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />
        <input disabled={!editing} className="w-full p-3 border rounded" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
        {editing ? (
          <button onClick={save} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Save</button>
        ) : (
          <button onClick={() => setEditing(true)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">Edit Profile</button>
        )}
      </div>
    </div>
  );
}
