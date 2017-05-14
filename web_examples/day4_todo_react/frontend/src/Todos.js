import React from 'react';

import TodoItem from './TodoItem';


function filterTodos(todos, filter) {
    switch ( filter ){
        case 'all':
            return todos;
        case 'activ':
            return todos.filter( (todo) =>{
                return todo.done == false;
            });
        case 'done':
            return todos.filter( (todo) =>{
                return todo.done;
            });
    }

}


const Todos = (props) =>
(
  <section className="main">
    <ul className="todo-list">
      {
        filterTodos(props.todos, props.filter).map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              name={todo.name}
              done={todo.done}
              onToggleItem={() => props.onToggleItem(todo.id)}
              onItemDelete={() => props.onItemDelete(todo.id)} />
          );
        })
      }
    </ul>
  </section>
);

export default Todos;
