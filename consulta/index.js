const express = require("express");
const app = express();
app.use(express.json());
const baseConsulta = {};
const funcoes = {
    ClienteCadastrado: (clientes) => {
    baseConsulta[clientes.id] = clientes;
     },
    IngressoCriado: (ingressos) => {
    const ingressos =
    baseConsulta[ingresso.idIngresso]["ingressos"] ||[];
    ingressos.push(ingresso);
    baseConsulta[ingresso.idIngresso]["ingressos"] =
    ingressos;
    }
     };

app.get("/clientes", (req, res) => {
    res.status(200).send(baseConsulta);
});

app.post("/eventos", (req, res) => {
    funcoes[req.body.tipo](req.body.dados);
    res.status(200).send(baseConsulta);
});

app.listen(6000, () => console.log("Consultas. Porta 6000"));