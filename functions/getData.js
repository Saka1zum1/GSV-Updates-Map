const sqlite3 = require("sqlite3").verbose();

exports.handler = async function (event, context) {
    const dbPath = "vs.db";
    const { table, since } = event.queryStringParameters || {};
    if (!table) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing table parameter" }),
        };
    }
    let sql = `SELECT * FROM ${table}`;
    let params = [];
    if (since && (table === 'update_reports' || table === 'spots')) {
        sql += " WHERE report_time >= ?";
        params.push(Number(since));
    }
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
            if (err) {
                reject({
                    statusCode: 500,
                    body: JSON.stringify({ error: "Error fetching data: " + err.message }),
                });
            }
        });
        db.all(sql, params, (err, rows) => {
            db.close();
            if (err) {
                reject({
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
};

