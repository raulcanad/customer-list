const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const fs = require('fs/promises');

const app = express();
const port = process.env.PORT || 5008;

// Middleware
app.use(cors());

// Replace with your actual database credentials and connection details
const dbConfig = {
  user: 'OPTIMA_RO',
  password: 'OP2014TIMA$1',
  connectString: '(DESCRIPTION = (ENABLE=BROKEN)(ADDRESS = (PROTOCOL = TCP)(HOST = PENTPRHQ1.optima.local)(PORT = 1528)) (CONNECT_DATA = (SERVICE_NAME = HQ1_SN) (UR = A)))'
};

// Function to initialize OracleDB connection pool
async function initialize() {
    try {
        await oracledb.createPool(dbConfig);
        console.log('Connected to Oracle database');
      } catch (err) {
        console.error('Error connecting to database:', err.message);
        process.exit(1); // Exit the process with failure code
      }
    }

// Function to execute SQL query
async function executeQuery(query, params = []) {
    let connection;
    try {
      connection = await oracledb.getConnection();
      const result = await connection.execute(query, params);
      return result.rows;
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error closing connection:', err.message);
        }
      }
    }
  }

// Read queries from JSON file
async function readQueriesFromFile() {
    try {
      const data = await fs.readFile('queries.json', 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading queries from file:', err.message);
      throw err;
    }
  }
// Start reading queries and setting up API endpoints
readQueriesFromFile().then(queries => {
    Object.entries(queries).forEach(([key, query]) => {
      app.get(`/api/${key}`, async (req, res) => {
        try {
          const data = await executeQuery(query);
          console.log(`${key.toUpperCase()} Query Result:`, data);
          res.send(data);
        } catch (err) {
          console.error(`Error fetching ${key.toUpperCase()} data:`, err.message);
          res.status(500).send({ error: `Error fetching ${key.toUpperCase()} data: ${err.message}` });
        }
      });
    });

  // Start the server and initialize the database connection
  app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await initialize();
  });
}).catch(err => {
  console.error('Failed to setup API endpoints:', err.message);
  process.exit(1);
});
