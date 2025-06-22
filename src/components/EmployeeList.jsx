export default function EmployeeList({ employees, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6 w-full overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Employee List</h2>
      <table className="w-full table-auto border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id} className="border-t">
              <td className="p-2">{emp.name}</td>
              <td className="p-2">{emp.email}</td>
              <td className="p-2">{emp.role}</td>
              <td className="p-2 flex flex-wrap gap-2">
                <button onClick={() => onEdit(emp)} className="px-3 py-1 text-sm bg-yellow-500 text-white rounded">
                  Edit
                </button>
                <button onClick={() => onDelete(emp._id)} className="px-3 py-1 text-sm bg-red-600 text-white rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
