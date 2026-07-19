import { object, set } from "zod";
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

  async function find(filter = {}) {
    const keys = Object.keys(filter);
    const values = Object.values(filter);
    const filterClause = keys.map((key) => `${key}=?`).join(" AND ");
    const [result] = await pool.execute(
      `SELECT * FROM ${tableName} WHERE ${filterClause}`,
      values,
    );
    return result;
  }

  async function findById(id) {
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

  return { tableName, create, find, findById, update };
}
