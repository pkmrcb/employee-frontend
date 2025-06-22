import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-lg w-full border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center flex-wrap gap-4">
        <Link to="/" className="text-2xl font-extrabold text-blue-700 tracking-wide">
          Employee<span className="text-indigo-500">Manager</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-4">
          {token ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600">Dashboard</Link>
              <Link to="/profile" className="text-gray-600 hover:text-indigo-600">Profile</Link>
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
              <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
