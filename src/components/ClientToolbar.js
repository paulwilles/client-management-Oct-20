import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

export default function ClientToolbar() {
  const classes = useStyles();

  return (
    <Toolbar>
      <Typography variant="h6" noWrap>
        All Clients
      </Typography>
      <div className={classes.grow} />
      <IconButton>
        <MoreIcon />
      </IconButton>
    </Toolbar>
  );
}
