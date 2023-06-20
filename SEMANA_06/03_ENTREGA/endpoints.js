const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const urlencodedParser = bodyParser.urlencoded({extended: false})


const hostname = '127.0.0.1'
const port = 3021
const sqlite3 = require('sqlite3').verbose()
const DBPATH = 'database.db'

app.use(express.json())

/* Definição dos endpoints */

// Retorna todos os registros de usuários 
app.get('/usuario', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*')
    var db = new sqlite3.Database(DBPATH)
    var sql = 'SELECT * FROM Sobre ORDER BY Nome COLLATE NOCASE'
        db.all(sql, [], (err, rows) => {
            if(err) {
                throw err;
            }
            res.json(rows)
        })
        db.close()
})

// Insere um registro (é o C do CRUD - Create)
app.post('/insereUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200
    res.setHeader('Access-Control-Allow-Origin', '*')
    var db = new sqlite3.Database(DBPATH)
    sql = `INSERT INTO Sobre (Endereco, Telefone, Email, Introducao, Nome, Cargo, Foto, id_usuario) VALUES ('${req.body.endereco}', '${req.body.telefone}', '${req.body.email}', '${req.body.introducao}', '${req.body.nome}', '${req.body.cargo}', '${req.body.foto}', '${req.body.id_usuario}')`
    console.log(sql)
    db.run(sql, [], err => {
        if (err) {
            throw err
        }
    }) 
    res.write('<p>USUARIO INSERIDO COM SUCESSO! </p><a href="/"> VOLTAR</a>')
    db.close()
    res.end()
})

// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizaUsuario', (req, res) => {
    res.statusCode = 200
    res.setHeader('Access-Control-Allow-Origin', '*')
    sql = "SELECT * FROM Sobre WHERE id_usuario=" + req.query.userId
    console.log(sql)
    var db = new sqlite3.Database(DBPATH)
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err
        }
        res.json(rows)
    })
    db.close()
})

//Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizaUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200
    res.setHeader('Acces-Control-Allow-Origin', '*')
    var sql = `UPDATE Sobre SET nome= '${req.body.nome}', email = '${req.body.email}', telefone = '${req.body.telefone}' WHERE id_usuario= '${req.body.id_usuario}'`
    console.log(sql)
    var db = new sqlite3.Database(DBPATH)
    db.run(sql, [], err => {
        if(err) {
            throw err
        }
        res.end()
    })
    res.write('<p>USUARIO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>')
    db.close()
})

app.get('/removeUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200
    res.setHeader('Access-Control-Allow-Origin', '*')
    var sql = `DELETE FROM Sobre WHERE id_usuario= '${red.query.id_usuario}'`
    console.log(sql)
    var db = new sqlite3.Database(DBPATH)
    db.run(sql, [], err => {
        if (err) {
            throw err
        }
        res.write('<p>USUARIO REMOVIDO COM SUCESSO</p><a href="/">VOLTAR</a>')
        res.end()
    })
    db.close()
})

app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`)
})


