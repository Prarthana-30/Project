const db = require('../db');

class User {
  static async getAll() {
    try {
      const [rows] = await db.promise().query('SELECT * FROM users');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [rows] = await db.promise().query('SELECT * FROM users WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(userData) {
    try {
      const { name, email } = userData;
      const [result] = await db.promise().query(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email]
      );
      return { id: result.insertId, name, email };
    } catch (error) {
      throw error;
    }
  }

  static async update(id, userData) {
    try {
      const { name, email } = userData;
      await db.promise().query(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, id]
      );
      return { id, name, email };
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      await db.promise().query('DELETE FROM users WHERE id = ?', [id]);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
