const { json } = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())

app.get('/', (req, res) => {
    res.send(users);
});

app.get('/:id', (req, res) => {
    let user = users.filter(e => e.id == req.params.id);
    console.log(req.params.id);
    console.log(user);
    res.send(user);
});

app.post('/', (req, res) => {
    let user = users.filter(e => e.id == req.body.id);
    console.log(user, user.length);
    if (user.length > 0) {
        res.send('id exist')
    } else {
        const obj = {id: req.body.id, email: req.body.email, password: req.body.password};
        users.push(obj);
        res.send('user added succesfuly');
    }
    
})

app.put('/:id', (req, res) => {
    let user = users.filter(e => e.id == req.params.id);
    const obj = {id: req.body.id, email: req.body.email, password: req.body.password};
    users[user] = obj;
    res.send(users)
});

app.delete('/:id', (req, res) => {
    let user = users.filter(e => e.id == req.params.id);
    console.log(user, user.length);
    if (user.length === 0) {
        res.send('id not exist')
    } else {
       users.splice(users.filter(e => e.id == req.params.id), 1);
        console.log(users);
        res.send('user delete succesfuly');
    }
})


app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
});


const users = [
    {id: 1, email: 'abc@sample.com', password: 'abc123:)'},
    {id: 2, email: 'abc@sample.com', password: 'abc123:)'},
    {id: 3, email: 'abc@sample.com', password: 'abc123:)'},
]

