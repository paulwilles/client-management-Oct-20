import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
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
import Button from '@material-ui/core/Button';
import { addNewClient } from './clientsSlice';
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
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
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientWorkPhone, setClientWorkPhone] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientPersonalPhone, setClientPersonalPhone] = useState('');
  const [clientPocName, setClientPocName] = useState('');
  const [clientFax, setClientFax] = useState('');
  const [clientIndustry, setClientIndustry] = useState('');
  const [clientContract, setClientContract] = useState('');
  const [clientWebsite, setClientWebsite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const [exitForm, setExitForm] = useState(false);
  const dispatch = useDispatch();

  const classes = useStyles();

  const canSave =
    [clientName, clientEmail, clientWorkPhone].every(Boolean) && addRequestStatus === 'idle';

    const onSaveClientClicked = async () => {
      if (canSave) {
        try {
          setAddRequestStatus('pending');
          const resultAction = dispatch(
            addNewClient({
              tenantId: "reesby",
              clientName,
              clientEmail,
              clientWorkPhone,
              clientAddress,
              clientPersonalPhone,
              clientPocName,
              clientFax,
              clientIndustry,
              clientContract,
              clientWebsite,
              facebook,
              instagram,
              twitter,
              clientAvatarURL: null,
            })
          );
          unwrapResult(resultAction);
          setClientName('');
          setClientEmail('');
          setClientWorkPhone('');
          setClientAddress('');
          setClientPersonalPhone('');
          setClientPocName('');
          setClientFax('');
          setClientIndustry('');
          setClientContract('');
          setClientWebsite('');
          setFacebook('');
          setInstagram('');
          setTwitter('');
       } catch (err) {
          console.error('Failed to save the post: ', err);
        } finally {
          setAddRequestStatus('idle');
          setExitForm(true);
        }
      }
    }

    if (exitForm) {
      return(
        <Redirect
          to={{ pathname: "/" } }
        />
      );
    };

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
            onChange={e => setClientName(e.target.value)}
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
            onChange={e => setClientEmail(e.target.value)}
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
            onChange={e => setClientWorkPhone(e.target.value)}
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
            onChange={e => setClientAddress(e.target.value)}
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
            onChange={e => setClientPersonalPhone(e.target.value)}
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
            onChange={e => setClientPocName(e.target.value)}
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
            onChange={e => setClientFax(e.target.value)}
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
            onChange={e => setClientIndustry(e.target.value)}
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
            onChange={e => setClientContract(e.target.value)}
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
                onChange={e => setClientWebsite(e.target.value)}
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
                onChange={e => setFacebook(e.target.value)}
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
                onChange={e => setInstagram(e.target.value)}
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
                onChange={e => setTwitter(e.target.value)}
                />
            </Grid>
          </Grid>

          <Grid item xs={12} container justify="flex-end" spacing={3}>
            <Grid item>
              <Button
                variant="contained"
                color="default"
                onClick={() => setExitForm(true)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="default"
                onClick={onSaveClientClicked}
                disabled={!canSave}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AddClient
