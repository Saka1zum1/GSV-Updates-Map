const sqlite3 = require("sqlite3").verbose();
const path = require("path");

exports.handler = async function(event, context) {
    const dbPath = path.join(__dirname, "../../vs.db");
    const { table, since, until } = event.queryStringParameters || {};
    if (!table) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing table parameter" }),
        };
    }
    let sql = `SELECT * FROM ${table}`;
    let params = [];
    if ((table === 'update_reports' || table === 'spots') && (since || until)) {
        let conditions = [];
        if (since) {
            conditions.push("report_time >= ?");
            params.push(Number(since));
        }
        if (until) {
            conditions.push("report_time <= ?");
            params.push(Number(until));
        }
        sql += " WHERE " + conditions.join(" AND ");
    }
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
            if (err) {
                resolve({
                    statusCode: 500,
                    body: JSON.stringify({ error: "Error fetching data: " + err.message }),
                });
            }
        });
        db.all(sql, params, (err, rows) => {
            db.close();
            if (err) {
                resolve({
                    statusCode: 500,
                    body: JSON.stringify({ error: err.message }),
                });
            } else {
                resolve({
                    statusCode: 200,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(rows),
                });
            }
        });
    });
}

