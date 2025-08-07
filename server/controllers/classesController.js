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

export const getMyClass = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10) ;
    if (isNaN(userId)) {
      return res.status(400).json({error:"invalid userId"});
    }

    const pool = await poolPromise;
    const result = await pool.request()
      .input("userId", sql.Int, userId)
      .query(`
        SELECT
          c.ClassId,
          c.StudentUserId,
          c.TeacherUserId,
          c.ClassDay,
          c.StartingTime,
          c.FinishingTime,
          c.RoomNumber,
          Teacher.Username,
          cr.AgeGroup,
          cr.BookName,
          cr.LevelCode,
          cr.Units,
          cr.Type,
          cr.BookImageUrl
        FROM Classes AS c
       
        INNER JOIN Users    AS Teacher  ON c.TeacherUserId   = Teacher.UserId
        INNER JOIN Courses  AS cr ON c.CourseID  = cr.CourseID
        WHERE c.StudentUserId = @userId
      `);    

    res.json(
      result.recordset.map(row=> ({...row,
        StartingTime: extractTimeFromDateTime(row.StartingTime), 
        FinishingTime: extractTimeFromDateTime(row.FinishingTime)}
      )));
  } catch (err) {
    console.log("getMyclass Error:", err);
    res.status(500).send("Error fetching class: " + err.message);
  }
};

// دریافت همه کلاس‌ها
export const getAllClasses = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Classes");
const classes = result.recordset.map(cls => ({
      ...cls,
      StartingTime: cls.StartingTime ? formatTimeToHHMMSS(cls.StartingTime): null,
      FinishingTime: cls.FinishingTime ? formatTimeToHHMMSS(cls.FinishingTime) : null,
    }));
 res.json(classes);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send("Error fetching classes: " + err.message);
  }
};

// دریافت کلاس خاص
export const getClassesById = async (req, res) => {
  try {
    const id = req.params.id;
    const pool = await poolPromise;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Classes WHERE ClassId = @id");

    if (result.recordset.length === 0) {
      return res.status(404).send("Class not found");
    }

    const cls = result.recordset[0];
    cls.StartingTime = cls.StartingTime ? formatTimeToHHMMSS(cls.StartingTime) : null;
    cls.FinishingTime = cls.FinishingTime ? formatTimeToHHMMSS(cls.FinishingTime) : null;
res.json(cls);
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send("Error fetching class: " + err.message);
  }
};

// اضافه کردن کلاس
export const createClass = async (req, res) => {
  try {
    const {TeacherUserId,  StudentUserId, CourseID, ClassDay, StartingTime, FinishingTime, RoomNumber } = req.body;

    if (!StudentUserId || !CourseID || !TeacherUserId) {
      return res.status(400).send("UserId, CourseID, and TeacherId are required.");
    }

    const pool = await poolPromise;
    await pool.request()
    .input("TeacherUserId", sql.Int, TeacherUserId)
      .input("StudentUserId", sql.Int, StudentUserId)
      .input("CourseID", sql.Int, CourseID)
      .input("ClassDay", sql.VarChar(20), ClassDay || "")
      .input("StartingTime", sql.Time, extractTimeFromDateTime(StartingTime) || null)
      .input("FinishingTime", sql.Time, extractTimeFromDateTime(FinishingTime) || null)
      .input("RoomNumber", sql.VarChar(10), RoomNumber || "")
      .query(
        `INSERT INTO Classes (TeacherUserId,  StudentUserId, CourseID, ClassDay, StartingTime, FinishingTime, RoomNumber)
         VALUES (@TeacherUserId, @StudentUserId, @CourseID, @ClassDay, @StartingTime, @FinishingTime, @RoomNumber)
      `);

    res.status(201).send("Class created successfully");
  } catch (err) {
    res.status(500).send("Error creating class: " + err.message);
  }
};

// آپدیت کلاس
export const updateClass = async (req, res) => {
  try {
    const id = req.params.id;
    const {TeacherUserId,  StudentUserId, CourseID, ClassDay, StartingTime, FinishingTime, RoomNumber } = req.body;

    const pool = await poolPromise;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("TeacherUserId", sql.Int, TeacherUserId)
      .input("StudentUserId", sql.Int, StudentUserId)
      .input("CourseID", sql.Int, CourseID)
      .input("ClassDay", sql.VarChar(20), ClassDay || "")
      .input("StartingTime", sql.Time, extractTimeFromDateTime(StartingTime) || null)
      .input("FinishingTime", sql.Time, extractTimeFromDateTime(FinishingTime) || null)
      .input("RoomNumber", sql.VarChar(10), RoomNumber || "")
      .query(
       ` UPDATE Classes
         SET StudentUserId = @StudentUserId,TeacherUserId = @TeacherUserId, CourseID = @CourseID, 
             ClassDay = @ClassDay, StartingTime = @StartingTime, FinishingTime = @FinishingTime,
             RoomNumber = @RoomNumber
         WHERE ClassId = @id
     ` );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("Class not found");
    }

    res.send("Class updated successfully");
  } catch (err) {
    res.status(500).send("Error updating class: " + err.message);
  }
};

// حذف کلاس
export const deleteClass = async (req, res) => {
  try {
    const id = req.params.id;
    const pool = await poolPromise;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Classes WHERE ClassId = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("Class not found");
    }

    res.send("Class deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting class: " + err.message);
  }
};
  