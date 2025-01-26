import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://67948a40aad755a134e9bd77.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContactOperation = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { name, number });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactOperation = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      thunkAPI.dispatch(fetchContacts());
      return response.data;
    } catch (error) {
      if (error.response.status === 404) {
        thunkAPI.rejectWithValue('Контакт не знайдений');
      } else {
        thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const editContactOperation = createAsyncThunk(
  'contacts/editContact',
  async ({ id, name, number }, thunkAPI) => {
    try {
      const response = await axios.put(`/contacts/${id}`, { name, number });
      thunkAPI.dispatch(fetchContacts());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
