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

pool.query(`COPY users("username","userPic")
  FROM '/home/ec2-user/project_folder.git/student-feedback/sdc/db/users.csv'
  DELIMITER ','
  CSV HEADER`).then(() => {
  console.log('users copied');
  pool.query(`COPY courses("name")
    FROM '/home/ec2-user/project_folder.git/student-feedback/sdc/db/courses.csv'
    DELIMITER ','
    CSV HEADER`).then(() => {
    console.log('courses copied');
    pool.query(`COPY reviews("userId","courseId","rating","review","upvotes","downvotes","reported","date")
      FROM '/home/ec2-user/project_folder.git/student-feedback/sdc/db/reviews.csv'
      DELIMITER ','
      CSV HEADER `).then(() => {
      console.log('reviews copied');
    });
  });
});
