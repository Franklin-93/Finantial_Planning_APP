const sqlite3 = require('sqlite3');

const dbConnection = new sqlite3.Database('./database.App',(err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
});

const tableName ="lunchTime"
function creataTable(tableName){
    dbConnection.run(`CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL)`);
};

creataTable(tableName);

const myID = 822;
const myText = 'Have your lunch now man';



function insertText(id, text) {
dbConnection.run(`INSERT INTO lunchTime (id, text) VALUES (?, ?)`, [id, text], function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Row inserted with ID ${id}`);
})
};

insertText(myID, myText);




function retrieveMessages(id){
dbConnection.get(`SELECT * FROM lunchTime WHERE id = ?`, [id], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("this is now working",row);
});
}

retrieveMessages(myID);


dbConnection.close();


module.exports = {
    retrieveMessages,
    insertText
  };
