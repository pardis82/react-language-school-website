import poolPromise from "../db.js";
import sql from "mssql";

// دریافت همه معلم‌ها
export const getAllTeachers = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Teachers");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send("Error fetching teachers: " + err.message);
  }
};

// دریافت معلم خاص
export const getTeachersById = async (req, res) => {
  try {
    const id = req.params.id;
    const pool = await poolPromise;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Teachers WHERE TeacherId = @id");

    if (result.recordset.length === 0) {
      return res.status(404).send("Teacher not found");
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send("Error fetching teacher: " + err.message);
  }
};

// اضافه کردن معلم جدید
export const createTeacher = async (req, res) => {
  try {
    const { TeacherName, AgeGroup, ExperienceYears } = req.body;

    if (!TeacherName) {
      return res.status(400).send("TeacherName is required.");
    }

    const pool = await poolPromise;
    await pool.request()
      .input("TeacherName", sql.VarChar(100), TeacherName)
      .input("AgeGroup", sql.VarChar(20), AgeGroup || "")
      .input("ExperienceYears", sql.Int, ExperienceYears || 0)
      .query(
       `INSERT INTO Teachers (TeacherName, AgeGroup, ExperienceYears)
         VALUES (@TeacherName, @AgeGroup, @ExperienceYears)
      `);

    res.status(201).send("Teacher created successfully");
  } catch (err) {
    res.status(500).send("Error creating teacher: " + err.message);
  }
};

// آپدیت معلم
export const updateTeacher = async (req, res) => {
  try {
    const id = req.params.id;
    const { TeacherName, AgeGroup, ExperienceYears } = req.body;

    const pool = await poolPromise;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("TeacherName", sql.VarChar(100), TeacherName)
      .input("AgeGroup", sql.VarChar(20), AgeGroup || "")
      .input("ExperienceYears", sql.Int, ExperienceYears || 0)
      .query(
        `UPDATE Teachers
         SET TeacherName = @TeacherName, AgeGroup = @AgeGroup, ExperienceYears = @ExperienceYears
         WHERE TeacherId = @id
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("Teacher not found");
    }

    res.send("Teacher updated successfully");
  } catch (err) {
    res.status(500).send("Error updating teacher: " + err.message);
  }
};

// حذف معلم
export const deleteTeacher = async (req, res) => {
  try {
    const id = req.params.id;
    const pool = await poolPromise;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Teachers WHERE TeacherId = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("Teacher not found");
    }

    res.send("Teacher deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting teacher: " + err.message);
  }
};