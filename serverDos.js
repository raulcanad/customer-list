const express = require('express');
const oracledb = require('oracledb'); // Correct the import
const cors = require('cors'); // Import the cors package

const app = express();
const port = 5001;

// Enable CORS for all requests
app.use(cors());

// Replace with your actual database credentials and connection details
const dbConfig = {
  user: 'OPTIMA_RO',
  password: 'OP2014TIMA$1',
  connectString: '(DESCRIPTION = (ENABLE=BROKEN)(ADDRESS = (PROTOCOL = TCP)(HOST = SPORPRHQ51.optima.local)(PORT = 1562)) (CONNECT_DATA = (SERVICE_NAME = HQ1_SN) (UR = A)))'
};

// Function to initialize OracleDB connection pool
async function initialize() {
  try {
    await oracledb.createPool(dbConfig); // Correct the function call
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
    connection = await oracledb.getConnection(); // Correct the function call
    const result = await connection.execute(
      `SELECT DISTINCT m.idmvversion 
       FROM MMVERSION.MVCURRENTCOMPONENTVERSION m 
       WHERE m.componentname = 'DBCORE' 
       AND m.tscreated = (
         SELECT MAX(mv.tscreated) 
         FROM MMVERSION.MVCURRENTCOMPONENTVERSION mv 
         WHERE mv.componentname = m.componentname
       )`
    );
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
    connection = await oracledb.getConnection(); // Correct the function call
    const result = await connection.execute(
      `SELECT DISTINCT m.idmvversion 
       FROM MMVERSION.MVCURRENTCOMPONENTVERSION m 
       WHERE m.componentname = 'MMFIXEDODDS' 
       AND m.tscreated = (
         SELECT MAX(mv.tscreated) 
         FROM MMVERSION.MVCURRENTCOMPONENTVERSION mv 
         WHERE mv.componentname = m.componentname
       )`
    );
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
// API endpoint to fetch MMTEXAS data
app.get('/api/mmtexas', async (req, res) => {
    let connection;
    try {
      connection = await oracledb.getConnection(); // Correct the function call
      const result = await connection.execute(
        `SELECT DISTINCT m.idmvversion 
         FROM MMVERSION.MVCURRENTCOMPONENTVERSION m 
         WHERE m.componentname = 'MMTEXAS' 
         AND m.tscreated = (
           SELECT MAX(mv.tscreated) 
           FROM MMVERSION.MVCURRENTCOMPONENTVERSION mv 
           WHERE mv.componentname = m.componentname
         )`
      );
      console.log('MMTEXAS Query Result:', result.rows);
      res.send(result.rows);
    } catch (err) {
      console.error('Error fetching MMTEXAS data:', err.message);
      res.status(500).send({ error: `Error fetching MMTEXAS data: ${err.message}` });
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
    // API endpoint to fetch MMFOWARP data
app.get('/api/mmfowarp', async (req, res) => {
    let connection;
    try {
      connection = await oracledb.getConnection();
      const result = await connection.execute('SELECT DISTINCT m.idmvversion FROM MMVERSION.MVCURRENTCOMPONENTVERSION m WHERE m.componentname = \'MMFOWARP\' AND m.tscreated = (SELECT MAX(mv.tscreated) FROM MMVERSION.MVCURRENTCOMPONENTVERSION mv WHERE mv.componentname = m.componentname)');
      console.log('MMFOWARP Query Result:', result.rows);
      res.send(result.rows);
    } catch (err) {
      console.error('Error fetching MMFOWARP data:', err.message);
      res.status(500).send({ error: `Error fetching MMFOWARP data: ${err.message}` });
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

      // API endpoint to fetch MM data
app.get('/api/mm', async (req, res) => {
    let connection;
    try {
      connection = await oracledb.getConnection();
      const result = await connection.execute('SELECT DISTINCT m.idmvversion FROM MMVERSION.MVCURRENTCOMPONENTVERSION m WHERE m.componentname = \'MM\' AND m.tscreated = (SELECT MAX(mv.tscreated) FROM MMVERSION.MVCURRENTCOMPONENTVERSION mv WHERE mv.componentname = m.componentname)');
      console.log('MM Query Result:', result.rows);
      res.send(result.rows);
    } catch (err) {
      console.error('Error fetching MM data:', err.message);
      res.status(500).send({ error: `Error fetching MM data: ${err.message}` });
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
