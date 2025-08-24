require("dotenv").config();
const mysql = require("mysql2/promise");

exports.handler = async function (event, context) {
    const connectionConfig = {
        host: process.env.MYSQL_HOST,
        user: "mysql",
        password: process.env.MYSQL_PASSWORD,
        database: "default",
        port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
        charset: "utf8mb4",
        supportBigNumbers: true,
        bigNumberStrings: true

    };

    const { lat, lng, radius, table = "update_reports", year, month } = event.queryStringParameters || {};
    if (!lat || !lng || !radius) {
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: null, error: true }),
        };
    }

    let sql = `
        SELECT
            panoId,
            message_id,
            channel_id,
            ST_X(location) AS lng,
            ST_Y(location) AS lat,
            ST_Distance_Sphere(location, POINT(?, ?)) AS distance
        FROM \`${table}\`
        WHERE ST_Distance_Sphere(location, POINT(?, ?)) <= ?
    `;
    const params = [
        parseFloat(lng), parseFloat(lat), // for distance
        parseFloat(lng), parseFloat(lat), parseFloat(radius) // for where
    ];

    if (year) {
        sql += " AND year = ?";
        params.push(Number(year));
    }
    if (month) {
        sql += " AND month = ?";
        params.push(Number(month));
    }

    sql += " ORDER BY ST_Distance_Sphere(location, POINT(?, ?)) ASC LIMIT 1";
    params.push(parseFloat(lng), parseFloat(lat)); // for ORDER BY

    try {
        const connection = await mysql.createConnection(connectionConfig);
        const [rows] = await connection.execute(sql, params);
        await connection.end();

        if (rows.length) {
            const { panoId, message_id, channel_id, lat, lng, distance } = rows[0];
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    data: { panoId, message_id, channel_id, lat, lng, distance },
                    error: false
                }),
            };
        } else {
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    data: null,
                    error: false
                }),
            };
        }
    } catch (err) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: null,
                error: true
            }),
        };
    }
}
