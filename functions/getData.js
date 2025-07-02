const mysql = require("mysql2/promise");

const TABLE_FIELDS = {
    region_updates: ['country', 'region', 'month', 'year', 'panoId', 'report_time'],
    spots: ['id', 'author', 'country', 'region', 'panoId', 'report_time', 'spot_date', 'sv_link', 'source_link', 'spot_type'],
    update_reports: ['messgae_id', 'author', 'country', 'region', 'month', 'year', 'panoId', 'report_time', 'types'],
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
    if (table === 'spots') timeField = 'spot_date';
    if (table === 'altitude_data') timeField = null;

    // 时间范围
    if (timeField && since) {
        if (timeField === 'spot_date') {
            conditions.push(`STR_TO_DATE(${timeField}, '%Y/%m/%d') >= FROM_UNIXTIME(?)`);
        } else {
            conditions.push(`${timeField} >= ?`);
        }
        params.push(Number(since));
    }

    if (timeField && before) {
        if (timeField === 'spot_date') {
            conditions.push(`STR_TO_DATE(${timeField}, '%Y/%m/%d') <= FROM_UNIXTIME(?)`);
        } else {
            conditions.push(`${timeField} <= ?`);
        }
        params.push(Number(before));
    }

    // 多字段查询支持
    if (key && value) {
        const keys = key.split(',').map(k => k.trim());
        const values = value.split(',').map(v => v.trim());
        for (let i = 0; i < Math.min(keys.length, values.length); i++) {
            const k = keys[i];
            const v = values[i];
            if (!TABLE_FIELDS[table].includes(k)) continue;
            if (k === 'types') {
                conditions.push(`\`${k}\` LIKE ?`);
                params.push(`%${v}%`);
            } else {
                conditions.push(`\`${k}\` = ?`);
                params.push(v);
            }
        }
    }

    conditions.push("(location IS NOT NULL)");

    if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
    }

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