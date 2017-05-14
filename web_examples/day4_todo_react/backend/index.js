var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const port = 4000;
var id = 3;

var todos = [
];

io.on('connection',  (socket) => {
  console.log("Client connected");
  socket.emit('refresh', todos);

  socket.on('addTodo', function (nameOfTodo) {
    addTodo(nameOfTodo);
      socket.emit('newTodo',id);
      socket.broadcast.emit('refresh', todos);
  });

  socket.on('removeTodo', function (id) {
    removeTodo(id);
      socket.broadcast.emit('refresh', todos);
  });

  socket.on('clearCompletedTodos', function () {
    clearCompletedTodos();
      socket.broadcast.emit('refresh', todos);
  });

  socket.on('toggleTodo', function (id) {
    toggleTodo(id);
      socket.broadcast.emit('refresh', todos);
  });

});

server.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});

function addTodo(name) {
  todos.push({
    name: name,
    done: false,
    id: ++id,
  });
}

function removeTodo(id) {
  todos = todos.filter(function (todo) {
    return todo.id != id;
  });
}

function clearCompletedTodos() {
  todos = todos.filter(function (todo) {
    return todo.done !== true;
  });
}

function toggleTodo(id) {
  todos = todos.map(function (todo) {
    if (todo.id == id) {
      todo.done = !todo.done;
    }

    return todo;
  });
}
