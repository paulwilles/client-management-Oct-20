import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllClients, fetchClients } from './clientsSlice'
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
  const [search, setSearch] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch()
  const clients = useSelector(selectAllClients);
  const clientStatus = useSelector(state => state.clients.status)
  const error = useSelector(state => state.clients.error)

  useEffect(() => {
    if (clientStatus === 'idle') {
      dispatch(fetchClients())
    }
  }, [clientStatus, dispatch])

  useEffect(() => {
    setFilteredClients(clients.filter(client => client.clientName.toLowerCase().includes(filter.toLowerCase())));
  }, [clients, filter])

  let content;

  if (clientStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (clientStatus === 'succeeded') {
    content = <ClientList clients={filteredClients} />
  } else if (clientStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <>
      <Paper className={classes.paper}>
        <Typography variant='h6'>MANAGEMENT</Typography>
        <Typography variant='h2'>Clients</Typography>
        <SearchBar search={search} setSearch={setSearch} setFilter={setFilter} />
        {content}
      </Paper>
    </>
  );
}

export default App;
