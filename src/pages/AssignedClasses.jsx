import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import './AssignedClasses.css';

function AssignedClasses() {
  const { user } = useAuth();
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchAssignedClasses = async () => {
      try {
        const res = await fetch(`http://localhost:5000/assignedclasses?UserId=${user.UserId}`);
        const data = await res.json();
        setAssignedClasses(data);
      } catch (err) {
        console.error("Error fetching assigned classes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedClasses();
  }, [user]);

  if (!user) return <p>Please login first.</p>;
  if (loading) return <p>Loading assigned classes...</p>;
  if (assignedClasses.length === 0) return <p>No assigned classes found.</p>;

  return (
  <div className="container py-5 mt-5">
    <h2 className="text-center mb-4">Assigned Classes for Miss {user.Username}</h2>
    <div className="row flex-wrap flex-md-row align-items-start justify-content-center gap-4 p-3">
      {assignedClasses.map((cls) => (
        <div key={cls.ClassId} className="card mb-4 shadow-sm p-3">
          <div className="d-flex justify-content-between">
            <div>
              <h5>Class: {cls.LevelCode} - {cls.Type}</h5>
              <ul className="list-unstyled mt-2">
                <li><strong>Day:</strong> {cls.ClassDay}</li>
                <li><strong>Time:</strong> {cls.StartingTime} - {cls.FinishingTime}</li>
                <li><strong>Room:</strong> {cls.RoomNumber}</li>
                <li><strong>Book:</strong> {cls.BookName}</li>
                <li><strong>Units:</strong> {cls.Units}</li>
                <li><strong>Age Group:</strong> {cls.AgeGroup}</li>
              </ul>
            </div>
            {cls.BookImageUrl && (
              <img 
                src={cls.BookImageUrl} 
                alt={cls.BookName} 
                className="ms-3"
                style={{ 
                  width: "120px", 
                  height: 'auto', 
                  borderRadius: '2px',
                  alignSelf: 'flex-start' // Aligns image to top
                }} 
              />
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default AssignedClasses;