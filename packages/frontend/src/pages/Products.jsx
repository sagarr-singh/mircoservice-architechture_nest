import { useEffect, useState } from 'react';
import api from '../api';
import { ToastContainer, toast } from 'react-toastify';
import prod_img from ".././assets/image.png"
import EditProductModal from '../components/EditProductModal';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', stock: '' });

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async e => {
    e.preventDefault();
    try {
      await api.post('/products', {
        name: form.name,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      });
      toast.success('Product created!');
      setShowModal(false);
      setForm({ name: '', price: '', stock: '' });
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error('Failed to create product');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted!');
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete product');
    }
  };


  const handleEdit = (product) => {
    setEditingProduct(product);
  };


  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Available Products</h2>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>Create Product</button>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {products.map(product => (
          <div className="col" key={product.id}>
            <div className="card shadow-sm h-100" style={{ fontSize: '0.9rem', borderRadius: '12px' }}>
              <img
                src={prod_img}
                className="card-img-top"
                alt={product.name}
                style={{ height: '250px', objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h6 className="card-title fw-bold">{product.name}</h6>
                  <p className="card-text mb-1 text-muted">Stock: {product.stock}</p>
                  <p className="card-text fw-semibold mb-1">₹{product.price}</p>
                  <p className="card-text text-muted mb-2" style={{ fontSize: '0.75rem' }}>
                    Created: {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Create Modal For Product */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleCreate}>
                <div className="modal-header">
                  <h5 className="modal-title">Create Product</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
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
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}


      {/* Editing Modal for Product */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          show={!!editingProduct}
          handleClose={() => setEditingProduct(null)}
          fetchProducts={fetchProducts}
        />
      )}
    </div>
  );
}
