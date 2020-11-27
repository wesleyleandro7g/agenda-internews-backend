require("dotenv").config();

module.exports = {
  dialect: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "5432",
  username: process.env.DB_USER_NAME || "postgres",
  password: process.env.DB_PASSWORD || "suphexa@2020",
  database: process.env.DATABASE || "agendaDB",
  define: {
    timestamps: true,
    underscored: true,
  },
};
