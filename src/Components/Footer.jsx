import { MdOutlinePermPhoneMsg } from "react-icons/md";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-section text-center shadow-sm py-2 fw-bold fs-8" style={{ fontFamily: "var(--font-heading)" }} >
      <div className="container">
        <p className="mb-1"> <MdOutlinePermPhoneMsg />Contact us: +21 77715500  </p>
        <p className="text-muted mt-2 small">&copy; Pars Language School</p>
      </div>
    </footer>
  );
}

export default Footer;