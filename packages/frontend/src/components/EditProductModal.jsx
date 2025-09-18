import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";

export default function EditProductModal({ product, show, handleClose, fetchProducts }) {
    const [form, setForm] = useState({ name: "", price: "", stock: "" });

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name,
                price: product.price,
                stock: product.stock,
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.patch(`/products/${product.id}`, {
                name: form.name,
                price: parseFloat(form.price),
                stock: parseInt(form.stock),
            });
            toast.success("Product updated!");
            handleClose();
            fetchProducts();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update product");
        }
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleUpdate}>
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Product</h5>
                            <button type="button" className="btn-close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={form.stock}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
