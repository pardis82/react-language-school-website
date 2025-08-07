import poolPromise from "../db.js";
import sql from "mssql";

// دریافت همه دوره‌ها
export const getAllCourses = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Courses");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send("Error fetching courses: " + err.message);
  }
};

// دریافت دوره خاص بر اساس ID
export const getCoursesById = async (req, res) => {
  try {
    const id = req.params.id;
    const pool = await poolPromise;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Courses WHERE CourseId = @id");

    if (result.recordset.length === 0) {
      return res.status(404).send("Course not found");
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send("Error fetching course: " + err.message);
  }
};

// اضافه کردن دوره جدید
export const createCourse = async (req, res) => {
  try {
    const { CourseID, AgeGroup, BookName,LevelCode, Units,Type } = req.body;

    if (!CourseName) {
      return res.status(400).send("CourseName is required");
    }

    const pool = await poolPromise;
    await pool.request()
    .input("CourseID", sql.Int, CourseID)
      .input("AgeGroup", sql.VarChar(20), AgeGroup)
      .input("BookName", sql.VarChar(100),BookName)
      .input("LevelCode", sql.VarChar(20), LevelCode)
      .input("Units", sql.VarChar(20), Units)
      .input("Type", sql.VarChar(20), Type)
      .query(
        `INSERT INTO Courses (CourseID, AgeGroup, BookName,LevelCode, Units,Type)
        VALUES (@CourseID, @AgeGroup, @BookName,@LevelCode, @Units,@Type)
      `);

    res.status(201).send("Course created successfully");
  } catch (err) {
    res.status(500).send("Error creating course: " + err.message);
  }
};

// آپدیت دوره
export const updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const { CourseName, Description, Duration } = req.body;

    const pool = await poolPromise;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("AgeGroup", sql.VarChar(20), AgeGroup)
      .input("BookName", sql.VarChar(100),BookName)
      .input("LevelCode", sql.VarChar(20), LevelCode)
      .input("Units", sql.VarChar(20), Units)
      .input("Type", sql.VarChar(20), Type)
      .query(
       ` UPDATE Courses
        SET AgeGroup = @AgeGroup, BookName = @BookName, LevelCode = @LevelCode , Units= @Units, Type=@type
        WHERE CourseId = @id
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("Course not found");
    }

    res.send("Course updated successfully");
  } catch (err) {
    res.status(500).send("Error updating course: " + err.message);
  }
};

// حذف دوره
export const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const pool = await poolPromise;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Courses WHERE CourseId = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("Course not found");
    }

    res.send("Course deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting course: " + err.message);
  }
};