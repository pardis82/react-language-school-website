// src/layouts/MainLayout.jsx
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function MainLayout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <main className="flex-fill">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;