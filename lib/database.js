import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

// conf. de api PosgreSQL
const pool = new Pool({
  connectionString,
  // ssl: {
  //   rejectUnauthorized : false,
  // }
});

const createTableText = `
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
`;

pool.on('connect', () => {
  console.log('DB connected succesfully !');
});

pool
  .query(createTableText)
  .then(() => {
    console.log('table is created successfully');
  })
  .catch((error) => {
    console.log('table is not created');
    console.log(error);
  });

const query = async (texto, params) => {
  // await pool.query("SET search_path TO 'chatSchema';");
  // pool.on('connect', () => {
  //   console.log('DB connected succesfully !');
  return pool.query(texto, params);
  // });
};

export default query;
