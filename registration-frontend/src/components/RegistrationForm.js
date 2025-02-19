import axios from "axios";
import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:5000/api/registration";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: "",
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

            setFormData({ name: "", rollNumber: "", department: "", phoneNumber: "", address: "" });
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
        <div>
            <h2>{editingUserId ? "Edit User" : "Registration Form"}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br />
                <input type="text" name="rollNumber" placeholder="Roll Number" value={formData.rollNumber} onChange={handleChange} required /><br />
                <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} required /><br />
                <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required /><br />
                <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} required></textarea><br />
                <button type="submit">{editingUserId ? "Update User" : "Register"}</button>
            </form>

            <h2>Registered Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.rollNumber} - {user.department} - {user.phoneNumber} - {user.address}
                        <button onClick={() => handleEdit(user)}>Edit</button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RegistrationForm;
