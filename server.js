const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const fs = require('fs/promises');

const app1 = express();
const port1 = process.env.PORT1 || 5000;

const app2 = express();
const port2 = process.env.PORT2 || 5001;

// Middleware
app1.use(cors());
app2.use(cors());

// Database configurations
const dbConfig1 = {
  user: 'OPTIMA_RO',
  password: 'OP2014TIMA$1',
  connectString: '(DESCRIPTION = (CONNECT_TIMEOUT=10)(RETRY_COUNT=3)(TRANSPORT_CONNECT_TIMEOUT=3) (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = SPORUAHQ1.DEV.LOCAL)(PORT = 1562)) (LOAD_BALANCE =OFF)) (CONNECT_DATA = (SERVICE_NAME = HQ1_SN)))'
};

const dbConfig2 = {
  user: 'OPTIMA_RO',
  password: 'OP2014TIMA$1',
  connectString: '(DESCRIPTION = (ENABLE=BROKEN)(ADDRESS = (PROTOCOL = TCP)(HOST = SPORPRHQ51.optima.local)(PORT = 1562)) (CONNECT_DATA = (SERVICE_NAME = HQ1_SN) (UR = A)))'
};

// Function to initialize OracleDB connection pool
async function initialize(dbConfig) {
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

// Function to set up API endpoints
function setupEndpoints(app, dbConfig, port) {
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
      await initialize(dbConfig);
    });
  }).catch(err => {
    console.error('Failed to setup API endpoints:', err.message);
    process.exit(1);
  });
}

// Setup endpoints for both apps
setupEndpoints(app1, dbConfig1, port1);
setupEndpoints(app2, dbConfig2, port2);
