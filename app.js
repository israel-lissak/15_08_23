const { json } = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jsonfile = require("jsonfile");
const axios = require("axios");

app.use(express.json());

// get all users
app.get("/", (req, res) => {
    res.send(jsonfile.readFileSync("usersDB.json"));
});

// get user by id
app.get("/:id", (req, res) => {
    const allUsers = jsonfile.readFileSync("usersDB.json");
    let user = allUsers.filter((e) => e.id == req.params.id);
    console.log(req.params.id);
    console.log(user);
    res.send(user);
});

// add new user
app.post("/", (req, res) => {
    const rndomId = uuidv4();
    const allUsers = jsonfile.readFileSync("usersDB.json");
    let user = allUsers.filter((e) => e.id == rndomId);
    console.log(user, user.length);
    if (user.length > 0) {
        res.send("id exist");
    } else if (!validator.isEmail(req.body.email)) {
        res.send("email is not valid");
    } else if (!validator.isStrongPassword(req.body.password)) {
        res.send("password is not stront enough");
    } else {
        const obj = {
            id: rndomId,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        };
        allUsers.push(obj);
        jsonfile.writeFileSync("usersDB.json", allUsers);
        res.send("user added succesfuly");
    }
});

// log in Validation
app.post("/:email/:password", (req, res) => {
    let userFound = false;
    const allUsers = jsonfile.readFileSync("usersDB.json");
    allUsers.forEach((element) => {
        if (
            (req.params.email === element.email) &
            bcrypt.compareSync(req.params.password, element.password)
        ) {
            res.send("User is connected");
            userFound = true;
        }
    });
    if (!userFound) {
        res.send("wrong credentials");
    }
});

// update user (by id)
app.put("/:id", (req, res) => {
    const allUsers = jsonfile.readFileSync("usersDB.json");
    let user = allUsers.filter((e) => e.id == req.params.id);
    const obj = {
        id: req.body.id,
        email: req.body.email,
        password: req.body.password,
    };
    allUsers[user] = obj;
    jsonfile.writeFileSync("usersDB.json", allUsers);
    res.send(allUsers);
});

// delete user (by id)
app.delete("/:id", (req, res) => {
    const allUsers = jsonfile.readFileSync("usersDB.json");
    let user = allUsers.filter((e) => e.id == req.params.id);
    console.log(user, user.length);
    if (user.length === 0) {
        res.send("id not exist");
    } else {
        allUsers.splice(
            allUsers.filter((e) => e.id == req.params.id),
            1
        );
        console.log(allUsers);
        jsonfile.writeFileSync("usersDB.json", allUsers);
        res.send("user delete succesfuly");
    }
});

axios.get("https://dummyjson.com/products/1")
    .then((response) => {
        const data = response.data;
        console.log(data);
        const allUsers = jsonfile.readFileSync("usersDB.json");
        const user = allUsers[0];
        console.log(user);
        user.prodact = data;
        console.log(user);
        return axios.post("https://jsonplaceholder.typicode.com/users", user);
    })
    .then((response) => {
        const responseData = response.data;
        console.log(responseData);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
    
axios.get("https://jsonplaceholder.typicode.com/users/11")
    .then((response) => {
        const data = response.data;
        console.log(data);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

// 'server is running' messege
app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
});

// demo array

const hashedPassword1 = bcrypt.hashSync("Abc111:)", 10);
const hashedPassword2 = bcrypt.hashSync("Abc222:)", 10);
const hashedPassword3 = bcrypt.hashSync("Abc333:)", 10);
const users = [
    { id: uuidv4(), email: "abc1@sample.com", password: hashedPassword1 },
    { id: uuidv4(), email: "abc2@sample.com", password: hashedPassword2 },
    { id: uuidv4(), email: "abc3@sample.com", password: hashedPassword3 },
];

jsonfile.writeFileSync("usersDB.json", users);

const usresArr = jsonfile.readFileSync("usersDB.json");
console.log(usresArr);



