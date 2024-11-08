import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST || "127.0.0.1",
    port: 3307,
    user: process.env.USER || "root",
    password: process.env.PASSWORD || "",
    database: process.env.DATABASE || "puneri_paltan",
})

connection.connect((err) => {
    if (err) throw err;
    console.log("Database connected");
})

export default connection