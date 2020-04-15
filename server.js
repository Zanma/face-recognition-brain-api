const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const database = {
    users: [
        {
            id: '01',
            name: 'zen',
            email: 'zen@gmail.com',
            password: 'zen123',
            entries: 0,
            joined: new Date()
        },
        {
            id: '02',
            name: 'mahmud',
            email: 'mahmud@gmail.com',
            password: 'mahmud123',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.json(database.users);
})

app.post('/signin', (req, res)=>{
    if(req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password){
        res.json('success');
    }else{
        res.status(400).json('user not found');
    }
})

app.post('/signup', (req, res)=>{
    const { email, password, name } = req.body;
    database.users.push({
        id: '03',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.listen(3000, ()=>{
    console.log('this server is running in port 3000')
})

/*
/ ---> res = this is working
/ signin --> POST = success/fail
/ register --> POST = user
/ profile/:userid --> GET = user 
/ image --> PUT --> user
*/