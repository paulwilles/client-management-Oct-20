import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ClientRow from './ClientRow';

const useStyles = makeStyles((theme) => ({
  card: {
    overflowX: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 5,
    margin: 10,
  },
  cardContent: {
    padding: 0,
  },
  table: {
    minWidth: 750,
  },
  head: {
    backgroundColor: '#F4F6F8',
    color: theme.palette.common.white,
  },}));

const headCells = [
  { id: 'clientName', numeric: false, disablePadding: true, label: 'Client Name' },
  { id: 'clientEmail', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'clientWorkPhone', numeric: false, disablePadding: false, label: 'Phone' },
  { id: 'clientIndustry', numeric: false, disablePadding: false, label: 'Industry' },
  { id: 'clientPocName', numeric: false, disablePadding: false, label: 'Point of Contact' },
  { id: 'clientWebsite', numeric: false, disablePadding: false, label: 'clientWebsite' },
];

const ClientList = ({clients}) => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [clientsPerPage, setclientsPerPage] = useState(5);

  const classes = useStyles();

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
    <>
      <Typography >
          {clients.length} Records found. Page {page + 1} of {Math.ceil(clients.length / clientsPerPage)}
        </Typography>
        <Card className={classes.card}>
        <CardHeader
           action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title='All Clients'
        />
        <CardContent className={classes.cardContent}>
          <Table>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell>
                  <Checkbox onChange={handleSelectAllClick} />
                </TableCell>
              {headCells.map(headCell => (
                <TableCell key={headCell.id}>
                  {headCell.label}
                </TableCell>
              ))}
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients
                .slice(page * clientsPerPage, page * clientsPerPage + clientsPerPage)
                .map(client => (
                  <ClientRow
                    key={client.clientId}
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
        </CardContent>
      </Card>
    </>
  )
}

export default ClientList;
