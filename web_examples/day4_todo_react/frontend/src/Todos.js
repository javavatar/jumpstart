import React from 'react';

import TodoItem from './TodoItem';

const Todos = (props) =>
(
  <section className="main">
    <ul className="todo-list">
      {
        props.todos.map((todo) => {
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
