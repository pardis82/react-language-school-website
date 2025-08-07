import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import './login.css';
export default function Login() {
const navigate = useNavigate();
const {login} = useAuth();
const [user,setUser]= useState(null);
  const [username, setUsername] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [email, setEmail] = useState("");
   const [errors, setErrors] = useState({
    nationalCode: "",
    email: "",
    general: ""
  });
  const handleStart =async () => {
    console.log("clicked");
     // Reset errors
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
      console.log("login response:", data);
      if (res.ok) {
        login(data.user)
         const { Role } = data.user;
  setUser(data.user);

  if (Role === "teacher") {
    navigate("/AssignedClasses");
  } else if (Role === "student") {
    navigate("/MyClass");
  } 
      } 
      else {
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
  };

  return (
    <section className="login-section py-5 mb-5">
      <div className="login-container">
        <h2 className="text-center mb-4">Login</h2>
        <p className="text-muted text-center mb-5">
           If you already have an acoount, log in to access your class.
        </p>
    <form className="w-100 mx-auto" style={{ maxWidth: "500px" }} onSubmit={(e)=>e.preventDefault()}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" placeholder="Enter your Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
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
            Enter 
          </button>
          
        </form>
        </div>
 
       
        </section>
  );
}
  
