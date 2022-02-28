const express = require('express');
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server, { core: { origin: '*' } });

app.set('view engine', 'ejs')
app.use(express.static('./public/'))

// make rooms
// make the use inter 
// make the user inter its name 
// one session of the room 
// multi messages 
// leave the room and logout 

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/room', (req, res) => {
    console.log();
    res.render('chartRoom')
})


server.listen(process.env.PORT || 5000)

io.on('connection', (s) => {
    console.log('connection', s.id);

    //reseve message
    s.on('message', (value) => {
        console.log(value);
        //send
        s.broadcast.emit('message', value)
    })



})
