import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import ClientList from './components/clientList';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    backgroundColor: '#F4F6F8',
    padding: '50px',
  },
}));


function App() {
  const classes = useStyles();
    return (
    <>
      <Paper className={classes.paper}>
        <h3>MANAGEMENT</h3>
        <h2>Clients</h2>
        <SearchBar />
        <ClientList />
      </Paper>
    </>
  );
}

export default App;
