const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

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
    ],
    login: [
        {
            id: '123',
            hash: '',
            email: 'zen@gmail.com'
        }
    ]
}

app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.json(database.users);
})

app.post('/signin', (req, res)=>{
    bcrypt.compare("zain123", '$2a$10$zBaSgHQW8K.FffNv5qOdnuc0uuxWXCgUxNjZzcx8SktLgsx4QSZ7K', function(err, res) {
        console.log('first guess', res)
    });
    bcrypt.compare("veggies", "$2a$10$zBaSgHQW8K.FffNv5qOdnuc0uuxWXCgUxNjZzcx8SktLgsx4QSZ7K", function(err, res) {
        console.log('second guess', res)
    });
    if(req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password){
        res.json('success');
    }else{
        res.status(400).json('user not found');
    }
})

app.post('/signup', (req, res)=>{
    const { email, password, name } = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });
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

app.get('/profile/:id', (req, res)=>{
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(404).json('user not found');
    }
})

app.put('/image', (req, res)=>{
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(404).json('user not found');
    }
})



app.listen(3000, ()=>{
    console.log('this server is running in port 3000')
})