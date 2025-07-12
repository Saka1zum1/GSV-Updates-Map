const mysql = require("mysql2/promise");

exports.handler = async function (event, context) {
    const connectionConfig = {
        host: process.env.MYSQL_HOST,
        user: "mysql",
        password: process.env.MYSQL_PASSWORD,
        database: "default",
        port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
        charset: "utf8mb4"
    };

    const { lat, lng, radius, table = "update_reports", year, month } = event.queryStringParameters || {};
    if (!lat || !lng || !radius) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing lat, lng or radius parameter" }),
        };
    }

    let sql = `
        SELECT *
        FROM \`${table}\`
        WHERE ST_Distance_Sphere(location, POINT(?, ?)) <= ?
    `;
    const params = [parseFloat(lng), parseFloat(lat), parseFloat(radius)];

    // 增加 year 和 month 条件
    if (year) {
        sql += " AND year = ?";
        params.push(Number(year));
    }
    if (month) {
        sql += " AND month = ?";
        params.push(Number(month));
    }

    sql += " LIMIT 100";

    try {
        const connection = await mysql.createConnection(connectionConfig);
        const [rows] = await connection.execute(sql, params);
        await connection.end();
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rows),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error fetching data: " + err.message }),
        };
    }
}