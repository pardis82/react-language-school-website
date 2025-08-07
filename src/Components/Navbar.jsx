import { Link } from "react-router-dom";
import Logo from '../assets/Images/ParsLogo1.png';
import "./Navbar.css";
import { IoHome } from "react-icons/io5";
import { MdPlayLesson } from "react-icons/md";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { PiExam } from "react-icons/pi";

function Navbar() {
  return (
    <nav className="navbar bg-light fixed-top shadow-sm px-3 py-2">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* لوگو + عنوان */}
        <span className="navbar-brand d-flex align-items-center gap-2 mb-0">
          {/* فقط در موبایل - لوگو بزرگ‌تر */}
          <img src={Logo} alt="Logo" className="d-lg-none" style={{ height: "55px" }} />

          {/* فقط در دسکتاپ - لوگو + نام آموزشگاه */}
          <span className="fw-bold fs-4 d-none d-lg-flex align-items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
            <img src={Logo} alt="Logo" style={{ height: "35px" }} />
            Pars Language School
          </span>
        </span>

        {/* 📱 منوی موبایل (dropdown) */}
        <div className="dropdown d-lg-none">
          <button
            className="btn"
            type="button"
            id="mobileMenu"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end mt-2" style={{backgroundColor:'var(--primary-color)'}} aria-labelledby="mobileMenu">
            <li><Link className="dropdown-item d-flex align-items-center" to="/"><IoHome className="me-2" /> Home</Link></li>
            <li><Link className="dropdown-item d-flex align-items-center" to="/courses"><MdPlayLesson className="me-2" /> Courses</Link></li>
            <li><Link className="dropdown-item d-flex align-items-center" to="/tutors"><PiChalkboardTeacherFill className="me-2" /> Teachers</Link></li>
            <li><Link className="dropdown-item d-flex align-items-center" to="/placement"><PiExam className="me-2" /> Placement</Link></li>
            <li><Link className="dropdown-item" to="/login">Login</Link></li>
          </ul>
        </div>

        {/* 💻 منوی دسکتاپ */}
        <div className="d-none d-lg-flex align-items-center gap-4">
          <ul className="navbar-nav flex-row gap-3 align-items-center mb-0">
            <li className="nav-item">
              <Link className="nav-link d-flex flex-column align-items-center" to="/">
                <IoHome className="fs-5" />
                <span className="nav-label">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex flex-column align-items-center" to="/courses">
                <MdPlayLesson className="fs-5" />
                <span className="nav-label">Courses</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex flex-column align-items-center" to="/tutors">
                <PiChalkboardTeacherFill className="fs-5" />
                <span className="nav-label">Teachers</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex flex-column align-items-center" to="/placement">
                <PiExam className="fs-5" />
                <span className="nav-label">Placement</span>
              </Link>
            </li>
          </ul>
          <Link className="btn btn-outline-primary login-btn" to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;