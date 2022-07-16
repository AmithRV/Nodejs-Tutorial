const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

// Middleware functions
app.use((request, response, next) => {
    console.log('start');
    next();
})
// 

app.get('/', (request, response) => {
    response.sendFile(resolve('../Html/welcome.html'));
    console.log('middle');
});


app.get('/signup', (request, response) => {
    response.sendFile(resolve('../Html/signup.html'));
});

app.post('/details', (request, response) => {
    response.send('<span>Accoount created</span><br/><a href="/">Home</a>');
});

app.get('/login', (request, response) => {
    response.sendFile(resolve('../Html/login.html'));
});


app.get('*', (request, response) => {
    response.sendFile(resolve('../Html/page-not-found.html'));
});


app.listen(3000, () => {
    console.log(`server running in port ${port}`)
});

