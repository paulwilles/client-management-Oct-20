import React from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    border: 'solid 1px #E1E3E4',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const SearchBar = () => {
  const classes = useStyles();
  return (
     <Grid container
      spacing={1}
      justify="space-between">
      <Grid
        item xs={12} md={6}
        container
        justify="flex-start">
        <Grid item xs={12} sm={6}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            variant="outlined"
            fullWidth>
              Search
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
            variant="outlined"
            fullWidth>
              Clear
          </Button>
        </Grid>
      </Grid>
      <Grid
        item xs={12} md={6}
        container
        justify="flex-end">
        <Grid item xs={12} md={6}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<FilterListIcon />}
            fullWidth>
             Show Filter
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SearchBar
