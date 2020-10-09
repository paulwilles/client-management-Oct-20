import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from '../components/clientsSlice';

export default configureStore({
  reducer: {
    clients: clientsReducer,
  },
});
