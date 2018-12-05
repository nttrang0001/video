var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var users_array  =   [];

io.on('connection', function(socket){
    console.log('a user connected: ' + socket.id);
    users_array.push(socket.id);
    console.log(users_array);
    //gui danh sach may
    io.emit("server-send-list-user", users_array);

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });


    //server nhận ảnh từ C#
    socket.on('takeImageFromStudent', function(data){
        // //chen phan tu vao mang ten
        // users_array.push(data);

    	//server gửi toi máy giáo viên
        io.emit('sendImageToTeacher', data);
    });
});

http.listen(process.env.PORT || 8000, function(){
    console.log('listening on localhost:8000');
});