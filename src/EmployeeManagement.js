import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    salary: '',
    designation: 'Permanent Employee',
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateEmployee = (e) => {
    e.preventDefault();
    const { name, id, salary, designation } = formData;

    if (!name || !id || !salary) {
      alert('Please fill in all fields.');
      return;
    }

    if (editingId !== null) {
      // Update existing employee
      setEmployees(
        employees.map((emp) =>
          emp.id === editingId ? { ...emp, name, salary, designation } : emp
        )
      );
      setEditingId(null);
    } else {
      // Check for duplicate ID
      if (employees.some((emp) => emp.id === id)) {
        alert('Employee ID already exists.');
        return;
      }
      // Add new employee
      setEmployees([...employees, { name, id, salary, designation }]);
    }

    // Reset form
    setFormData({
      name: '',
      id: '',
      salary: '',
      designation: 'Permanent Employee',
    });
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setEditingId(employee.id);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Employee Management</h2>
      <form onSubmit={handleAddOrUpdateEmployee} className="mb-4 p-4 border rounded shadow-sm bg-light">
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter employee name"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            placeholder="Enter employee ID"
            disabled={editingId !== null}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            className="form-control"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            placeholder="Enter employee salary"
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="designation">Designation</label>
          <select
            className="form-control"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
          >
            <option>Permanent Employee</option>
            <option>Contractual Employee</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {editingId !== null ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>
      <div>
        {employees.map((employee) => (
          <div key={employee.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{employee.name}</h5>
              <p className="card-text">ID: {employee.id}</p>
              <p className="card-text">Designation: {employee.designation}</p>
              <p className="card-text">Salary: ${parseFloat(employee.salary).toFixed(2)}</p>
              <button className="btn btn-warning me-2" onClick={() => handleEdit(employee)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(employee.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeManagement;
