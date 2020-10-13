import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { selectClientById } from './clientsSlice';
import { updateClient } from './clientsSlice';
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

const UpdateClient = (props) => {
  const {clientId} = props.location.state;
  const client = useSelector(state => selectClientById(state, clientId));
  const clientStatus = useSelector(state => state.clients.status);
  const error = useSelector(state => state.clients.error);
  const [clientName, setClientName] = useState(client.clientName);
  const [clientEmail, setClientEmail] = useState(client.clientEmail);
  const [clientWorkPhone, setClientWorkPhone] = useState(client.clientWorkPhone);
  const [clientAddress, setClientAddress] = useState(client.clientAddress);
  const [clientPersonalPhone, setClientPersonalPhone] = useState(client.clientPersonalPhone);
  const [clientPocName, setClientPocName] = useState(client.clientPocName);
  const [clientFax, setClientFax] = useState(client.clientFax);
  const [clientIndustry, setClientIndustry] = useState(client.clientIndustry);
  const [clientContract, setClientContract] = useState(client.clientContract);
  const [clientWebsite, setClientWebsite] = useState(client.clientWebsite);
  const [facebook, setFacebook] = useState(client.facebook);
  const [instagram, setInstagram] = useState(client.instagram);
  const [twitter, setTwitter] = useState(client.twitter);
  const [editRequestStatus, setEditRequestStatus] = useState('idle');
  const [exitForm, setExitForm] = useState(false);
  const dispatch = useDispatch();

  const classes = useStyles();

  const canSave =
    [clientName, clientEmail, clientWorkPhone].every(Boolean) && editRequestStatus === 'idle';

    const onSaveClientClicked = async () => {
      if (canSave) {
        try {
          setEditRequestStatus('pending');
          const resultAction = dispatch(
            updateClient({
              clientId: client.clientId,
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
       } catch (err) {
          console.error('Failed to save the post: ', err);
        } finally {
          setEditRequestStatus('idle');
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

    let content;
    if (clientStatus === 'loading') {
      content = <div>Loading...</div>
    } else if (clientStatus === 'succeeded') {
      content =         <Grid container spacing={3}>
      <Grid item xs={12}>
      <TextField
        required
        id="client-Name"
        label="Client Name"
        defaultValue={clientName}
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
        defaultValue={clientEmail}
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
        defaultValue={clientWorkPhone}
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
        defaultValue={clientAddress}
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
        defaultValue={clientPersonalPhone}
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
        defaultValue={clientPocName}
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
        defaultValue={clientFax}
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
        defaultValue={clientIndustry}
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
        defaultValue={clientContract}
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
            defaultValue={clientWebsite}
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
            defaultValue={facebook}
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
            defaultValue={instagram}
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
            defaultValue={twitter}
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
    } else if (clientStatus === 'failed') {
      content = <div>{error}</div>
    }

    return (
    <Card className={classes.card}>
      <CardHeader
        title='Edit Client'
      />
      <CardContent
      className={classes.cardContent}>
        {content}
      </CardContent>
    </Card>
  )
}

export default UpdateClient

