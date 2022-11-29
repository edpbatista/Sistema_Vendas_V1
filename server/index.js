const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;


const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "banco",
});

app.use(express.json());
app.use(cors());

app.post("/cadastroProduto", (req, res) => {
  const { name } = req.body;
  const { preco_custo } = req.body;
  const { preco_venda } = req.body;
  const { quant_estoque } = req.body;

  let SQL = "INSERT INTO produto ( name, preco_custo, preco_venda,quant_estoque ) VALUES (?,?,?,?)";
 
  db.query(SQL, [name, preco_custo, preco_venda,quant_estoque], (err, result) => {
    if(err){
      res.send({ msg: "Erro" })
    }else{
      res.send({msg: "sucesso"})
    }
  });

});

app.get("/getProduto", (req, res) => {

  let SQL = "SELECT * FROM produto";

  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO usuarios (email, password) VALUES (?,?)",
          [email, hash],
          (error, response) => {
            if (err) {
              res.send(err);
            }

            res.send({ msg: "Usuário cadastrado com sucesso" });
          }
        );
      });
    } else {
      res.send({ msg: "Email já cadastrado" });
    }
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response) {
          res.send({ msg: "Usuário logado" });
        } else {
          res.send({ msg: "Senha incorreta" });
        }
      });
    } else {
      res.send({ msg: "Usuário não registrado!" });
    }
  });
});

app.listen(3001, () => {
  console.log("rodando na porta 3001");
});
