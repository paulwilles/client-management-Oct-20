import React from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import FilterListIcon from '@material-ui/icons/FilterList';

const SearchBar = () => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <OutlinedInput
            id="search"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item xs={1}>
          <Button variant="outlined">Search</Button>
        </Grid>
        <Grid item xs={1}>
          <Button variant="outlined">Clear</Button>
        </Grid>
        <Grid item xs={5}>
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" color="primary" startIcon={<FilterListIcon />}>
             Show Filter
          </Button>
        </Grid>

      </Grid>
    </>
  )
}

export default SearchBar
