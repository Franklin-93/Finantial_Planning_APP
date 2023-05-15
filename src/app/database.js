const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('database.db');

function bdTest(){
    db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)');

    const id = Math.floor(Math.random() * 1000000); // Generate a random ID
    const message = 'Hello, world!'; // Replace this with your actual message
    
    db.run(`INSERT INTO messages (id, message) VALUES (${id}, '${message}')`);
    
    
    db.get(`SELECT message FROM messages WHERE id = ${id}`, (err, row) => {
      if (err) {
        console.error(err);
        return;
      }
      
      console.log(row.message); // Do something with the retrieved message
    });
    

}

module.exports = {
    bdTest: dbTest
  };
