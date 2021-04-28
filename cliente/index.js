//importa os módulos http e express
const express = require('express');
//constrói um objeto express
const app = express();
//importa o body-parser
app.use(express.json());
//configura a porta do servidor e o coloca em execução.
const axios = require("axios");
let clientes =[{
    id: 1,
    nome:'José',
    endereco : 'rua x',
    idade: 45,
    status: ''
},
{
    id: 2,
    nome:'Carlos',
    endereco : 'rua x',
    idade: 33,
    status: '' 
    
}];
let id=clientes.length;
app.get('/clientes',(req,res,next)=>{
    res.status(200).json(clientes);
});
app.post('/eventos', (req,res,next)=>{
    console.log(req.body);
    res.status(200).send({ msg: "ok" });    
});
app.delete('/clientes/:id',(req,res,next)=>{
    let newClientes=[];
    let idCliente = req.params.id
    for(let cliente of clientes){
        if(cliente.id != idCliente)
        {
          cliente.id = newClientes.length + 1;
          newClientes.push(cliente);
        }

    }
    id = newClientes.length;
    clientes =  newClientes;
    res.status(200).json(clientes);
});
app.put('/clientes', async (req,res,next)=>{
    const cliente = {
        id : id+1,
        nome:req.body.nome,
        endereco:req.body.endereco,
        idade:req.body.idade,
        status:'aguardando...'
    }
    clientes.push(cliente);
    id += 1;
    await axios.post("http://localhost:10000/eventos", {
    tipo: "ClienteCadastrado",
    dados: {
     id : id+1,
     nome : req.body.nome,
     endereco:req.body.endereco,
     idade:req.body.idade,
     status:'aguardando...'
          },
     });
    res.status(201).json(clientes);
});
app.listen(4000, ()=>{
    console.log('Escutando porta 4000');
})
