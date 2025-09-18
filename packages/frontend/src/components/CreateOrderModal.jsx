import { useState } from "react";
import { toast } from "react-toastify";
import api from "../api";

export default function CreateOrderModal({ show, handleClose, fetchOrders }) {
    const [form, setForm] = useState({
        customerName: "",
        customerPhone: "",
        productId: "",
        qty: 1,
        rate: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post("/orders", {
                customer: [{ name: form.customerName, phone: form.customerPhone }],
                products: [{ productId: form.productId, qty: parseInt(form.qty), rate: parseFloat(form.rate) }],
                totalAmount: parseInt(form.qty) * parseFloat(form.rate),
            });
            toast.success("Order created!");
            handleClose();
            fetchOrders();
            setForm({ customerName: "", customerPhone: "", productId: "", qty: 1, rate: 0 });
        } catch (err) {
            console.error(err);
            toast.error("Failed to create order");
        }
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleCreate}>
                        <div className="modal-header">
                            <h5 className="modal-title">Create Order</h5>
                            <button type="button" className="btn-close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Customer Name</label>
                                <input
                                    type="text"
                                    name="customerName"
                                    value={form.customerName}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Customer Phone</label>
                                <input
                                    type="text"
                                    name="customerPhone"
                                    value={form.customerPhone}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Product Name</label>
                                <input
                                    type="text"
                                    name="productId"
                                    value={form.productId}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Quantity</label>
                                <input
                                    type="number"
                                    name="qty"
                                    value={form.qty}
                                    onChange={handleChange}
                                    className="form-control"
                                    min={1}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Rate</label>
                                <input
                                    type="number"
                                    name="rate"
                                    value={form.rate}
                                    onChange={handleChange}
                                    className="form-control"
                                    step="0.01"
                                    min={0}
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
