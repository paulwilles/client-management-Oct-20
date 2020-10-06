import React, {useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';

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

  const handleClick = (event, clientId) => {
    const selectedIndex = selected.indexOf(clientId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, clientId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeclientsPerPage = (event) => {
    setclientsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (clientId) => selected.indexOf(clientId) !== -1;

  if (!clients) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <Paper className={classes.paper}>
      <Toolbar>

      </Toolbar>
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
            .map((client, index) => (
            <TableRow
              key={index}
              >
              <TableCell>
                <Checkbox
                  checked={isSelected(client.clientId)}
                  onClick={(event) => handleClick(event, client.clientId)}
                  />
              </TableCell>
              <TableCell>
                {client.clientName}
              </TableCell>
              <TableCell>
                {client.clientEmail}
              </TableCell>
              <TableCell>
                {client.clientWorkPhone}
              </TableCell>
              <TableCell>
                {client.clientIndustry}
              </TableCell>
              <TableCell>
                {client.clientPocName}
              </TableCell>
              <TableCell>
                {client.clientWebsite}
              </TableCell>
              <TableCell>
                <Button variant="outlined" color="primary">
                  <CreateIcon />
                </Button>
              </TableCell>
            </TableRow>
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
