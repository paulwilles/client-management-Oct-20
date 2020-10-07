import React, {useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ClientToolbar from './ClientToolbar';
import ClientRow from './ClientRow';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 0,
  },
}));

const headCells = [
  { id: 'clientName', numeric: false, disablePadding: true, label: 'Client Name' },
  { id: 'clientEmail', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'clientWorkPhone', numeric: false, disablePadding: false, label: 'Phone' },
  { id: 'clientIndustry', numeric: false, disablePadding: false, label: 'Industry' },
  { id: 'clientPocName', numeric: false, disablePadding: false, label: 'Point of Contact' },
  { id: 'clientWebsite', numeric: false, disablePadding: false, label: 'clientWebsite' },
];

const ClientList = () => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [clientsPerPage, setclientsPerPage] = useState(5);
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = clients.map((n) => n.clientId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeclientsPerPage = (event) => {
    setclientsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!clients) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <Paper className={classes.paper}>
      <ClientToolbar />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox onChange={handleSelectAllClick} />
            </TableCell>
          {headCells.map(headCell => (
            <TableCell key={headCell.id}>
              {headCell.label}
            </TableCell>
          ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {clients
            .slice(page * clientsPerPage, page * clientsPerPage + clientsPerPage)
            .map(client => (
              <ClientRow
                client={client}
                headCells={headCells}
                selected={selected}
                setSelected />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={clients.length}
        rowsPerPage={clientsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeclientsPerPage}
      />
    </Paper>
)};

export default ClientList;
