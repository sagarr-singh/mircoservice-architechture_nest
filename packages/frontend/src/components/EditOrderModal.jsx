import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";

export default function EditOrderModal({ order, show, handleClose, fetchOrders }) {
    const [form, setForm] = useState({
        customerName: "",
        customerPhone: "",
        productId: "",
        qty: 1,
        rate: 0,
    });

    useEffect(() => {
        if (order) {
            const cust = order.customer[0] || {};
            const prod = order.products[0] || {};
            setForm({
                customerName: cust.name || "",
                customerPhone: cust.phone || "",
                productId: prod.productId || "",
                qty: prod.qty || 1,
                rate: prod.rate || 0,
            });
        }
    }, [order]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.patch(`/orders/${order.id}`, {
                customer: [{ name: form.customerName, phone: form.customerPhone }],
                products: [{ productId: form.productId, qty: parseInt(form.qty), rate: parseFloat(form.rate) }],
                totalAmount: parseInt(form.qty) * parseFloat(form.rate),
            });
            toast.success("Order updated!");
            handleClose();
            fetchOrders();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update order");
        }
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleUpdate}>
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Order</h5>
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
                                    min={0}
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
