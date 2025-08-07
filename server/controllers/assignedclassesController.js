import poolPromise from "../db.js";
import sql from "mssql";
function extractTimeFromDateTime(dateTime) {
  if (!dateTime) return null;
  if (typeof dateTime === "string") {
    // اگر رشته هست و مثل "2025-07-24T14:30:00.000Z"
    const timeMatch = dateTime.match(/T(\d{2}:\d{2}:\d{2})/);
    if (timeMatch) return timeMatch[1];
    if (dateTime.length === 8 && /^\d{2}:\d{2}:\d{2}$/.test(dateTime)) return dateTime; // اگر خودش زمان بود
  }
  if (dateTime instanceof Date) {
    const hh = dateTime.getUTCHours().toString().padStart(2, "0");
    const mm = dateTime.getUTCMinutes().toString().padStart(2, "0");
    const ss = dateTime.getUTCSeconds().toString().padStart(2, "0");
    return `${hh}:${mm}`;
  }
  return null;
}


function formatTimeToHHMMSS(date) {
  if (!date) return null;
  const hh = date.getUTCHours().toString().padStart(2, "0");
  const mm = date.getUTCMinutes().toString().padStart(2, "0");
  const ss = date.getUTCSeconds().toString().padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export const getAllAssignedClasses = async (req, res) => {
  const UserId = req.query.UserId;

  if (!UserId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('UserId', sql.Int, UserId)
      .query(`
        SELECT
          c.ClassId,
          c.TeacherUserId,
          c.StudentUserId,
          c.ClassDay,
          c.StartingTime,
          c.FinishingTime,
          c.RoomNumber,
          Student.Username,
          cr.AgeGroup,
          cr.BookName,
          cr.LevelCode,
          cr.Units,
          cr.Type,
          cr.BookImageUrl
        FROM Classes AS c
        INNER JOIN Users    AS Student  ON c.StudentUserId   = Student.UserId
        INNER JOIN Users    AS Teacher  ON c.TeacherUserId   = Teacher.UserId
        INNER JOIN Courses  AS cr ON c.CourseID  = cr.CourseID
       WHERE c.TeacherUserId = @UserId
ORDER BY c.ClassDay, c.StartingTime;
      `);

   res.json(
      result.recordset.map(row=> ({...row,
        StartingTime: extractTimeFromDateTime(row.StartingTime), 
        FinishingTime: extractTimeFromDateTime(row.FinishingTime)}
      )));
  } catch (err) {
    console.log("getAllAssignedClasses Error:", err);
    res.status(500).send({error:"Error fetching class: " + err.message});
  }
};
