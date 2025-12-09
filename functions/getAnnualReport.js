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

        // Parse and flatten content field
        const reports = rows.map(row => {
            let content = row.content;
            
            // Parse content if it's a string
            if (typeof content === 'string') {
                try {
                    content = JSON.parse(content);
                } catch (e) {
                    console.error('Error parsing content field:', e);
                    content = {};
                }
            }
            
            // Flatten content to top level while keeping metadata
            return {
                // Database metadata fields
                author_id: row.author_id,
                year: row.year,
                created_at: row.created_at,
                
                // Content fields - flattened to top level
                ...content,
                
                // Ensure report_year exists for compatibility
                report_year: content.year || row.year,
                
                // Ensure author_name from content
                author_name: content.author_name || null,
                
                // Total count (combines updates and spots)
                total_count: (content.updates?.count || 0) + (content.spots?.count || 0)
            };
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
