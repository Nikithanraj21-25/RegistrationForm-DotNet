import axios from "axios";
import { useState, useEffect } from "react";
import "./RegistrationForm.css"

const API_BASE_URL = "http://localhost:5000/api/registration";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        fatherName: "",
        rollNumber: "",
        department: "",
        phoneNumber: "",
        address: "",
    });
    
    const [users, setUsers] = useState([]);  // Store user data
    const [editingUserId, setEditingUserId] = useState(null); // Track if editing a user

    // Fetch all registered users
    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission for creating or updating user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUserId) {
                // Update existing user
                await axios.put(`${API_BASE_URL}/${editingUserId}`, formData);
                alert("User updated successfully!");
                setEditingUserId(null);
            } else {
                // Create new user
                await axios.post(API_BASE_URL, formData);
                alert("Registration successful!");
            }

            setFormData({ name: "",fatherName: "", rollNumber: "", department: "", phoneNumber: "", address: "" });
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error("API Error:", error);
            alert("Operation failed!");
        }
    };

    // Handle deleting a user
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            alert("User deleted successfully!");
            fetchUsers(); // Refresh list after deletion
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user");
        }
    };

    // Handle editing a user
    const handleEdit = (user) => {
        setFormData(user);
        setEditingUserId(user.id);
    };

    return (
        <div className="container">
            <div className="form-card">
                <h2>{editingUserId ? "Edit User" : "Registration Form"}</h2>
                <form onSubmit={handleSubmit} className="form">
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    <input type="text" name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleChange} required />
                    <input type="text" name="rollNumber" placeholder="Roll Number" value={formData.rollNumber} onChange={handleChange} required />
                    <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
                    <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
                    <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} required></textarea>
                    <button type="submit">{editingUserId ? "Update User" : "Register"}</button>
                </form>
            </div>

            <div className="user-table">
                <h2>Registered Users</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Father's Name</th>
                            <th>Roll Number</th>
                            <th>Department</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.fatherName}</td>
                                    <td>{user.rollNumber}</td>
                                    <td>{user.department}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="no-users">No registered users yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default RegistrationForm;
