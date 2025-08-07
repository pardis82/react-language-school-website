import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import './MyClass.css';

function MyClass() {
  const { user } = useAuth();
  console.log ("User in my class:" , user)
  const [classInfo, setClassInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchClassInfo = async () => {
      try {
        console.log("fetching class info for userId:" , user.UserId)
        const res = await fetch(`http://localhost:5000/classes/myclass/${user.UserId}`);
        const data = await res.json();
        setClassInfo(data[0]);  // چون یک رکورد میاد
      } catch (err) {
        console.error("Error fetching class info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClassInfo();
  }, [user]);

  if (!user) return <p>Please login first.</p>;
  if (loading) return <p>Loading class information...</p>;
  if (!classInfo) return <p>No class information found.</p>;

  return (
    <div className="container py-5 mt-5 text-center">
      <h2>Welcome, {user.Username}</h2>
      {classInfo ? (
        <>
          <p>Your Level: {classInfo.LevelCode}</p>
          <p>Your Class Type: {classInfo.Type}</p>
          <h5 className="mb-3">Class Information :</h5>
          <div className="class-info-card d-flex flex-wrap flex-md-row align-items-start justify-content-center gap-4 p-3">
            <div className="info-container text-start">
            <ul className="info-list" style={{listStyleType:"disc", paddingRight:"20px"}}>
              <li><strong>Teacher:</strong> {classInfo.Username}</li>
              <li><strong>Day:</strong> {classInfo.ClassDay}</li>
              <li><strong>Time:</strong> {classInfo.StartingTime} - {classInfo.FinishingTime}</li>
              <li><strong>Book:</strong> {classInfo.BookName}</li>
              <li><strong>Units:</strong> {classInfo.Units}</li>
              <li><strong>Room Number:</strong> {classInfo.RoomNumber}</li>
            </ul>
          </div>

          <div className="book-image text-center">
             <img src={classInfo.BookImageUrl} alt={classInfo.BookName} style={{width :'150px',height:'auto', borderRadius:'2px'}}/>
          </div>
          </div>
        </>
      ) : (
        <p>Loading class information...</p>
      )}
    </div>
  );
}

export default MyClass;