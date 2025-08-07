import IMG1 from '../assets/Images/TeenCourses.png' 
import IMG2 from '../assets/Images/KidCourses.png'
import IMG3 from '../assets/Images/AdultCourses.png'
import IMGBook1 from '../assets/Images/Adults.png'
import IMGBook2 from '../assets/Images/Teens.png'
import IMGBook3 from '../assets/Images/Children.png'
import './Course.css';
import { GiBookshelf } from "react-icons/gi";
import { useAuth } from '../Context/AuthContext';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useState } from 'react';
const data = [
    {
        id: 1,
        image: IMG1,
        title: 'Teen Courses',
        subtitle: 'The teen course follows the American English File series, focusing on real-life communication, vocabulary, and grammar in an interactive and age-appropriate way.',
        bookImage: IMGBook2
    },

    {
        id: 2,
        image: IMG2,
        title: 'Kid Courses',
        subtitle: 'Our kids program uses First Friends and Family and Friends to build a strong foundation in English through fun, engaging lessons tailored for young learners.',
        bookImage: IMGBook3
    },

    {
        id: 3,
        image: IMG3,
        title: 'Adult Courses',
        subtitle: 'These courses use Four Corners, a practical series that combines speaking, listening, reading, and writing to help adults use English confidently in daily life.',
        bookImage: IMGBook1
    }
]

  function Courses () {
    const {user} = useAuth();
    const navigate = useNavigate();
    const[activeImageId, setActiveImageId] =useState(null);

    const handleRegisterClick = () => {
        if (!user) {
            navigate("/login")
        }
        else if (!user.level) {
            navigate("/placement")
        }
        else {
            navigate("/my-class")
        }
    }
    console.log('course data:' , data);
    return (
    <section className='course-section py-5' id='coursename'>
        <h2 className='text-center mb-5'><GiBookshelf />Our Courses <GiBookshelf /></h2>
        <div className='container'> {/* Keep Bootstrap's container for overall page width */}
            <div className='course-grid-container'> {/* NEW: This will be your custom grid/flex container */}
                {
                    data.map(({ id, image, title, subtitle, bookImage }) => {
                        const showBook = activeImageId === id;
                        return (
                            <article key={id} className='course-card'> {/* NEW: Custom class for each card */}
                                <div className="course-item-image mb-3" style={{ cursor: 'pointer' }} onClick={() => setActiveImageId(showBook ? null : id)}>
                                    <img src={showBook ? bookImage : image} alt={title} className='img-fluid rounded course-img' />
                                </div>
                                <p className="subtitle">{subtitle}</p>
                            </article>
                        );
                    })
                }
            </div>
        </div>
        <div className='d-flex justify-content-center mt-4'>
        <button className='btn btn-primary' onClick={handleRegisterClick}>{user?.level ? "view Class" : user ? "Take Placement Test" : "Register" }</button>
        </div> 
        {/* ... rest of your component ... */}
    </section>
);
              
            
            
     


    
}
  

export default Courses;