
const sqlite3 = require('sqlite3');
//const {ipcMain, ipcRenderer} = require('electron');

const tableName ="WORLDS";
// Create database connection
const dbConnection = new sqlite3.Database('./database.db',(err) => {
  if (err) {
    console.error(err.message);
  } else{
    console.log('Connected to the database.');  
    createTable(tableName);
  }    
});

// Create table
function createTable(tableName) {
  dbConnection.run(`CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL, retrieve_ID TEXT NOT NULL)`,(err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`Table ${tableName} created or already exists.`);
      }
    }
  );
}

// Insert 
function insertText(text, retrieve) {
  dbConnection.run(`INSERT INTO ${tableName} (text, retrieve_ID ) VALUES (?, ?)`, [text, retrieve], function(err) {
    if (err) {
    return console.error(err.message);
    }
      console.log(`Row inserted with ID ${retrieve}`);
  });
};

/*function retrieveMessages(id, breakdown){
  dbConnection.get(`SELECT * FROM ${tableName} WHERE retrieve_ID = ?`, [id], (err, row) => {
    if (err) {
    return console.error(err.message);
    }

    breakdown = row.text;
      console.log("Data trieved:\n");
      console.log(breakdown);
  });
};*/

function retrieveMessages(id) {
  return new Promise((resolve, reject) => {
    dbConnection.get(`SELECT * FROM ${tableName} WHERE retrieve_ID = ?`, [id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      const breakdown = row.text;
      console.log("Data retrieved:\n");
      //console.log(breakdown);
      resolve(breakdown);
    });
  });
}


// Drop Table
function dropTable(tableName) {
  dbConnection.run(`DROP TABLE IF EXISTS ${tableName}`, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Table '${tableName}' dropped or did not exist.`);
    }
  });
}


module.exports={
  createTable,
  insertText,
  retrieveMessages,
  dropTable
};