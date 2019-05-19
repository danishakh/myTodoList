import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CreateTodo from "./pages/CreateTodo";
import EditTodo from "./pages/EditTodo";
import TodoList from "./pages/TodoList";
import { AppBar, Toolbar, Typography } from '@material-ui/core';


class App extends Component {

  
  render() {  
    
    return (
      <Router>
        <div className="container">
          <AppBar position='static'>
            <Toolbar>
              <Typography variant="h5" color="inherit" component={Link} to="/">
                My To-Do App
              </Typography>
            </Toolbar>
          </AppBar>
        </div>

        <Route path="/" exact component={TodoList} />
        <Route path="/edit/:id" component={EditTodo} />
        <Route path="/create" component={CreateTodo} />
    </Router>
    );
  }
}

export default App;
