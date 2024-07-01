const express = require('express');
const { createPool, getConnection } = require('oracledb');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 5001;

// Enable CORS for all requests
app.use(cors());

// Replace with your actual database credentials and connection details
const dbConfig = {
  user: 'system',
  password: 'fyftem',
  connectString: '(DESCRIPTION = (ENABLE=BROKEN)(ADDRESS = (PROTOCOL = TCP)(HOST = SPORPRHQ1.optima.local)(PORT = 1562)) (CONNECT_DATA = (SERVICE_NAME = HQ1_SN) (UR = A)))'
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

// API endpoint to fetch data
app.get('/api/data', async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT Distinct m.idmvversion FROM MMVERSION.MVCURRENTCOMPONENTVERSION m WHERE m.componentname='+"'DBCORE'"+' and m.tscreated = (SELECT MAX(mv.tscreated)FROM MMVERSION.MVCURRENTCOMPONENTVERSION mv WHERE mv.componentname = m.componentname)');
    res.send(result.rows);
  } catch (err) {
    console.error('Error fetching data:', err.message);
    res.status(500).send({ error: `Error fetching data: ${err.message}` });
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
