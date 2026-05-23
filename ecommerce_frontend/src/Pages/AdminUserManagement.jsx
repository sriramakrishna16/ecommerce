import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";
import "./UsersAdmin.css";

function UsersAdmin() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editingUser, setEditingUser] = useState(null);

    const [formData, setFormData] = useState({
        username: "",
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await api.get("/admin/users");
            setUsers(res.data);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            username: user.username || "",
            name: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            role: user.role || "",
            address: user.address || ""
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async () => {
       try{
        await api.put(`/admin/users/update/${editingUser.username}`, formData);

        setUsers((prev) =>
            prev.map((u) =>
                u.id === editingUser.id ? { ...u, ...formData } : u
            )
        );
        setEditingUser(null);
        toast.success("updated successfully")
    }catch(err){
        toast.error("update failed");
        console.error("update failed", err.message);
    }
    };

    const handleDelete = async (username) => {
        try{
        await api.delete(`/admin/users/delete/${username}`);
        setUsers((prev) => prev.filter((u) => u.username !== username));
        toast.success("user deleted successfully");
        }catch(err){
            toast.error("request failed", err.message);
        }

    };

    if (loading) return <div className="users-container">Loading...</div>;

    return (
        <div className="users-container">
            <h2>User Management</h2>

            {users.map((user) => (
                <div className="users-card" key={user.id}>
                    <div>
                        <strong>{user.name}</strong>
                        <div>{user.email}</div>
                        <div>{user.phone}</div>
                    </div>

                    <div className="users-actions">
                        <button
                            className="users-edit-btn"
                            onClick={() => handleEdit(user)}
                        >
                            Edit
                        </button>

                        <button
                            className="users-delete-btn"
                            onClick={() => handleDelete(user.username)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {editingUser && (
                <div className="users-modal-overlay">
                    <div className="users-modal">
                        <h3>Edit User ({formData.username})</h3>
                        <div className="users-form">

                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Role</label>
                                <input
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3"
                                />
                            </div>

                        </div>

                        <div className="users-modal-actions">
                            <button
                                className="users-edit-btn"
                                onClick={handleUpdate}
                            >
                                Save
                            </button>

                            <button
                                className="users-delete-btn"
                                onClick={() => setEditingUser(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UsersAdmin;