const express = require('express');
const { createPool, getConnection } = require('oracledb');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS for all requests
app.use(cors());

// Replace with your actual database credentials and connection details
const dbConfig = {
  user: 'OPTIMA_RO',
  password: 'OP2014TIMA$1',
  connectString: '(DESCRIPTION = (CONNECT_TIMEOUT=10)(RETRY_COUNT=3)(TRANSPORT_CONNECT_TIMEOUT=3) (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = SPORUAHQ1.DEV.LOCAL)(PORT = 1562)) (LOAD_BALANCE =OFF)) (CONNECT_DATA = (SERVICE_NAME = HQ1_SN)))'
};

// Function to initialize OracleDB connection pool
async function initialize() {
  try {
    await createPool(dbConfig);
    console.log('Connected to database');
  } catch (err) {
    console.error('Error connecting to database:', err.message);
    process.exit(1); // Exit the process with failure code
  }
}

// API endpoint to fetch DBCORE data
app.get('/api/dbcore', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT DISTINCT m.idmvversion FROM MMVERSION.MVCURRENTCOMPONENTVERSION m WHERE m.componentname = \'DBCORE\' AND m.tscreated = (SELECT MAX(mv.tscreated) FROM MMVERSION.MVCURRENTCOMPONENTVERSION mv WHERE mv.componentname = m.componentname)');
    console.log('DBCORE Query Result:', result.rows);
    res.send(result.rows);
  } catch (err) {
    console.error('Error fetching DBCORE data:', err.message);
    res.status(500).send({ error: `Error fetching DBCORE data: ${err.message}` });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err.message);
      }
    }
  }
});

// API endpoint to fetch MMFIXEDODDS data
app.get('/api/mmfixedodds', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT DISTINCT m.idmvversion FROM MMVERSION.MVCURRENTCOMPONENTVERSION m WHERE m.componentname = \'MMFIXEDODDS\' AND m.tscreated = (SELECT MAX(mv.tscreated) FROM MMVERSION.MVCURRENTCOMPONENTVERSION mv WHERE mv.componentname = m.componentname)');
    console.log('MMFIXEDODDS Query Result:', result.rows);
    res.send(result.rows);
  } catch (err) {
    console.error('Error fetching MMFIXEDODDS data:', err.message);
    res.status(500).send({ error: `Error fetching MMFIXEDODDS data: ${err.message}` });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection:', err.message);
      }
    }
  }
});

// Start the server and initialize the database connection
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await initialize();
});
