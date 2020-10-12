import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  clients: [],
  status: 'idle',
  error: null
};

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
  const response = await fetch(`http://javareesbyapi-env.eba-rtdeyeqd.ap-southeast-2.elasticbeanstalk.com/api/v1/getallclients/tenant/reesby`);
  const data = await response.json();
  return data;
});

export const addNewClient = createAsyncThunk('clients/addNewClient', async (initialClient) => {
  console.log(initialClient);
  const response = await fetch('http://javareesbyapi-env.eba-rtdeyeqd.ap-southeast-2.elasticbeanstalk.com/api/v1/addclient', {
    method: 'POST',
    body: JSON.stringify(initialClient),
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await response.json();
  return data;
  }
);

export const clientsSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    addClient(state, action) {
      state.clients.push(action.payload);
    },
    updateClient(state, action) {
      const { clientId } = action.payload
      const existingClient = state.clients.find(client => client.clientId === clientId)
      if (existingClient) {
        for (var key in action.payload) {
          existingClient[key] = action.payload[key];
        }
      }
    }
  },
  extraReducers: {
    [fetchClients.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchClients.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched clients to the array
      state.clients = state.clients.concat(action.payload)
    },
    [fetchClients.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewClient.fulfilled]: (state, action) => {
      // We can directly add the new Client object to our clients array
      state.clients.push(action.payload)
    }
  }
});

export const { addClient } = clientsSlice.actions;

export default clientsSlice.reducer;

export const selectAllClients = state => state.clients.clients;

export const selectClientById = (state, clientId) =>
  state.clients.clients.find(client => client.clientId === clientId);
