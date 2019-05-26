import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CreateTodo from "./pages/CreateTodo";
import EditTodo from "./pages/EditTodo";
import TodoList from "./pages/TodoList";
import NotFound from "./pages/NotFound";
import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core';


class App extends Component {

  
  render() {  
    
    return (
      <Grid style={{height: '100%'}}>
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

          <Switch>
            <Route path="/" exact component={TodoList} />
            <Route path="/edit/:id" component={EditTodo} />
            <Route path="/create" component={CreateTodo} />
            <Route component={NotFound} />
          </Switch>

          <footer style={{marginTop: 100}}>
            <Typography variant="h6" align="center" gutterBottom>
              Built using MERN stack and Material-UI
            </Typography>
            <Typography variant="caption" align="center" color="textSecondary" component="p">
              To check out the source code, please click <a href="https://github.com/danishakh/myTodoList">here</a>
            </Typography>
          </footer>

        </Router>
      </Grid>
    );
  }
}

export default App;
