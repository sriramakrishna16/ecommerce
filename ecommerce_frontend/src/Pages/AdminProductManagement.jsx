import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import "./ProductsAdmin.css";

function ProductsAdmin() {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        name: "",
        brand: "",
        category: "",
        price: "",
        stock: ""
    });

    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const result = await api.get("/admin/products");
            setProducts(result.data);
        } catch (error) {
            console.error("Error loading products:", error);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append(
            "product",
            new Blob([JSON.stringify(form)], {
                type: "application/json"
            })
        );

        formData.append("image", image);

        try {
            await api.post("/admin/products/add", formData);

            setShowForm(false);

            setForm({
                name: "",
                brand: "",
                category: "",
                price: "",
                stock: ""
            });

            setImage(null);

            fetchProducts();

        } catch (error) {
            console.error("Add product error:", error);
        }
    };

    return (
        <div className="admin-products-container">

            <h1>Manage Products</h1>

            <button className="add-btn" onClick={() => setShowForm(true)}>
                + Add Product
            </button>

            {showForm && (
                <div className="modal">
                    <form className="product-form" onSubmit={handleSubmit}>

                        <h2>Add Product</h2>

                        <input
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="brand"
                            placeholder="Brand"
                            value={form.brand}
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="category"
                            placeholder="Category"
                            value={form.category}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={form.stock}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                        />

                        <div className="form-actions">
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setShowForm(false)}>
                                Cancel
                            </button>
                        </div>

                    </form>
                </div>
            )}

            <table className="products-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>
                                <img
                                    src={`http://localhost:8080/Images/${product.imageUrl}`}
                                    alt={product.name}
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        objectFit: "cover"
                                    }}
                                />
                            </td>

                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.category}</td>
                            <td>₹ {product.price}</td>
                            <td>{product.stock}</td>

                            <td>
                                <button className="edit-btn">Edit</button>
                                <button className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default ProductsAdmin;