import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import "./ProductsAdmin.css";
import { toast } from "react-toastify";


function ProductsAdmin() {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

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

    const handleToDelete = async() =>{
        try{
           await api.delete(`/admin/product/remove/${deleteId}`);
           toast.success("Product deleted successfully");
           setShowDeleteModal(false);
           setDeleteId(null);
           fetchProducts();

        }catch(err){
            console.log(err.message);
            toast.error("Failed to delete");
        }
    }

    const handleToEdit = async(product) => {
        setForm({
            name: product.name,
            brand: product.brand,
            category: product.category,
            price: product.price,
            stock: product.stock
        });
        setPreviewImage(product.imageUrl);
        setEditId(product.id);
        setIsEdit(true);
        setShowForm(true);
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

    if (image) {
        formData.append("image", image);
    }

    try {
        if (isEdit) {
            await api.put(`/admin/product/update/${editId}`, formData);
            toast.success("Product updated successfully");
        } else {
            await api.post("/admin/products/add", formData);
            toast.success("Product added successfully");
        }

        setShowForm(false);
        setIsEdit(false);
        setEditId(null);

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
        console.error(error);
        toast.error("Operation failed");
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

                        <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>
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
                        {isEdit && previewImage && (
                            <div style={{ marginBottom: "10px" }}>
                                <img
                                    src={`http://localhost:8080/Images/${previewImage}`}
                                    alt="preview"
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        objectFit: "cover",
                                        borderRadius: "6px"
                                    }}
                                />
                            </div>
                        )}

                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />

                        <div className="form-actions">
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => {setShowForm(false);
                                setPreviewImage(null);
                                setImage(null);
                                setIsEdit(false);
                                setEditId(null);
                            }}>
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
                                <button className="edit-btn"
                                onClick = {() => {handleToEdit(product)}}>Edit</button>
                                <button className="delete-btn"
                                onClick = {()=> {setDeleteId(product.id);
                                    setShowDeleteModal(true);
                                }}>Delete</button>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>

            {showDeleteModal && (
                    <div className="modal">
                        <div className="delete-modal">
                            <h2>Warning</h2>
                            <p>This action will permanently delete the product.</p>
                            <p> This cannot be undone.</p>
                            <div className="form-actions">
                                <button
                                    className="cancel-btn"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setDeleteId(null);
                                    }}>Cancel</button>
                                <button
                                    className="delete-confirm-btn"
                                    onClick={handleToDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </div>   
    );
}

export default ProductsAdmin;