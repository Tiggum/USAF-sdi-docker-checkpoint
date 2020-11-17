const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: 'database',
  database: "emails",
  password: "pikachu",
  port: 5432,
});

const getEmails = (request, response) => {
  pool.query("SELECT * FROM emails", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getEmailById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM emails WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const searchEmails = (request, response) => {
  const search = `%${request.query.search}%`;

  pool.query('SELECT * FROM emails WHERE subject LIKE $1', [search], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const sendEmail = (request, response) => {
  const { sender, recipient, subject, message } = request.body

  pool.query('INSERT INTO emails (sender, recipient, subject, message, date) VALUES ($1, $2, $3, $4, $5)', [sender, recipient, subject, message, new Date().toLocaleDateString()], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Email sent.`)
  })
}



module.exports = {
  getEmails,
  getEmailById,
  searchEmails,
  sendEmail,
};
