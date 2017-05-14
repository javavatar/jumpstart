import React from 'react';

const Footer = (props) =>
    (
        /* Try to implement the footer based on the html you already have from day 3 */
        <footer className="footer">
      <span className="todo-count">
        <strong>{props.getOpenTodoCount}</strong> items left
      </span>
            <ul className="filters">
                <li id="filterAll"
                    onClick={props.setFilter.bind(this, 'all')}>
                    <a className={props.filter === "all" ? "selected":""}>All</a>
                </li>
                <li id="filterActiv"

                    onClick={props.setFilter.bind(this, 'activ')}>
                    <a className={props.filter === "activ" ? "selected":""}>Active</a>
                </li>
                <li id="filterCompleted"

                    onClick={props.setFilter.bind(this, 'done')}>
                    <a className={props.filter === "done" ? "selected":""}>Completed</a>
                </li>
            </ul>
            <button className="clear-completed"
            onClick={props.clearCompletedTodos}>
                Clear completed
            </button>
        </footer>
    );

export default Footer;
