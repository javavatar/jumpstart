import React from 'react';

const TodoItem = (props) =>
    (

        /* Implement the rendering code for an element in the todo list,
         take the Header.JS as a reference and look up the html in your existing html from day 3 */

        <li className={props.done ? "completed":""}>
            <div class="view">
                <input className="toggle" type="checkbox"
                       checked={props.done ? "checked":""}
                onClick={props.onToggleItem}/>
                    <label>{props.name}</label>
                    <button className="destroy"
                    onClick={props.onItemDelete}></button>
            </div>
        </li>

);

export default TodoItem;
