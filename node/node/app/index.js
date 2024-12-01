const express = require('express');
const app = express();
const port = 3000;
 
const config = {
    host: 'db',
    user: 'usuario',
    password: 'senha',
    database: 'desafionode'
};
const mysql = require('mysql');

const nomes = ['João', 'Maria', 'Pedro', 'José', 'Marcos', 'Lucas', 'Amanda', 'Gabriel', 'Daniela', 'Beatriz', 'Ana', 'Rafael'];

app.get('/', async (req, res) => {

    const random = Math.floor(Math.random() * nomes.length);
    insertPeople(nomes[random]);

    let usuarios = await getAllPeople();
    let resposta = '<h1>Full Cycle Rocks!</h1>';
    
    usuarios.forEach((u) => {
        resposta += `<p>${u.id} - ${u.name}</p>`;
    });

    res.send(resposta);
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


async function getAllPeople() {
    return await sqlQuery( 'SELECT * FROM people');
}

async function insertPeople(name) {
    if (!name) {
        console.error('Invalid name provided');
        return;
    }
    await sqlQuery(`INSERT INTO people (name) VALUES ('${name}')`);
}


function sqlQuery (sql) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(config);
        connection.query(sql, function (error, results, fields) {
            if (error) {
                console.log(error)
                reject(error)
            }
            connection.end();
            resolve(results)
        })
    })
}