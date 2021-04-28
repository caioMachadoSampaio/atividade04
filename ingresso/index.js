const express = require ('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const ingressoPorClienteId = {};
const { v4: uuidv4 } = require('uuid');
//const observacoesPorLembreteId = {};
app.put('/clientes/:id/ingresso', async (req, res) => {
  const idIngresso = uuidv4();
  const descr = req.body.descricao;
  const quant = req.body.quantidade;
   //req.params dá acesso à lista de parâmetros da URL
   const ingressoDoCliente =
   ingressoPorClienteId[req.params.id] || [];
   ingressoDoCliente.push({ id: idIngresso, descr, quant});
   ingressoPorClienteId[req.params.id] =
   ingressoDoCliente;
   await axios.post('http://localhost:10000/eventos', {
   tipo: "IngressoCriado",
   dados: {
   id: idIngresso, descr, quant , idIngresso: req.params.id
   }
   })
   res.status(201).send(ingressoDoCliente);

});

app.get('/clientes/:id/ingresso', (req, res) => {
    res.send(ingressoPorClienteId[req.params.id] || []);
});

app.post("/eventos", (req, res) => {
      console.log(req.body);
      res.status(200).send({ msg: "ok" });
      });

app.listen(5000, (() => {
console.log('clientes. Porta 5000');
}));