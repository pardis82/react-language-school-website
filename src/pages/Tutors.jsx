import { useState, useEffect } from 'react';
import { GiTeacher } from "react-icons/gi";
import { FaChild, FaUserGraduate, FaUserTie } from "react-icons/fa";
import './Tutors.css';
import image1 from '../assets/Images/Ameri.png';
import image2 from '../assets/Images/Javanmardi.png';
import image3 from '../assets/Images/Clark.png';

// Sample data - make sure this matches your actual data structure
const tutorsData = [
  { id: 1, name: "Ameri", image: image1, category: "kids", experience: 3 },
  { id: 2, name: "Javanmardi", image:image2, category: "teens", experience: 5 },
  { id: 3, name: "Clark", image: image3, category: "adults", experience: 8 },
    { id: 4, name: "Safi", image: image1 , category: "kids", experience: 2 },
  { id: 5, name: "Kent", image: image2 , category: "teens", experience: 6 },
  { id: 6, name: "Grant", image: image2 , category: "teens", experience: 4 },
  { id: 7, name: "Mason", image: image3 , category: "adults", experience: 9 },
];

function Tutors() {
  const [activeCategory, setActiveCategory] = useState(null);

  // Animation effect
  useEffect(() => {
    if (activeCategory) {
      const cards = document.querySelectorAll(`.${activeCategory}-card`);
      cards.forEach((card, index) => {
        card.style.animation = `waterfallDrop 0.4s ease-out forwards ${index * 0.1}s`;
      });
    }
  }, [activeCategory]);

  const renderTutorCards = (category) => {
    return tutorsData
      .filter(t => t.category === category)
      .map((tutor, index) => (
        <div 
          key={tutor.id} 
          className={`tutor-card ${category}-card`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="d-flex align-items-center p-3">
            <img 
              src={tutor.image} 
              alt={tutor.name} 
              className="rounded-circle me-3" 
              style={{ width: 60, height: 60, objectFit: "cover" }} 
            />
            <div>
              <h5 className="mb-1">{tutor.name}</h5>
              <small className="text-muted">
                {tutor.experience} years of experience
              </small>
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div className='main-content'>
      <section className="tutors-section">
        <h2 className="text-center mb-3">
          <GiTeacher /> Our Tutors <GiTeacher />
        </h2>
        
        <p className="text-center text-muted px-3 mt-2 mb-5">
          At our language center, we take pride in offering professional, experienced, 
          and friendly tutors for every age group.
        </p>

        <div className="tutors-button-container d-flex flex-column flex-md-row gap-3 p-3 ">
          {/* Kids Section */}
          <div className="tutors-button-wrapper flex-fill">
            <button
              className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
              onClick={() => setActiveCategory(activeCategory === "kids" ? null : "kids")}
            >
              <FaChild /> Tutors for Kids
            </button>
            
            {activeCategory === "kids" && (
              <div className="tutor-waterfall">
                {renderTutorCards("kids")}
              </div>
            )}
          </div>

          {/* Teens Section */}
          <div className="tutors-button-wrapper flex-fill">
            <button
              className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
              onClick={() => setActiveCategory(activeCategory === "teens" ? null : "teens")}
            >
              <FaUserGraduate /> Tutors for Teens
            </button>
            
            {activeCategory === "teens" && (
              <div className="tutor-waterfall">
                {renderTutorCards("teens")}
              </div>
            )}
          </div>

          {/* Adults Section */}
          <div className="tutors-button-wrapper flex-fill">
            <button
              className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
              onClick={() => setActiveCategory(activeCategory === "adults" ? null : "adults")}
            >
              <FaUserTie /> Tutors for Adults
            </button>
            
            {activeCategory === "adults" && (
              <div className="tutor-waterfall">
                {renderTutorCards("adults")}
              </div>
            )}
          </div>
        </div>

        {/* Stats Section - Single instance */}
         <div className="stats-section-container">
          <div className="stats-item">
            <div className="display-4 text-primary">20+</div>
            <p className="fw-medium">Qualified Tutors</p>
          </div>
          <div className="stats-item">
            <div className="display-4 text-primary">200+</div>
            <p className="fw-medium">Students Taught</p>
          </div>
          <div className="stats-item">
            <div className="display-4 text-primary">98%</div>
            <p className="fw-medium">Satisfaction Rate</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Tutors;