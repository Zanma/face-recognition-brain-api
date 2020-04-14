const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send('this is working');
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