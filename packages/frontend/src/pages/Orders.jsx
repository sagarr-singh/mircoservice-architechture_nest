import { useEffect, useState } from "react";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import EditOrderModal from "../components/EditOrderModal";
import CreateOrderModal from "../components/CreateOrderModal";


export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);


    const fetchOrders = async () => {
        try {
            const res = await api.get("/orders");
            setOrders(res.data);
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    };

    useEffect(() => { fetchOrders(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;
        try {
            await api.delete(`/orders/${id}`);
            toast.success("Order deleted!");
            fetchOrders();
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete order");
        }
    };

    const handleEdit = (order) => setEditingOrder(order);

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Orders</h2>
                <button className="btn btn-success" onClick={() => setShowCreateModal(true)}>Create Order</button>

            </div>

            <div className="row row-cols-1 g-3">
                {orders.map((order) => (
                    <div className="col" key={order.id}>
                        <div className="card shadow-sm flex-row" style={{ borderRadius: "12px" }}>
                            <div
                                className="bg-primary text-white d-flex align-items-center justify-content-center"
                                style={{ width: "150px", borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px" }}
                            >
                                <div className="text-center p-2">
                                    <h6 className="mb-1" style={{ fontSize: "0.85rem" }}>Order ID</h6>
                                    <p className="mb-0" style={{ fontSize: "0.75rem" }}>{order.id.slice(0, 8)}...</p>
                                </div>
                            </div>
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h6 className="card-title fw-bold mb-1">Customer: {order.customer[0]?.name}</h6>
                                    <p className="card-text mb-1 text-muted">Phone: {order.customer[0]?.phone}</p>
                                    <p className="card-text mb-1">
                                        <strong>Products:</strong>
                                        {order.products.map((p) => (
                                            <div key={p.productId} style={{ fontSize: "0.85rem" }}>
                                                - {p.productId} × {p.qty} @ ₹{p.rate}
                                            </div>
                                        ))}
                                    </p>
                                    <p className="card-text fw-semibold mb-1">Total: ₹{order.totalAmount}</p>
                                    <p className="card-text text-muted" style={{ fontSize: "0.75rem" }}>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="d-flex gap-2 mt-2">
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => handleEdit(order)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(order.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {/* Editing Modal for orders */}
            {editingOrder && (
                <EditOrderModal
                    order={editingOrder}
                    show={!!editingOrder}
                    handleClose={() => setEditingOrder(null)}
                    fetchOrders={fetchOrders}
                />
            )}


            {/* Create Modal for orders */}
            {showCreateModal && (
                <CreateOrderModal
                    show={showCreateModal}
                    handleClose={() => setShowCreateModal(false)}
                    fetchOrders={fetchOrders}
                />
            )}
        </div>
    );
}
