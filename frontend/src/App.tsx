import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import './App.css';
import HomePage from "./view/HomePage";

function App() {
  return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <HomePage />
      </LocalizationProvider>
  );
}

export default App;
