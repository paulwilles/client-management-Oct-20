import React, { useState } from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import { Redirect } from "react-router-dom";

const ClientRow = ({ client, headCells, selected, setSelected }) => {
  const [editClient, setEditClient] = useState(null);
  const isSelected = (clientId) => selected.indexOf(clientId) !== -1;

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

  if (editClient) {
    return(
      <Redirect
        to={{
          pathname: "/editClient",
          state: { clientId: editClient }
        }}
      />
    );
  }

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={isSelected(client.clientId)}
          onClick={(event) => handleClick(event, client.clientId)}
          />
      </TableCell>
      {headCells.map(headCell => (
        <TableCell key={headCell.id}>
          {client[headCell.id]}
        </TableCell>
      ))}
      <TableCell>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setEditClient(client.clientId)}
        >
          <CreateIcon />
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default ClientRow;
