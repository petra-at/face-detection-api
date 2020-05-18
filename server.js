const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors'); 
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const dB = knex({
    client: 'pg',
    connection: {
      host : 'ec2-54-246-85-151.eu-west-1.compute.amazonaws.com',
      user : 'rtalbtsfpgskhr',
      password : '7f9a786aa9506d0d56366009e88e4d34adb4d8c38099e3ad49145903a40fc980',
      database : 'd4k4blfqku4s9v'
    }
  });

//Middleware
app.use(bodyParser.json());
app.use(cors());

//API
app.get('/',(req,res)=>{
    res.json('Hey!')
})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,dB)})

app.post('/signin',signin.handleSignIn(dB,bcrypt))

app.post('/register',(req,res)=>{register.handleRegister(req,res,dB,bcrypt)}) // injecting whatever dependencies this method requires same as passing by reference

app.put('/image',(req,res)=>{image.handleImage(req,res,dB)})

app.post('/imageurl',(req,res)=>{image.handleClarifai(req,res)})

app.listen(process.env.PORT||3002,()=>{
    console.log(`server is listening on port ${process.env.port}`); 
}); 


