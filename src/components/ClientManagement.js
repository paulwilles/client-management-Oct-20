import React, {useEffect, useState} from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SearchBar from './SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllClients, fetchClients } from './clientsSlice'
import ClientList from './ClientList';
import { Link } from 'react-router-dom'

const ClientManagement = () => {
  const [search, setSearch] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
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
      <Typography variant='h6'>MANAGEMENT</Typography>
      <Grid container justify="space-between">
      <Grid item>
          <Typography variant='h2'>Clients</Typography>
        </Grid>
        <Grid item xs={3}>
          <Link to="/addClient">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              fullWidth
            >
              New Client
            </Button>
          </Link>
        </Grid>
      </Grid>
      <SearchBar search={search} setSearch={setSearch} setFilter={setFilter} />
      {content}
    </>
  )
}

export default ClientManagement
