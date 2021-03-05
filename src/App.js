import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";

// import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// export default function App() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/users">Users</Link>
//             </li>
//           </ul>
//         </nav>

//         {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL. */}
//         <Switch>
//           <Route path="/about">
//             <About />
//           </Route>
//           <Route path="/users">
//             <Users />
//           </Route>
//           <Route path="/">
//             <Home />
//           </Route>
//         </Switch>
//       </div>
              
//     // <div style={{ backgroundImage: "url(/computer-the-room-hacker-the-world-at-night-wallpaper-preview.jpg)" }}>
//     //   gv
    
//       <div className="todoapp stack-large">
//         {/* <div style={{ backgroundImage: "url(/computer-the-room-hacker-the-world-at-night-wallpaper-preview.jpg)" }}> */}
      
//         <Form addTask={addTask} />


//         <div className="filters btn-group stack-exception">
//         {filterList}
//         </div>
//         <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
//                 {headingText}
//         </h2>
//         <ul
//           role="list"
//           className="todo-list stack-large stack-exception"
//           aria-labelledby="list-heading"
//         >
//           {taskList}
//         </ul>
//       </div>
//      </div>  

//     </Router>
    
    
//   );
// }

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: task => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

function App(props) {
  const listHeadingRef = useRef(null);
  const [tasks, setTasks] = useState(props.tasks);
 

  const [filter, setFilter] = useState('All');
  const FILTER_NAMES = Object.keys(FILTER_MAP);
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }
  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  
  const taskList = tasks
.filter(FILTER_MAP[filter])
.map(task => (
  <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
  />
      ));
      // const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
      const headingText = `${taskList.length}`;

      // ${tasksNoun} remaining
      const prevTaskLength = usePrevious(tasks.length);

      useEffect(() => {
        if (tasks.length - prevTaskLength === -1) {
          listHeadingRef.current.focus();
        }
      }, [tasks.length, prevTaskLength]);
  

return (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
            
  {/* // <div style={{ backgroundImage: "url(/computer-the-room-hacker-the-world-at-night-wallpaper-preview.jpg)" }}>
  //   gv */}
  
    <div className="todoapp stack-large">
      {/* <div style={{ backgroundImage: "url(/computer-the-room-hacker-the-world-at-night-wallpaper-preview.jpg)" }}> */}
    
      <Form addTask={addTask} />


      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
              {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
   {/* </div>   */}

  </Router>
  
  
);
        }

export default App;