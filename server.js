const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));


app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {

    res.render('index');
});

const server = app.listen(8000, function() {
    console.log("listening on port 8000");
});
const io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    socket.on("button_clicked", function(data) {
        console.log(data);
        socket.emit('updated_message', {
            name: data.name,
            language: data.language,
            location: data.location,
            comment: data.comment

        })
        var number = Math.floor(Math.random() * 101);

        socket.emit('lucky_number', {
            number: number

        })
    })



})