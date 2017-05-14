import React from 'react';

const Header = (props) =>
  (
    <header>
      <h1>JS-Todos</h1>
      <input
        className="new-todo"
        type="text"
        placeholder="Enter todo here"
        onChange={props.onInputChange}
        onKeyDown={props.onInputKeyDown}
        value={props.inputValue}/>
    </header>
  );

export default Header;
