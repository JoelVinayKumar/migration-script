const mysql = require('mysql');
const fs = require('fs').promises;

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'email'
});
connection.connect();

const migrate = () => {
  connection.query('select * from accounts', async (err, data) => {
    if (err) throw new Error(err);

    await fs.writeFile('./dump/accounts.json', JSON.stringify(data), 'utf-8')
  })

  connection.query('select * from entity_mappings', async (err, data) => {
    if (err) throw new Error(err);

    await fs.writeFile('./dump/entityMappings.json', JSON.stringify(data), 'utf-8')
  })

  connection.query('select * from messages', async (err, data) => {
    if (err) throw new Error(err);

    await fs.writeFile('./dump/mails.json', JSON.stringify(data), 'utf-8')
  })
}
migrate();
connection.end();