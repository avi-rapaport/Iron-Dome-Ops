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

  async function get() {
    const [result] = await pool.execute(`SELECT * FROM ${tableName}`);
    return result;
  }

  return { tableName, create };
}
