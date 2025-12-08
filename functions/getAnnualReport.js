require("dotenv").config();
const mysql = require("mysql2/promise");

/**
 * Netlify Function to fetch annual report data for a specific user
 * Query parameters:
 * - userId: Discord user ID (required)
 * - year: Report year (default: 2025)
 * - type: Report type - "update" or "spot" (optional, returns both if not specified)
 */
exports.handler = async function (event, context) {
    const connectionConfig = {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER || "mysql",
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE || "default",
        port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
        charset: "utf8mb4",
        supportBigNumbers: true,
        bigNumberStrings: true
    };

    // Default to current year if not specified
    const currentYear = new Date().getFullYear();
    const { userId, year = currentYear.toString(), type } = event.queryStringParameters || {};

    // Validate required parameters
    if (!userId) {
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "userId parameter is required" }),
        };
    }

    try {
        const connection = await mysql.createConnection(connectionConfig);

        // Build query based on parameters
        let sql = `SELECT * FROM annual_reports WHERE author_id = ? AND year = ?`;
        let params = [userId, parseInt(year)];

        const [rows] = await connection.execute(sql, params);
        await connection.end();

        if (rows.length === 0) {
            return {
                statusCode: 404,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: "No annual report found for this user" }),
            };
        }

        // Parse JSON fields if they are stored as strings
        const reports = rows.map(row => {
            const report = { ...row };
            
            // Parse JSON fields
            const jsonFields = [
                'time_stats', 'geo_stats', 'content_stats', 
                'spot_content_stats', 'streak_stats', 'ranking_stats',
                'interaction_stats', 'milestones', 'custom_data'
            ];
            
            jsonFields.forEach(field => {
                if (report[field] && typeof report[field] === 'string') {
                    try {
                        report[field] = JSON.parse(report[field]);
                    } catch (e) {
                        console.error(`Error parsing ${field}:`, e);
                    }
                }
            });
            
            return report;
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reports),
        };
    } catch (err) {
        console.error("Error fetching annual report data:", err);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Error fetching annual report data: " + err.message }),
        };
    }
};
