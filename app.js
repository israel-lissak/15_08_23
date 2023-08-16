const { json } = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

app.use(express.json())

// get all users
app.get('/', (req, res) => {
    res.send(users);
});

// get user by id
app.get('/:id', (req, res) => {
    let user = users.filter(e => e.id == req.params.id);
    console.log(req.params.id);
    console.log(user);
    res.send(user);
});


// add new user
app.post('/', (req, res) => {
    const rndomId = uuidv4();
    let user = users.filter(e => e.id == rndomId);
    console.log(user, user.length);
    if (user.length > 0) {
        res.send('id exist')
    } else {
        const obj = {id: rndomId , email: req.body.email, password: bcrypt.hashSync(req.body.password, 10)};
        users.push(obj);
        res.send('user added succesfuly');
    }
})

// log in Validation
app.post('/:email/:password', (req, res) => {
    let userFound = false;
    users.forEach(element => {
        if (req.params.email === element.email & bcrypt.compareSync(req.params.password, element.password)) {
            res.send('User is connected');
            userFound = true;
        } 
    });
    if (!userFound) {
        res.send('wrong credentials')
    }
})

// update user (by id)
app.put('/:id', (req, res) => {
    let user = users.filter(e => e.id == req.params.id);
    const obj = {id: req.body.id, email: req.body.email, password: req.body.password};
    users[user] = obj;
    res.send(users)
});

// delete user (by id)
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


// 'server is running' messege
app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
});

// demo array

const hashedPassword1 = bcrypt.hashSync('abc111:)', 10);
const hashedPassword2 = bcrypt.hashSync('abc222:)', 10);
const hashedPassword3 = bcrypt.hashSync('abc333:)', 10);
const users = [
    {id: uuidv4(), email: 'abc1@sample.com', password: hashedPassword1},
    {id: uuidv4(), email: 'abc2@sample.com', password: hashedPassword2},
    {id: uuidv4(), email: 'abc3@sample.com', password: hashedPassword3},
]

