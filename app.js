const { json } = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())

app.get('/', (req, res) => {
    res.send(users);
});

app.get('/:id', (req, res) => {
    res.send(users[req.params.id-1]);
});

app.post('/', (req, res) => {
    const obj = {id: req.body.id, email: req.body.email, password: req.body.password};
    console.log(":)");
    users.push(obj);
    res.send(users)
})

app.put('/:id', (req, res) => {
    
});


app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
});


const users = [
    {id: 1, email: 'abc@sample.com', password: 'abc123:)'},
    {id: 2, email: 'abc@sample.com', password: 'abc123:)'},
    {id: 3, email: 'abc@sample.com', password: 'abc123:)'},
]

