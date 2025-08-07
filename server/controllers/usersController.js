import poolPromise from "../db.js";  // وارد کردن کانکشن پول
import sql from "mssql";

export const loginUser = async (req, res) => {
  try {
    const { Username, NationalCode, Email } = req.body;
    const pool = await poolPromise;
    const result = await pool.request()
      .input("Username", sql.VarChar(50), Username)
      .input("NationalCode", sql.VarChar(10), NationalCode)
      .input("Email", sql.VarChar(100), Email)
      .query("SELECT * FROM Users WHERE Username = @Username AND NationalCode = @NationalCode AND Email =@Email");

    if (result.recordset.length === 0) {
      return res.status(401).json("Invalid username or national code");
    }
    const user = result.recordset[0];
    res.json({ success: true, user });
  } catch (err) {
    console.error("Login Error:", err)
    res.status(500).json("Error logging in: " + err.message);
  }
}; 


// دریافت همه کاربران
export const getAllUsers = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Users");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json("Error fetching users: " + err.message);
  }
};

// دریافت کاربر خاص
export const getUsersById = async (req, res) => {
  try {
    const id = req.params.id;
    const pool = await poolPromise;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Users WHERE UserId = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json("User not found");
    }
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json("Error fetching user: " + err.message);
  }
};

// اضافه کردن کاربر
export const createUser = async (req, res) => {
  try {
    const { Username, NationalCode, Email, PhoneNumber, Role } = req.body;

    if (!Username || !NationalCode || !Email) {
      return res.status(400).json("Username, NationalCode, and Email are required.");
    }

    const pool = await poolPromise;
    await pool.request()
      .input("Username", sql.VarChar(50), Username)
      .input("NationalCode", sql.VarChar(10), NationalCode)
      .input("Email", sql.VarChar(100), Email)
      .input("PhoneNumber", sql.VarChar(20), PhoneNumber)
      .input("Role", sql.VarChar(20), Role)
      .query(
       ` INSERT INTO Users (Username, NationalCode, Email, PhoneNumber, Role)
        VALUES (@Username, @NationalCode, @Email, @PhoneNumber, @Role)
      `);

    res.status(201).json("User created successfully");
  } catch (err) {
    res.status(500).json("Error creating user: " + err.message);
  }
};

// آپدیت کاربر
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { Username, NationalCode, Email, PhoneNumber, Role } = req.body;

    const pool = await poolPromise;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("Username", sql.VarChar(50), Username)
      .input("NationalCode", sql.VarChar(10), NationalCode)
      .input("Email", sql.VarChar(100), Email)
      .input("PhoneNumber", sql.VarChar(20), PhoneNumber)
      .input("Role", sql.VarChar(20), Role)
      .query(
        `UPDATE Users
        SET Username = @Username, NationalCode = @NationalCode, Email = @Email, PhoneNumber = @PhoneNumber, Role = @Role
        WHERE UserId = @id
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json("User not found");
    }

    res.json("User updated successfully");
  } catch (err) {
    res.status(500).json("Error updating user: " + err.message);
  }
};

// حذف کاربر
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const pool = await poolPromise;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Users WHERE UserId = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json("User not found");
    }

    res.json("User deleted successfully");
  } catch (err) {
    res.status(500).json("Error deleting user: " + err.message);
  }
};