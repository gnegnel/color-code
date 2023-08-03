import sql from 'mssql';

if (!process.env.SQL_SERVER_USER || !process.env.SQL_SERVER_PASSWORD || !process.env.SQL_SERVER_HOST) {
    throw new Error("Database configuration is not defined in environment variables.");
}

const config: sql.config = {
    user: process.env.SQL_SERVER_USER,
    password: process.env.SQL_SERVER_PASSWORD,
    server: process.env.SQL_SERVER_HOST,
    database: 'ResistorDB',
    options: {
        encrypt: false
    }
}

export default config;