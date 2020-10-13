import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ClientManagement from './components/ClientManagement';
import AddClient from './components/AddClient';
import EditClient from './components/UpdateClient';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(2),
    backgroundColor: '#F4F6F8',
    padding: '50px',
  },
}));


function App() {
  const classes = useStyles();

  return (
    <Router>
      <Paper className={classes.paper}>
        <Switch>
        <Route
            exact
            path="/"
            render={() => (
              <ClientManagement />
            )}
          />
          <Route exact path="/" component={ClientManagement} />
          <Route exact path="/addClient" component={AddClient} />
          <Route exact path="/editClient" component={EditClient} />
          <Redirect to="/" />
        </Switch>
      </Paper>
    </Router>
  );
}

export default App;
