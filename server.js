var app=require("express")();
var http=require("http").Server(app);
var io=require("socket.io")(http);


// app.use(express.static(_dirname+"/static"));

app.get("/",function (req,res,next) {
    res.sendFile(__dirname+"/static/index.html");
});

io.on("connection",function (socket) {
    console.log("one user connected "+socket.id);

    socket.on("msg",function (data) {
        console.log(data);
        var sockets=io.sockets.sockets;
        sockets.forEach(function (item) {
            item.emit("message",{message:data});
        });

    });


    socket.on('join', function(userNickname) {

        console.log(userNickname +" : has joined the chat "  );

        socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat ")
    });

    socket.on("disconnect",function () {
        console.log("user disconnected "+socket.id)
        socket.broadcast.emit( "userdisconnect" ,' user has left')
    });
});



http.listen(8000);
console.log("server run on port 8000");
