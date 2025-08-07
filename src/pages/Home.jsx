
import "./Home.css";
import boardImages from "../assets/Images/board2.jpg"
import {Swiper, SwiperSlide } from 'swiper/react';
import {EffectCards} from 'swiper/modules';
import { EffectCoverflow } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

function Home() {
  return (
    <div className="home-page">
      <div className="inner">
        {/* Hero Section */}
        <section className="hero-wrapper">
          <div className="hero-img-container">
            <img src={boardImages} alt="Board" className="hero-img" />
         
            <div className="hero-txt">
              <h1 className="display-5 fw-bold" style={{ fontFamily: "var(--font-heading)" }}>
                Welcome to Pars Language School
              </h1>
              <p
                className="lead mt-3"
                style={{ fontFamily: "var(--font-body)", maxWidth: "600px", margin: "0 auto" }}
              >
                We help learners of all ages master foreign languages with confidence, creativity, and community.
              </p>
            </div>
           </div>
        </section>

        {/* Why Us Section */}
        <section className="why-us pb-2">
          <h2 className="mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Why Choose Us?
          </h2>
          <div className="container d-flex justify-content-center">
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      modules={[EffectCoverflow , Navigation] }
      centeredSlides = {true}
      slidesPerView={'auto'}
      navigation = {true}
      coverflowEffect={{
        rotate : 50 , 
        stretch : 0 ,
        depth : 100 ,
        modifier : 1 , 
        slideShadows : false , 
      }}
      className="whySwiper"
    >
      <SwiperSlide>
        <div className="p-4 rounded shadow-sm" style={{ backgroundColor: "var(--green-light)" }}>
          <h5 className="fw-semibold">Experienced Tutors</h5>
          <p style={{ fontFamily: "var(--font-body)" }}>
            Our certified tutors bring years of teaching experience to every class.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="p-4 rounded shadow-sm" style={{ backgroundColor: "var(--pink-light)" }}>
          <h5 className="fw-semibold">Flexible Courses</h5>
          <p style={{ fontFamily: "var(--font-body)" }}>
            Courses designed for kids, teens & adults.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="p-4 rounded shadow-sm" style={{ backgroundColor: "var(--primary-light)" }}>
          <h5 className="fw-semibold">Modern Methods</h5>
          <p style={{ fontFamily: "var(--font-body)" }}>
            Fun, interactive, and tech-powered learning tailored to every level.
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
        </section>

        {/* Call to Action */}
        
          <div style={{display:"flex", justifyContent:"center"}}>
            <div className="px-4 py-4 rounded text-center" style={{display:"inline-block",
             border:"2px solid pink", borderRadius:"1rem" , boxShadow:"0 2px 8px rgba(0,0,0,0.03)", backgroundColor:"rgba(255, 192, 203, 0.73)"
            }}>
            <h3 className="mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Ready to Start Learning?
            </h3>
            <p style={{ fontFamily: "var(--font-body)" }}>
              Join hundreds of happy learners. Explore our courses today!
            </p>
            <a href="/courses" className="btn btn-outline-dark mt-3 px-4 py-2">
              See Courses
            </a>
            </div>
          </div>
        
      </div>
    </div>
  
  );
}
export default Home;