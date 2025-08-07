import './PlacementInfo.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function PlacementInfo() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
const [nationalCode, setNationalCode] = useState("");
const [errors, setErrors] = useState({
    nationalCode: "",
    email: "",
    general: ""
  });
  const handleStart =async() => {
  
    setErrors({
      nationalCode: "",
      email: "",
      general: ""
    });

    let isValid = true;
    const newErrors = {
      nationalCode: "",
      email: "",
      general: ""
    };

     // National Code validation
    if (nationalCode.length !== 10) {
      newErrors.nationalCode = "The National Code must have 10 digits";
      isValid = false;
    } else if (!/^\d{10}$/.test(nationalCode)) {
      newErrors.nationalCode = "The National Code must only have digits";
      isValid = false;
    }


   // Email validation
    const emailRegex = /^[^\s@]+@(?:[^\s@]+\.)?(?:gmail\.com|googlemail\.com|example\.com)$/i;
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid Gmail or example.com email address";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username: username, NationalCode: nationalCode, Email: email }),
      });

      const data = await res.json();
      if (res.ok) {
        login(data.user);
        navigate("/MyClass");
      } else {
        setErrors({
          nationalCode: "",
          email: "",
          general: data.message || "Invalid credentials"
        });
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrors({
        nationalCode: "",
        email: "",
        general: "Server error"
      });
    }
    navigate("/placement/test");
  };

  return (
    <section className="placement-section py-5 mb-5">
      <div className="placement-container">
        <h2 className="text-center mb-4">Placement Test</h2>
        <p className="text-muted text-center mb-5">
           Want to test your English? Please fill in your information. The test will start afterwards.
           The final evaluation will be done at the institute.
        </p>

        <form className="w-100 mx-auto" style={{ maxWidth: "500px" }}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your full name" />
          </div>

         <div className="mb-3">
            <label className="form-label">Password (National Code)</label>
            <input 
              type="text" 
              className={`form-control ${errors.nationalCode ? 'is-invalid' : ''}`}
              placeholder="Enter your 10-digit national code" 
              maxLength={10} 
              value={nationalCode} 
              onChange={(e) => {
                setNationalCode(e.target.value);
                if (errors.nationalCode) {
                  setErrors({...errors, nationalCode: ""});
                }
              }}
            />
            {errors.nationalCode && (
              <div className="invalid-feedback" style={{ color: 'red' }}>
                {errors.nationalCode}
              </div>
            )}
          </div>


         <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors({...errors, email: ""});
                }
              }}
            />
            {errors.email && (
              <div className="invalid-feedback" style={{ color: 'red' }}>
                {errors.email}
              </div>
            )}
          </div>

          {errors.general && (
            <div className="alert alert-danger mt-3">
              {errors.general}
            </div>
          )}

          <button type="button" className="btn btn-primary w-100 mt-3" onClick={handleStart}>
            Start Test
          </button>
        </form>
      </div>
    </section>
);
}