import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import LanguageIcon from '@material-ui/icons/Language';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles((theme) => ({
  card: {
    overflowX: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 5,
    margin: 10,
  },
  cardContent: {
    padding: 10,
  },
}));

const AddClient = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        title='New Client'
      />
      <CardContent
      className={classes.cardContent}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
          <TextField
            required
            id="client-Name"
            label="Client Name"
            defaultValue=""
            variant="outlined"
            fullWidth
            color="secondary"
          />
          </Grid>

          <Grid item xs={12} sm={7}>
          <TextField
            required
            id="email-address"
            label="Email Address"
            defaultValue=""
            variant="outlined"
            fullWidth
            color="secondary"
          />
          </Grid>

          <Grid item xs={12} sm={5}>
          <TextField
            required
            id="work-phone"
            label="Work Phone Number"
            defaultValue=""
            variant="outlined"
            fullWidth
            color="secondary"
          />
          </Grid>

          <Grid item xs={12} sm={7}>
          <TextField
            id="address"
            label="Address"
            defaultValue=""
            variant="outlined"
            fullWidth
            color="secondary"
          />
          </Grid>

          <Grid item xs={12} sm={5}>
          <TextField
            id="personal-phone"
            label="Personal Phone Number"
            defaultValue=""
            variant="outlined"
            fullWidth
            color="secondary"
          />
          </Grid>

          <Grid item xs={12} sm={7}>
          <TextField
            id="poc"
            label="Point of Contact"
            defaultValue=""
            variant="outlined"
            fullWidth
            color="secondary"
          />
          </Grid>

          <Grid item xs={12} sm={5}>
          <TextField
            id="fax"
            label="Fax"
            defaultValue=""
            variant="outlined"
            fullWidth
            color="secondary"
          />
          </Grid>

          <Grid item xs={12} sm={7}>
          <TextField
            id="industry"
            label="Industry"
            defaultValue=""
            variant="outlined"
            fullWidth
            color="secondary"
          />
          </Grid>

          <Grid item xs={12} sm={5}>
          <TextField
            id="contract"
            label="Contract"
            defaultValue=""
            variant="outlined"
            fullWidth
            color="secondary"
          />
          </Grid>

          <Grid item xs={12} sm={6}
          container spacing={1} alignItems="flex-end">
            <Grid item>
              <LanguageIcon />
            </Grid>
            <Grid item xs={11}>
              <TextField
                id="website"
                label="Website"
                defaultValue=""
                fullWidth
                color="secondary"
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}
          container spacing={1} alignItems="flex-end">
            <Grid item>
              <FacebookIcon />
            </Grid>
            <Grid item xs={11}>
              <TextField
                id="facebook"
                label="Facebook"
                defaultValue=""
                fullWidth
                color="secondary"
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}
          container spacing={1} alignItems="flex-end">
            <Grid item>
              <InstagramIcon />
            </Grid>
            <Grid item xs={11}>
              <TextField
                id="instagram"
                label="Instagram"
                defaultValue=""
                fullWidth
                color="secondary"
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}
          container spacing={1} alignItems="flex-end">
            <Grid item>
              <TwitterIcon />
            </Grid>
            <Grid item xs={11}>
              <TextField
                id="twitter"
                label="Twitter"
                defaultValue=""
                fullWidth
                color="secondary"
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AddClient
