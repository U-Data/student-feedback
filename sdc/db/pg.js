const pg = require('pg');
const dbConfig = require('../../db.config.js');

const pool = new pg.Pool({
  dialect: dbConfig.dialect,
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port,
});

pool.query('DROP TABLE IF EXISTS reviews, users, courses')
  .then(() => {
    console.log('tables dropped');
    pool.query(`CREATE TABLE users(
        "userId" SERIAL PRIMARY KEY,
        "username" varchar(80) NOT NULL,
        "userPic" varchar,
        "courseCount" integer DEFAULT 0,
        "reviewCount" integer DEFAULT 0
    )`).then(() => {
      pool.query(`CREATE TABLE courses(
        "courseId" SERIAL PRIMARY KEY,
        "name" varchar NOT NULL
      )`).then(() => {
        pool.query(`CREATE TABLE reviews(
          "reviewId" SERIAL PRIMARY KEY,
          "userId" integer references users("userId"),
          "courseId" integer references courses("courseId"),
          "rating" integer,
          "review" varchar,
          "upvotes" integer DEFAULT 0,
          "downvotes" integer DEFAULT 0,
          "reported" boolean DEFAULT false,
          "date" date)`);
      }).then(() => console.log('built tables'));
    })
      .catch(e => console.log(e));
  });
