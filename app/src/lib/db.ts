import mysql from "mysql2"

// create the connection to database
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "127.0.0.1",
  port: Number(process.env.MYSQL_PORT) || 3306,
  database: process.env.MYSQL_DATABASE || "db",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "pass",
})
const promisePool = pool.promise()

export default async function excuteQuery(
  query: string,
  values: (string | number)[]
) {
  console.log("query", query)
  console.log("values", values)
  try {
    const [rows, fields] = await promisePool.query(query, [
      "asdf",
      "$2a$10$P/MwmBH.08wJycjcRksZEuhU2SbMEMk52qXr/42JoiWyYd6pYetQW",
      "asdf@asdf.com",
    ])
    return rows
  } catch (error) {
    return { error }
  }
}
