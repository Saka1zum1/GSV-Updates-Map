const mysql = require("mysql2/promise");

const TABLE_FIELDS = {
    region_updates: ['country', 'region', 'month', 'year', 'panoId', 'report_time'],
    spots: ['id', 'author', 'country', 'region', 'panoId', 'report_time', 'spot_date', 'sv_link', 'source_link', 'lat', 'lng', 'spot_type'],
    update_reports: ['id', 'author', 'country', 'region', 'month', 'year', 'panoId', 'report_time', 'lat', 'lng', 'types'],
    altitude_data: ['id', 'panoId', 'lat', 'lng', 'date', 'country', 'altitude']
};

exports.handler = async function (event, context) {
    const connectionConfig = {
        host: process.env.MYSQL_HOST,
        user: "mysql",
        password: process.env.MYSQL_PASSWORD,
        database: "default",
        port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
        charset: "utf8mb4"
    };

    const { table, since, before, key, value } = event.queryStringParameters || {};
    if (!table || !TABLE_FIELDS[table]) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid or missing table parameter" }),
        };
    }

    let sql = `SELECT * FROM \`${table}\``;
    let conditions = [];
    let params = [];

    // 时间字段适配
    let timeField = 'report_time';
    if (table === 'altitude_data') timeField = null; // altitude_data 没有 report_time

    // 时间范围
    if (timeField && since) {
        conditions.push(`${timeField} >= ?`);
        params.push(Number(since));
    }
    if (timeField && before) {
        conditions.push(`${timeField} <= ?`);
        params.push(Number(before));
    }

    // 动态关键字段精确或模糊查询
    if (key && value && TABLE_FIELDS[table].includes(key)) {
        // types 字段为数组时，建议前端过滤
        if (key === 'types') {
            conditions.push(`\`${key}\` LIKE ?`);
            params.push(`%${value}%`);
        } else {
            conditions.push(`\`${key}\` = ?`);
            params.push(value);
        }
    }

    if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
    }

    // 默认排序
    if (timeField) {
        sql += ` ORDER BY ${timeField} DESC`;
    }

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