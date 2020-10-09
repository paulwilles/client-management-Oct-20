import { configureStore } from '@reduxjs/toolkit';
import clientsReducer from '../clientsSlice';

export default configureStore({
  reducer: {
    clients: clientsReducer,
  },
});
