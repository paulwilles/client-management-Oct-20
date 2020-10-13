import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  clients: [],
  page: 0,
  status: 'idle',
  error: null
};

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
  const response = await fetch(`http://javareesbyapi-env.eba-rtdeyeqd.ap-southeast-2.elasticbeanstalk.com/api/v1/getallclients/tenant/reesby`);
  const data = await response.json();
  return data;
});

export const addNewClient = createAsyncThunk('clients/addNewClient', async (initialClient) => {
  const response = await fetch('http://javareesbyapi-env.eba-rtdeyeqd.ap-southeast-2.elasticbeanstalk.com/api/v1/addclient', {
    method: 'POST',
    body: JSON.stringify(initialClient),
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await response.json();
  return data;
  }
);

export const updateClient = createAsyncThunk('clients/updateClient', async (client) => {
  const response = await fetch('http://javareesbyapi-env.eba-rtdeyeqd.ap-southeast-2.elasticbeanstalk.com/api/v1/updateclient', {
    method: 'PUT',
    body: JSON.stringify(client),
    headers: { 'Content-Type': 'application/json' },
  })
  return response;
  }
);

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    clientAdded(state, action) {
      state.clients.push(action.payload);
    },
    clientUpdated(state, action) {
      const { clientId } = action.payload
      const existingClient = state.clients.find(client => client.clientId === clientId)
      if (existingClient) {
        for (var key in action.payload) {
          existingClient[key] = action.payload[key];
        }
      }
    },
    setClientPage(state, action) {
      state.page = action.payload;
    }
  },
  extraReducers: {
    [fetchClients.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchClients.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched clients to the array
      state.clients = state.clients.concat(action.payload);
    },
    [fetchClients.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addNewClient.pending]: (state, action) => {
      state.status = 'saving';
    },
    [addNewClient.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // We can directly add the new post object to our posts array
      state.clients.push(action.payload)
    },
    [addNewClient.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [updateClient.pending]: (state, action) => {
      state.status = 'saving';
    },
    [updateClient.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      const updatedclient = action.meta.arg
      const existingClient = state.clients.find(client => client.clientId === updatedclient.clientId)
      if (existingClient) {
        for (var key in updatedclient) {
          existingClient[key] = updatedclient[key];
        }
      }
    },
    [addNewClient.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

  }
});

export const { clientAdded, clientUpdated, setClientPage } = clientsSlice.actions;
export default clientsSlice.reducer;

export const selectAllClients = state => state.clients.clients;

export const selectClientById = (state, clientId) =>
  state.clients.clients.find(client => client.clientId === clientId);

export const clientsPage = state => state.clients.page;
