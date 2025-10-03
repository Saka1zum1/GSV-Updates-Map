require("dotenv").config();
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

    const { country, region, year, month, channel_id } = event.queryStringParameters || {};
    if (!country || !year || !month) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing required parameters: country, year, month" }),
        };
    }

    try {
        const connection = await mysql.createConnection(connectionConfig);

        const [rows] = await connection.execute(channel_id ? `
            SELECT
                MAX(CASE WHEN country = ? AND region = ? AND year = ? AND month = ? AND channel_id = ? THEN 1 ELSE 0 END) AS has_region,
                MAX(CASE WHEN country = ? AND year = ? AND month = ? AND channel_id = ? THEN 1 ELSE 0 END) AS has_country,
                MAX(CASE WHEN region = ? AND year = ? AND channel_id = ? THEN 1 ELSE 0 END) AS has_year
            FROM update_reports
        ` : `
            SELECT
                MAX(CASE WHEN country = ? AND region = ? AND year = ? AND month = ? THEN 1 ELSE 0 END) AS has_region,
                MAX(CASE WHEN country = ? AND year = ? AND month = ? THEN 1 ELSE 0 END) AS has_country,
                MAX(CASE WHEN region = ? AND year = ? THEN 1 ELSE 0 END) AS has_year
            FROM update_reports`,

            channel_id ? [
                country, region, year, month, channel_id,
                country, year, month, channel_id,
                region, year, channel_id
            ] : [
                country, region, year, month,
                country, year, month,
                region, year
            ]);

        await connection.end();

        const result = rows[0] || {};
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                newregion: result.has_region === 0,
                newcountry: result.has_country === 0,
                newyear: result.has_year === 0
            })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error querying data: " + err.message }),
        };
    }
};
