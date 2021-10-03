const express = require("express");
const app = express();

const port = 3000; 

app.use(express.json()); // falar para as reqs do express trabalhar com o json

const filmes = [
    "Matrix",
    "Aldim",
    "Malevola",
    "A Caixa",
    "Paixão de Cristo."
]

// primeira rota, retorna apenas a msn Hello, Blummer!
app.get('/', (req, res) => {
    res.send('Hello, Blumer!');
})

// rota dos filmes - primeira rota listagem dos filmes.
app.get('/filmes', (req, res) => {
    res.send(filmes);
})

// rota do filme individual por id
app.get('/filmes/:id', (req, res) => {
    const id = req.params.id -1;

    const filme = filmes[id]

    if(!filme) {
        res.send('Filme não encontrado');
    }

    res.send(filme);
})

// rota que cadastra um novo filme.
// lista -get
// criar - post
// atualizar -put
// deletar - delete
//api não sabe qual filme ta vindo

app.post('/filmes', (req, res) => {
    const filme = req.body.filmes; //.filme é a chave que está indo o dado.
    const id = filmes.length +1;
    const nota = req.body.nota;
    filmes.push(filme);
    
    res.send(`Filme adicionado com sucesso: ${filme}.
    O ID do filme é ${id}`)
})

app.put('/filmes/:id', (req, res) => {
    const id = req.params.id -1;
    const filme = req.body.filmes;
    const filmeAnterior = filmes[id];
    filmes[id] = filme;
    res.send(`Filme anterior ${filmeAnterior}, atualizado com sucesso para: ${filme}.`)
})

app.delete('/filmes/:id', (req, res) => {
    const id = req.params.id -1
    const filme = filmes[id];
    if(!filme) {
        res.send('Filme não encontrado');
    }
    delete filmes[id];
    res.send("Filme excluído com sucesso");
})

//splace
app.delete('/filmes/:id', (req, res) => {
    const id = req.params.id -1
    filmes.splice(id,1)
    //delete filmes[id];
    res.send("Filme excluído com sucesso")
})

app.listen(port,function() {
    console.info(`App rodando na porta http://localhost:${port}/`);
})