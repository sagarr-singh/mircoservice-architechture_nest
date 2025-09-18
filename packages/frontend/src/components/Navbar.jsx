import { Link } from 'react-router-dom';
import brandlogo from ".././assets/brand-logo.png"

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container-fluid px-5 d-flex justify-content-between align-items-center">

        <Link
          to="/"
          className="navbar-brand d-flex align-items-center"
          style={{ fontSize: '1.4rem', fontWeight: '600', color: '#007bff' }} // adjust color if needed
        >
          <img
            src={brandlogo}
            alt="Logo"
            style={{
              height: '40px',
              width: 'auto',
              marginRight: '10px',
              objectFit: 'contain'
            }}
          />
          <span className='align-items-center justify-content-center'>Microservice Products & Orders</span>
        </Link>

        <div className="d-flex gap-4">
          <Link
            className="nav-link text-secondary fw-medium"
            to="/"
            style={{ transition: '0.3s', fontSize: '1rem' }}
          >
            Products
          </Link>
          <Link
            className="nav-link text-secondary fw-medium"
            to="/orders"
            style={{ transition: '0.3s', fontSize: '1rem' }}
          >
            Orders
          </Link>
          <Link
            className="nav-link text-secondary fw-medium"
            to="/login"
            style={{ transition: '0.3s', fontSize: '1rem' }}
          >
            Login
          </Link>
          {/* <Link
            className="nav-link btn btn-primary text-white fw-semibold"
            to="/signup"
            style={{ borderRadius: '8px', padding: '0.35rem 1rem' }}
          >
            Signup
          </Link> */}
          <Link
            className="nav-link text-secondary fw-medium"
            to="/about"
            style={{ transition: '0.3s', fontSize: '1rem' }}
          >
            About
          </Link>
        </div>
      </div>

      <style>
        {`
          .nav-link:hover {
            color: #0d6efd !important;
          }
          .navbar {
            border-bottom: 1px solid #e5e5e5;
          }
        `}
      </style>
    </nav>
  );
}
