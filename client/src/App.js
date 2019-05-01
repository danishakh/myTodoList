import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CreateTodo from "./components/CreateTodo";
import EditTodo from "./components/EditTodo";
import TodoList from "./components/TodoList";
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class App extends Component {

  
  render() {  
    
    return (
      <Router>
        <div className="container">
          <AppBar position='static'>
            <Toolbar>
              <Typography variant="h5" color="inherit">
                My To-Do App
              </Typography>
              <Button  component={Link} to="/" color="inherit">Todo List</Button>
              <Button component={Link} to="/create" color="inherit">Create Todo</Button>
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
