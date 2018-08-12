require('dotenv').load();
const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL;

class DAO {
    static createUser(id){

        const client = new Client();
        client.connect().catch(err => console.log(err));

        client.query('INSERT INTO users (idUser) VALUES ($1)', [id])
            .then(res => {
                client.end();
                console.log("successfully created user "+id);
            })
            .catch(e => console.error(e.stack));
    }

    static getUserInfo(id){
        const client = new Client({
            connectionString: connectionString,
        });
        client.connect().catch(err => console.log(err));

        return new Promise((resolve, reject) => {
            client.query('SELECT * FROM users WHERE idUser = $1', [id])
                .then(res => {
                    client.end();
                    resolve(res.rows);
                })
                .catch(e => {
                    console.error(e.stack);
                    reject();
                });
        });
    }

    static registerNewIP(id, ip){
        const client = new Client({
            connectionString: connectionString,
        });
        client.connect().catch(err => console.log(err));

        return new Promise((resolve, reject) => {
            client.query('UPDATE users SET ip = $1 WHERE idUser = $2', [ip,id])
                .then(res => {
                    client.end();
                    resolve();
                })
                .catch(e => {
                    console.error(e.stack);
                    reject();
                });
        });
    }
}

module.exports = DAO;
