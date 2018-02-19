const express = require('express');
const morgan = require('morgan');
const todos = require('./todos');

const app = express();

app.set('view engine', 'pug');

app.use(
  // (req, res, next) => {
  //   let date = new Date(Date.now());
  //   console.log(`${date} - ${req.method} - ${req.url}`);
  //   next();
  // }
  morgan('dev')
);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Express Todo',
    todos
  });
});

app.get('/todos', (req, res) => {
  if(req.query.completed) {
    return res.json(todos.filter(todo => todo.completed.toString() === req.query.completed));
  }

  res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  let todo = todos.find(todo => todo.id == req.params.id);

  if(!todo) return res.status(404).send('Oops, not found :(');

  res.json(todo);
});

app.listen(5000, () =>
  console.log('Server started at port 5000')
);