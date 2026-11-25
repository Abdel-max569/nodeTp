import express from 'express'

const app = express();
const PORT = 3000;

//Assignation middleware de maniere global
app.use(express.json());

app.get("/", (req, res) => {
    res.send({});
})

app.get('/etudiant/:id', (req, res) => {

    res.send(`Product ${req.params.id}`);
})

app.post('/login', (req, res) => {
    console.log(req.body);
})

app.listen(PORT, () => {
    console.log(`Àpi server listen on http://127.0.0.1:${PORT}`);

})
