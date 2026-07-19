import { set } from "zod";
import { pool } from "../db/database.js";

export function initBaseRepo(tableName) {
  async function create(data) {
    const keys = Object.keys(data).join(", ");
    const values = Object.values(data);
    const placeHolders = values.map(() => "?");

    const [result] = await pool.execute(
      `INSERT INTO ${tableName} (${keys})
        VALUES (${placeHolders})`,
      values,
    );
    return result.insertId;
  }

  async function getById(id) {
    const [result] = await pool.execute(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id],
    );

    return result[0] || null;
  }

  async function update(id, newData) {
    const keys = Object.keys(newData);
    const values = Object.values(newData);
    const setClause = keys.map((key) => `${key}=?`).join(", ");

    const [result] = await pool.execute(
      `UPDATE ${tableName} SET ${setClause} WHERE id = ?`,
      [...values, id],
    );
  }

  return { tableName, create, getById, update };
}
