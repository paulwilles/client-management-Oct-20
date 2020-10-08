import React, {useEffect, useState} from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import ClientList from './components/ClientList';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(2),
    backgroundColor: '#F4F6F8',
    padding: '50px',
  },
}));


function App() {
  const [clients, setClients] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getClients();
  }, [])

  const getClients = async() => {
    const response = await fetch(`http://javareesbyapi-env.eba-rtdeyeqd.ap-southeast-2.elasticbeanstalk.com/api/v1/getallclients/tenant/reesby`);
    const data = await response.json();
    setClients(data);
  }

      return (
    <>
      <Paper className={classes.paper}>
        <Typography variant='h6'>MANAGEMENT</Typography>
        <Typography variant='h2'>Clients</Typography>
        <SearchBar />
        <ClientList clients={clients} />
      </Paper>
    </>
  );
}

export default App;
