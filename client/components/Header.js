import React from 'react';

const Header = (props) => {
  console.log("INSIDE HEADER", props);
  return (
    <header id="header" style={{marginTop: "62px"}}>
      <div className="content">
        <h1><a href="#">All My To-Do's</a></h1>
        <ul className="actions">
          {
            props.Tasks.objects && props.Tasks.objects.map((task) => {
              return (
                <li><a href="#" className="button special"><input type="checkbox"/>{task.title}</a></li>
              )
            })
          }
        </ul>
      </div>
    </header>
  );
};

export default Header;
